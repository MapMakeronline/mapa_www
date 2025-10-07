/**
 * Route Export Module
 * Obsługuje eksport tras do różnych formatów (KML, GPX) i integrację z Google Maps
 * 
 * @author Copilot
 * @version 1.0.0
 */

class RouteExporter {
  constructor() {
    // Cache dla geolokalizacji użytkownika
    this.cachedUserLocation = null;
    this.locationCacheTime = null;
    this.LOCATION_CACHE_DURATION = 300000; // 5 minut
    
    // Konfiguracja eksportu
    this.config = {
      kml: {
        defaultLineColor: '#FF0000',
        defaultLineWidth: 3,
        defaultLineOpacity: 0.8
      },
      gpx: {
        trackName: 'Trail Route',
        trackDescription: 'Exported trail route'
      }
    };
  }

  /**
   * Metoda logowania z prefiksem
   */
  log(message, level = 'info') {
    const prefix = '[RouteExporter]';
    switch (level) {
      case 'error':
        console.error(prefix, message);
        break;
      case 'warn':
        console.warn(prefix, message);
        break;
      default:
        console.log(prefix, message);
    }
  }

  /**
   * Pokazuje błąd użytkownikowi
   */
  showError(message, error = null) {
    this.log(`${message}: ${error ? error.message : 'Nieznany błąd'}`, 'error');
    alert(`${message}\n\nSzczegóły błędu: ${error ? error.message : 'Nieznany błąd'}`);
  }

  /**
   * Główna funkcja eksportu trasy
   * @param {Object} geojson - Dane GeoJSON trasy
   * @param {string} name - Nazwa trasy
   * @param {string} format - Format eksportu ('kml', 'gpx', 'png')
   * @param {Object} options - Dodatkowe opcje eksportu
   */
  async exportRoute(geojson, name, format = 'kml', options = {}) {
    try {
      console.log(`Eksportuję trasę "${name}" do formatu ${format.toUpperCase()}`);
      
      switch (format.toLowerCase()) {
        case 'kml':
          return await this.exportToKML(geojson, name, options);
        case 'gpx':
          return await this.exportToGPX(geojson, name, options);
        case 'png':
          return await this.exportToPNG(geojson, name, options);
        default:
          throw new Error(`Nieobsługiwany format eksportu: ${format}`);
      }
    } catch (error) {
      console.error('Błąd podczas eksportu trasy:', error);
      throw error;
    }
  }

  /**
   * Eksport do formatu KML
   */
  async exportToKML(geojson, name, options = {}) {
    try {
      const coords = this.extractCoordinates(geojson);
      if (!coords || coords.length === 0) {
        throw new Error('Brak współrzędnych do eksportu');
      }

      // Pobierz lokalizację użytkownika
      let userLocation = null;
      let addDriving = false;
      let filename = name;
      
      try {
        userLocation = await this.getCurrentUserLocation();
        
        // Zapytaj użytkownika czy chce dodać dojazd
        const modalFn = options.showCustomModal || (typeof window !== 'undefined' && window.showCustomModal);
        if (typeof modalFn === 'function') {
          addDriving = await modalFn({
            title: 'Typ pliku KML',
            message: `Czy chcesz wygenerować KML z dojazdem samochodem z Twojej aktualnej lokalizacji do szlaku "${name}"?`,
            confirmText: 'Tak, z dojazdem',
            cancelText: 'Nie, tylko szlak'
          });
          
          if (addDriving) {
            filename = `dojazd_do_${name.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_\-]/g,'')}`;
          }
        }
      } catch (error) {
        console.warn('Nie udało się uzyskać lokalizacji użytkownika:', error);
      }

      // Generuj KML
      const kmlContent = addDriving && userLocation ? 
        this.generateMultiStageKMLContent(coords, name, userLocation, options) :
        this.generateKMLContent(coords, name, null, options);
      
      // Pobierz plik
      this.downloadFile(kmlContent, `${filename}.kml`, 'application/vnd.google-earth.kml+xml');
      
      // Opcjonalnie otwórz w Google Maps
      await this.offerGoogleMapsIntegration(geojson, name, addDriving ? userLocation : null, options.showCustomModal);
      
      return { success: true, format: 'kml', filename: `${filename}.kml` };
      
    } catch (error) {
      console.error('Błąd eksportu KML:', error);
      throw error;
    }
  }

  /**
   * Eksport do formatu GPX
   */
  async exportToGPX(geojson, name, options = {}) {
    try {
      const coords = this.extractCoordinates(geojson);
      if (!coords || coords.length === 0) {
        throw new Error('Brak współrzędnych do eksportu');
      }

      const gpxContent = this.generateGPXContent(coords, name, options);
      this.downloadFile(gpxContent, `${name}.gpx`, 'application/gpx+xml');
      
      return { success: true, format: 'gpx', filename: `${name}.gpx` };
      
    } catch (error) {
      console.error('Błąd eksportu GPX:', error);
      throw error;
    }
  }

  /**
   * Eksport do formatu PNG (screenshot mapy)
   */
  async exportToPNG(geojson, name, options = {}) {
    this.log(`Eksportowanie mapy jako PNG: ${name}`);
    
    try {
      // Sprawdź czy mapa jest dostępna
      if (!window.map || !window.map.getCanvas) {
        throw new Error('Mapa nie jest dostępna');
      }
      
      // Sprawdź czy mamy wymagane dane globalne
      if (!window.currentItem || !window.currentPath) {
        throw new Error('Brak danych trasy (currentItem lub currentPath)');
      }
      
      const map = window.map;
      const currentItem = window.currentItem;
      const currentPath = window.currentPath;
      if (!window.turf) {
        throw new Error('Biblioteka Turf.js nie jest dostępna');
      }
      const turf = window.turf;
      
      this.log('Rozpoczynam zaawansowany eksport PNG...');
      
      // === ORYGINALNY KOD PNG EXPORT Z app.js ===
      
      // Save current view and style props
      const prev = {
        center: map.getCenter(),
        zoom: map.getZoom(),
        pitch: map.getPitch(),
        bearing: map.getBearing(),
        casing: map.getPaintProperty('hiking-casing','line-width'),
        colorW: map.getPaintProperty('hiking-color','line-width'),
        progW: (map.getLayer('progress-line') ? map.getPaintProperty('progress-line','line-width') : null)
      };
      
      // Fit to bbox of current path (portrait/landscape padding)
      const bb = turf.bbox(currentPath); // [w,s,e,n]
      const width = map.getCanvas().width, height = map.getCanvas().height;
      const pad = Math.round(Math.min(width, height) * 0.08);
      
      // --- Only selected route on export ---
      const hikingSrc = map.getSource('hiking');
      const restoreHiking = !!hikingSrc;
      let originalHikingData = null;
      
      if(restoreHiking){
        try{
          // Zapisz oryginalne dane źródła
          originalHikingData = hikingSrc._data;
          const singleFC = { type:'FeatureCollection', features:[ currentItem.f ] };
          hikingSrc.setData(singleFC);
          await new Promise(res => map.once('idle', res));
        }catch(e){ /* ignore */ }
      }
      
      // --- Hide animated progress ONLY for export ---
      const restoreVisibility = {};
      function hideForExport(id){
        if(map.getLayer(id)){
          try{
            restoreVisibility[id] = map.getLayoutProperty(id, 'visibility') || 'visible';
            map.setLayoutProperty(id, 'visibility', 'none');
          }catch(e){}
        }
      }
      function restoreAfterExport(){
        for(const id in restoreVisibility){
          try{ map.setLayoutProperty(id, 'visibility', restoreVisibility[id] || 'visible'); }catch(e){}
        }
      }
      hideForExport('anim-line');
      hideForExport('progress-line');
      hideForExport('country-boundaries');
      hideForExport('city-borders');

      try{
        // Thicken lines for export
        map.setPaintProperty('hiking-casing','line-width', 6);
        map.setPaintProperty('hiking-color','line-width', 4.5);
        if(map.getLayer('progress-line')) map.setPaintProperty('progress-line','line-width', 8);
      }catch(e){}
      
      document.body.classList.add('exporting');
      
      // Ensure north-up, flat, and fit
      map.easeTo({bearing:0, pitch:0, duration:0});
      map.fitBounds([[bb[0], bb[1]], [bb[2], bb[3]]], { padding: pad, duration: 0 });
      await new Promise(res => map.once('idle', res));
      
      // Compose image
      const dpr = window.devicePixelRatio || 1;
      const canvas = document.createElement('canvas');
      canvas.width = map.getCanvas().width;
      canvas.height = map.getCanvas().height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(map.getCanvas(), 0, 0);
      
      // Get color and distance for label
      const color = window.osmcToColor ? window.osmcToColor(currentItem.osmc || currentItem._osmc) : '#FF0000';
      const distKm = turf.length(currentPath);
      
      // Label card (short, multi-line wrapping)  
      const margin = 18*dpr;
      const x = margin, y = margin;
      const padX = 18*dpr, padY = 16*dpr, gap = 12*dpr, swatchW = 20*dpr;

      const titleFont = `${20*dpr}px system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      const subFont   = `${15*dpr}px system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      const lineH     = 22*dpr;
      const subLineH  = 18*dpr;
      const maxCardW  = Math.min(canvas.width*0.45, 380*dpr);
      const minCardW  = 260*dpr;
      const innerMax  = maxCardW - (padX*2 + gap + swatchW);

      function wrapText(ctx, text, maxW, maxLines=3){
        if(!text) return [''];
        const words = String(text).split(/\s+/);
        const lines = [];
        let line = '';
        ctx.font = titleFont;
        for(const w of words){
          const test = line ? line + ' ' + w : w;
          if(ctx.measureText(test).width <= maxW){
            line = test;
          }else{
            if(line) lines.push(line);
            line = w;
            if(lines.length === maxLines-1){
              while(ctx.measureText(line + '…').width > maxW && line.length>1){
                line = line.slice(0,-1);
              }
              lines.push(line + '…');
              return lines;
            }
          }
        }
        if(line) lines.push(line);
        return lines.slice(0, maxLines);
      }

      function drawRoundedRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
      }

      const ctxMeasure = canvas.getContext('2d');
      const titleLines = wrapText(ctxMeasure, name, innerMax, 3);
      ctxMeasure.font = titleFont;
      const longest = titleLines.reduce((w,t)=>Math.max(w, ctxMeasure.measureText(t).width), 0);

      ctxMeasure.font = subFont;
      const distText = `${distKm.toFixed(2)} km`;
      const distW = ctxMeasure.measureText(distText).width;

      const textW = Math.max(longest, distW);
      const cardW = Math.max(minCardW, Math.min(maxCardW, padX*2 + textW + gap + swatchW));
      const cardH = padY*2 + titleLines.length*lineH + 10*dpr + subLineH;

      // Draw card
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.96)';
      drawRoundedRect(ctx, x, y, cardW, cardH, 12*dpr);
      ctx.fill();

      // Title lines
      ctx.fillStyle = '#111';
      ctx.font = titleFont;
      for(let i=0;i<titleLines.length;i++){
        ctx.fillText(titleLines[i], x+padX, y+padY + (i+0.8)*lineH);
      }
      // Distance
      ctx.font = subFont;
      ctx.fillText(distText, x+padX, y+padY + titleLines.length*lineH + 12*dpr);

      // Color swatch (right side)
      ctx.fillStyle = color;
      ctx.beginPath(); 
      ctx.arc(x+cardW - padX - 8*dpr, y+cardH/2, 8*dpr, 0, Math.PI*2); 
      ctx.fill();

      ctx.restore();
      
      // Download
      const safe = name.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_\-]/g,'');
      const filename = `${safe||'trasa'}.png`;
      const dataURL = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataURL;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Restore
      document.body.classList.remove('exporting');
      try{
        map.setPaintProperty('hiking-casing','line-width', prev.casing);
        map.setPaintProperty('hiking-color','line-width', prev.colorW);
        if(map.getLayer('progress-line') && prev.progW!=null) map.setPaintProperty('progress-line','line-width', prev.progW);
      }catch(e){}
      map.easeTo({ center: prev.center, zoom: prev.zoom, pitch: prev.pitch, bearing: prev.bearing, duration: 0 });
    
      // Restore full routes on map
      try{
        const hikingSrc2 = map.getSource('hiking');
        if(hikingSrc2 && originalHikingData){ 
          hikingSrc2.setData(originalHikingData); 
          await new Promise(res => map.once('idle', res)); 
        } else if(hikingSrc2 && window.hikingData) {
          // Fallback do window.hikingData jeśli jest dostępne
          hikingSrc2.setData(window.hikingData); 
          await new Promise(res => map.once('idle', res)); 
        }
      }catch(e){}
      
      // Restore visibility
      restoreAfterExport();
      
      // Force restore cyan line if function exists
      if (typeof window.forceRestoreCyan === 'function') {
        window.forceRestoreCyan();
      }
      
      this.log(`PNG wyeksportowany pomyślnie: ${filename}`);
      
      // Show success notification
      if (window.showCustomModal) {
        setTimeout(async () => {
          await window.showCustomModal({
            title: 'Pobieranie zakończone',
            message: `Obraz PNG trasy "${name}" został pobrany.`,
            confirmText: 'OK',
            showCancel: false
          });
        }, 500);
      }
      
      return { success: true, filename: filename };
      
    } catch (error) {
      this.log(`Błąd eksportu PNG: ${error.message}`, 'error');
      console.error('Szczegóły błędu PNG:', error);
      this.showError('Nie udało się wyeksportować obrazu PNG', error);
      throw error;
    }
  }

  /**
   * Wyciąga współrzędne z różnych formatów GeoJSON
   */
  extractCoordinates(geojson) {
    let coords = [];
    
    if (geojson.type === 'Feature') {
      if (geojson.geometry.type === 'LineString') {
        coords = geojson.geometry.coordinates;
      } else if (geojson.geometry.type === 'MultiLineString') {
        coords = geojson.geometry.coordinates.flat();
      }
    } else if (geojson.type === 'LineString') {
      coords = geojson.coordinates;
    } else if (geojson.type === 'MultiLineString') {
      coords = geojson.coordinates.flat();
    }
    
    return coords;
  }

  /**
   * Pobiera aktualną lokalizację użytkownika z cache'owaniem
   */
  getCurrentUserLocation(useCache = true) {
    return new Promise((resolve, reject) => {
      // Sprawdź cache
      if (useCache && this.cachedUserLocation && this.locationCacheTime && 
          (Date.now() - this.locationCacheTime < this.LOCATION_CACHE_DURATION)) {
        resolve(this.cachedUserLocation);
        return;
      }
      
      if (!navigator.geolocation) {
        reject(new Error('Geolokalizacja nie jest obsługiwana przez tę przeglądarkę'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          
          // Zapisz do cache
          this.cachedUserLocation = location;
          this.locationCacheTime = Date.now();
          
          resolve(location);
        },
        (error) => {
          let errorMessage = 'Błąd geolokalizacji: ';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Dostęp do lokalizacji został odrzucony przez użytkownika.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Informacje o lokalizacji są niedostępne.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Przekroczono limit czasu żądania lokalizacji.';
              break;
            default:
              errorMessage += 'Wystąpił nieznany błąd.';
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minut
        }
      );
    });
  }

  /**
   * Generuje zawartość pliku KML
   */
  generateKMLContent(coords, name, userLocation = null, options = {}) {
    const { lineColor = this.config.kml.defaultLineColor, 
            lineWidth = this.config.kml.defaultLineWidth } = options;
    
    let kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>${this.escapeXML(name)}</name>
    <description>Trasa wyeksportowana z Interaktywnej Mapy Turystycznej</description>
    
    <Style id="trailStyle">
      <LineStyle>
        <color>ff${lineColor.substring(1).split('').reverse().join('')}</color>
        <width>${lineWidth}</width>
      </LineStyle>
    </Style>`;

    // Dodaj lokalizację użytkownika jako punkt startowy
    if (userLocation && this.isValidLocation(userLocation)) {
      kmlContent += `
    <Placemark>
      <name>Punkt startowy (Twoja lokalizacja)</name>
      <description>Lokalizacja użytkownika</description>
      <Point>
        <coordinates>${userLocation.longitude},${userLocation.latitude},0</coordinates>
      </Point>
    </Placemark>`;
    }
    
    // Dodaj główną trasę
    kmlContent += `
    <Placemark>
      <name>${this.escapeXML(name)}</name>
      <description>Główna trasa turystyczna</description>
      <styleUrl>#trailStyle</styleUrl>
      <LineString>
        <tessellate>1</tessellate>
        <coordinates>`;
    
    // Dodaj wszystkie punkty trasy
    coords.forEach(coord => {
      kmlContent += `${coord[0]},${coord[1]},0 `;
    });
    
    kmlContent += `</coordinates>
      </LineString>
    </Placemark>
  </Document>
</kml>`;
    
    return kmlContent;
  }

  /**
   * Generuje KML tylko z dojazdem samochodem do początku szlaku
   */
  generateMultiStageKMLContent(coords, name, userLocation, options = {}) {
    const { lineColor = this.config.kml.defaultLineColor, 
            lineWidth = this.config.kml.defaultLineWidth } = options;
    
    const trailStart = coords[0];
    
    const kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Dojazd do szlaku "${this.escapeXML(name)}"</name>
    <description>Trasa samochodowa z Twojej lokalizacji do początku szlaku</description>
    
    <!-- Style dla trasy samochodowej -->
    <Style id="drivingStyle">
      <LineStyle>
        <color>ff0000ff</color> <!-- Czerwony dla dojazdu samochodem -->
        <width>5</width>
      </LineStyle>
    </Style>
    
    <Style id="startPoint">
      <IconStyle>
        <color>ff00ff00</color>
        <scale>1.2</scale>
        <Icon>
          <href>http://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png</href>
        </Icon>
      </IconStyle>
    </Style>
    
    <Style id="destinationPoint">
      <IconStyle>
        <color>ff0000ff</color>
        <scale>1.2</scale>
        <Icon>
          <href>http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png</href>
        </Icon>
      </IconStyle>
    </Style>
    
    <!-- Punkty trasy -->
    <Placemark>
      <name>🚗 Start - Twoja lokalizacja</name>
      <description>Punkt początkowy dojazdu samochodem</description>
      <styleUrl>#startPoint</styleUrl>
      <Point>
        <coordinates>${userLocation.longitude},${userLocation.latitude},0</coordinates>
      </Point>
    </Placemark>
    
    <Placemark>
      <name>🅿️ Cel - Początek szlaku "${this.escapeXML(name)}"</name>
      <description>Miejsce docelowe - początek szlaku pieszego</description>
      <styleUrl>#destinationPoint</styleUrl>
      <Point>
        <coordinates>${trailStart[0]},${trailStart[1]},0</coordinates>
      </Point>
    </Placemark>
    
    <!-- Trasa samochodowa -->
    <Placemark>
      <name>Dojazd samochodem do szlaku "${this.escapeXML(name)}"</name>
      <description>Użyj nawigacji samochodowej do dojazdu. Ta linia jest orientacyjna - skorzystaj z rzeczywistej nawigacji GPS.</description>
      <styleUrl>#drivingStyle</styleUrl>
      <LineString>
        <tessellate>1</tessellate>
        <coordinates>
          ${userLocation.longitude},${userLocation.latitude},0
          ${trailStart[0]},${trailStart[1]},0
        </coordinates>
      </LineString>
    </Placemark>
    
  </Document>
</kml>`;
    
    return kmlContent;
  }

  /**
   * Generuje zawartość pliku GPX
   */
  generateGPXContent(coords, name, options = {}) {
    const { trackName = this.config.gpx.trackName,
            trackDescription = this.config.gpx.trackDescription } = options;
    
    let gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Interaktywna Mapa Turystyczna">
  <trk>
    <name>${this.escapeXML(name)}</name>
    <desc>${this.escapeXML(trackDescription)}</desc>
    <trkseg>`;
    
    coords.forEach(coord => {
      gpxContent += `
      <trkpt lat="${coord[1]}" lon="${coord[0]}">
        <ele>0</ele>
      </trkpt>`;
    });
    
    gpxContent += `
    </trkseg>
  </trk>
</gpx>`;
    
    return gpxContent;
  }

  /**
   * Oferuje integrację z Google Maps
   */
  async offerGoogleMapsIntegration(geojson, name, userLocation, showCustomModal = null) {
    try {
      // Sprawdź czy funkcja showCustomModal jest dostępna
      const modalFn = showCustomModal || (typeof window !== 'undefined' && window.showCustomModal);
      if (typeof modalFn !== 'function') {
        console.warn('showCustomModal nie jest dostępna - pomijam integrację z Google Maps');
        return;
      }

      setTimeout(async () => {
        const openInGoogleMaps = await modalFn({
          title: 'Otworzyć w Google Maps?',
          message: 'Plik został pobrany. Czy chcesz również otworzyć tę trasę w Google Maps?',
          confirmText: 'Otwórz w Google Maps',
          cancelText: 'Nie, dziękuję'
        });
        
        if (openInGoogleMaps) {
          await this.openRouteInGoogleMaps(geojson, name, userLocation, modalFn);
        }
      }, 500);
      
    } catch (error) {
      console.warn('Błąd podczas oferowania integracji Google Maps:', error);
    }
  }

  /**
   * Otwiera trasę w Google Maps
   */
  async openRouteInGoogleMaps(geojson, name, userLocation = null, showCustomModal = null) {
    try {
      const coords = this.extractCoordinates(geojson);
      if (!coords || coords.length === 0) {
        throw new Error("Nie udało się znaleźć współrzędnych trasy");
      }
      
      const trailStartPoint = coords[0];
      const trailEndPoint = coords[coords.length - 1];
      
      // Jeśli mamy lokalizację użytkownika, użyj wielomodalnej trasy
      if (userLocation && this.isValidLocation(userLocation)) {
        const origin = encodeURIComponent(`${userLocation.latitude},${userLocation.longitude}`);
        const waypoint = encodeURIComponent(`${trailStartPoint[1]},${trailStartPoint[0]}`);
        const destination = encodeURIComponent(`${trailEndPoint[1]},${trailEndPoint[0]}`);
        
        const googleMapsUrl = `https://www.google.com/maps/dir/${origin}/${waypoint}/${destination}/`;
        window.open(googleMapsUrl, '_blank');
        
        // Pokaż informację użytkownikowi
        this.showRouteInfo(name, true, showCustomModal);
        
      } else {
        // Bez lokalizacji użytkownika - tylko trasa piesza
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${trailStartPoint[1]},${trailStartPoint[0]}&destination=${trailEndPoint[1]},${trailEndPoint[0]}&travelmode=walking`;
        window.open(googleMapsUrl, '_blank');
        
        this.showRouteInfo(name, false, showCustomModal);
      }
      
    } catch (error) {
      console.error("Błąd podczas otwierania Google Maps:", error);
      alert("Nie udało się otworzyć trasy w Google Maps.");
    }
  }

  /**
   * Pokazuje informację o otwartej trasie
   */
  showRouteInfo(name, hasUserLocation, showCustomModal = null) {
    const modalFn = showCustomModal || (typeof window !== 'undefined' && window.showCustomModal);
    if (typeof modalFn !== 'function') return;
    
    setTimeout(() => {
      const message = hasUserLocation 
        ? `Google Maps pokaże trasę z 3 punktami:
📍 Start: Twoja lokalizacja
🚗 Parking: Początek szlaku "${name}"
🎯 Meta: Koniec szlaku

Google automatycznie zasugeruje najlepszy transport dla każdego odcinka.`
        : `Otwarto trasę pieszą "${name}" w Google Maps.`;
      
      modalFn({
        title: 'Trasa otwarta w Google Maps',
        message: message,
        confirmText: 'OK',
        cancelText: null
      });
    }, 500);
  }

  /**
   * Waliduje lokalizację użytkownika
   */
  isValidLocation(location) {
    if (!location || typeof location !== 'object') return false;
    
    const lat = parseFloat(location.latitude);
    const lng = parseFloat(location.longitude);
    
    return !isNaN(lat) && !isNaN(lng) && 
           lat >= -90 && lat <= 90 && 
           lng >= -180 && lng <= 180;
  }

  /**
   * Pobiera plik na dysk użytkownika
   */
  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Zwolnij pamięć
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  }

  /**
   * Escapuje znaki specjalne XML
   */
  escapeXML(str) {
    return str.replace(/[&<>"']/g, (match) => {
      switch (match) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return match;
      }
    });
  }

  /**
   * Czyści cache geolokalizacji
   */
  clearLocationCache() {
    this.cachedUserLocation = null;
    this.locationCacheTime = null;
  }

  /**
   * Ustawia konfigurację modułu
   */
  setConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }
}

// Eksportuj klasę dla użycia w innych modułach
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RouteExporter;
} else {
  window.RouteExporter = RouteExporter;
}