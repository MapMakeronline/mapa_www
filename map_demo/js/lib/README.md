# Route Export Module

## 📖 Opis

Nowy modularny system eksportu tras, który zastępuje poprzednią funkcjonalność pobierania w `app.js`. System składa się z dwóch głównych komponentów:


# � Biblioteka Modułów JavaScript

Kolekcja modułów wspierających funkcjonalność interaktywnej mapy szlaków. Wszystkie moduły zaprojektowane z myślą o wydajności, modularności i łatwej rozszerzalności.

## �️ Przegląd Modułów

### 📤 `route-export.js` - Główny Moduł Eksportu
**Klasa `RouteExporter`** - Centralizowany system eksportu tras w wielu formatach.

#### Możliwości Eksportu:
- **PNG Export**: Wysokiej jakości zrzuty mapy z overlayami informacyjnymi
- **KML Export**: Integracja z Google Maps (tryb jazdy do początku szlaku)
- **GPX Export**: Format GPS dla urządzeń nawigacyjnych

#### Kluczowe Metody:
```javascript
// Inicjalizacja
const exporter = new RouteExporter(mapInstance, geoJsonData);

// Export PNG z overlayami
await exporter.exportPNG(trailName, trailColor);

// Export KML (tylko jazda samochodem)
await exporter.exportKML(trailName, trailData);

// Export GPX
await exporter.exportGPX(trailName, trailData);
```

#### Funkcjonalności Zaawansowane:
- **Canvas Overlays**: Automatyczne dodawanie informacji o trasie na PNG
- **Error Handling**: Komprehensywna obsługa błędów z user feedback
- **Progress Tracking**: Wskaźniki postępu dla długotrwałych operacji
- **Metadata Preservation**: Zachowywanie informacji o trasie w eksportowanych plikach

### 🔄 `route-export-integration.js` - Warstwa Kompatybilności
Zapewnia wsteczną kompatybilność z globalnym API podczas przejścia na modułową architekturę.

#### Główne Funkcje:
- **Global Function Bridge**: Mapowanie funkcji globalnych na metody klasy
- **Initialization Management**: Zarządzanie kolejnością inicjalizacji modułów
- **Fallback Mechanisms**: Mechanizmy awaryjne dla starszych implementacji

### 🗺️ `map-helpers.js` - Narzędzia Mapowe
Biblioteka funkcji pomocniczych do zarządzania warstwami i danymi mapy.

#### `addGeoJsonLine(map, options)` 
Dodaje lub aktualizuje linię z danymi GeoJSON na mapie z zaawansowaną konfiguracją.

**Parametry:**
- `map` - instancja mapy Mapbox GL
- `options` - obiekt konfiguracyjny:
  - `id` (string) - identyfikator warstwy
  - `url` (string, opcjonalny) - URL do pliku GeoJSON
  - `paint` (object, opcjonalny) - style malowania linii
  - `beforeId` (string, opcjonalny) - ID warstwy przed którą dodać nową
  - `fitToData` (boolean, opcjonalny) - czy dopasować widok do danych
  - `padding` (number, opcjonalny) - padding przy dopasowywaniu widoku

**Przykład użycia:**
```javascript
await window.mapHelpers.addGeoJsonLine(map, {
  id: 'trails',
  url: './assets/geo/converted_map.geojson',
  paint: {
    'line-color': '#00FFFF',
    'line-width': 4
  },
  fitToData: true,
  padding: 60
});
```

### 🖼️ `trail-images.js` - Inteligentne Mapowanie Obrazów
Zaawansowany system automatycznego dopasowywania zdjęć szlaków na podstawie nazwy.

#### Funkcjonalności:
- **Smart Matching**: Algorytm dopasowywania z obsługą polskich znaków
- **Keyword System**: Elastyczne mapowanie na podstawie słów kluczowych
- **Fallback Images**: System obrazów zastępczych
- **400+ Trail Images**: Kompletna biblioteka zdjęć szlaków Wałbrzycha

#### Główna Funkcja:
```javascript
function getTrailImage(trailName)
```
Zwraca ścieżkę do odpowiedniego zdjęcia szlaku lub obraz domyślny.

**Algorytm dopasowywania:**
- Konwersja polskich znaków na ASCII
- Analiza słów kluczowych
- Weryfikacja wykluczeń
- Minimalna liczba dopasowań
- Dokładne dopasowanie słów kluczowych

## 🔧 Wzorce Architektury

### Modułowość
Każdy moduł jest samowystarczalny i może być używany niezależnie.

### Error Handling
Wszystkie moduły implementują kompleksową obsługę błędów z informowaniem użytkownika.

### Performance
Optymalizacja dla dużych zestawów danych GeoJSON i operacji Canvas.

### Extensibility  
Łatwa rozszerzalność o nowe formaty eksportu i funkcjonalności.
await RouteExportAPI.exportKML(geojson, name, options);
await RouteExportAPI.exportGPX(geojson, name, options);
const location = await RouteExportAPI.getUserLocation();
await RouteExportAPI.openInGoogleMaps(geojson, name, location);

// Migracja
RouteExportAPI.migrate();   // Zastąp stare funkcje nowymi
RouteExportAPI.restore();   // Przywróć oryginalne funkcje
```

## 🚀 Zalety nowego systemu

### **1. Modularność**
- ✅ Kod eksportu oddzielony od logiki mapy
- ✅ Łatwe testowanie i debugowanie
- ✅ Możliwość reużycia w innych projektach

### **2. Lepsze zarządzanie błędami**
- ✅ Szczegółowe komunikaty błędów
- ✅ Automatyczny fallback do starych funkcji
- ✅ Walidacja danych wejściowych

### **3. Rozszerzalność**
- ✅ Łatwe dodawanie nowych formatów eksportu
- ✅ Konfigurowalne opcje
- ✅ Przygotowane pod eksport PNG

### **4. Lepsze UX**
- ✅ Bardziej niezawodne URL Google Maps
- ✅ Inteligentne cache'owanie geolokalizacji
- ✅ Lepsze komunikaty dla użytkownika

## 📋 Sposób użycia

### **Automatyczna integracja (zalecane)**
Moduły są automatycznie ładowane w `mapa.html` i zastępują stare funkcje:

```javascript
// Te funkcje już działają z nowym systemem:
downloadCurrentRoute('kml');
openRouteInGoogleMaps(geojson, name, userLocation);
```

### **Bezpośrednie użycie API**
```javascript
// Bezpośredni dostęp do nowego API
const result = await RouteExportAPI.exportKML(geojson, 'Moja trasa', {
  lineColor: '#FF0000',
  lineWidth: 3,
  includeUserLocation: true
});

console.log('Eksport zakończony:', result);
```

### **Zaawansowana konfiguracja**
```javascript
// Zmiana domyślnych ustawień
RouteExportAPI.setConfig({
  kml: {
    defaultLineColor: '#00FF00',
    defaultLineWidth: 5
  },
  gpx: {
    trackName: 'Mój własny szlak'
  }
});
```

## 🔄 Migracja z starego systemu

### **Automatyczna migracja (domyślna)**
```javascript
// Automatycznie po załadowaniu strony
RouteExportAPI.migrate();
```

### **Ręczna kontrola**
```javascript
// Testowanie nowego systemu
if (RouteExportAPI.isInitialized()) {
  // Użyj nowego systemu
  await RouteExportAPI.exportKML(geojson, name);
} else {
  // Fallback do starego systemu
  downloadCurrentRouteOriginal('kml');
}
```

### **Przywracanie starego systemu**
```javascript
// W przypadku problemów
RouteExportAPI.restore();
```

## 🐛 Debugging

### **Sprawdzenie statusu**
```javascript
console.log('Moduł zainicjalizowany:', RouteExportAPI.isInitialized());
console.log('Cache lokalizacji:', RouteExportAPI.getUserLocation.cachedUserLocation);
```

### **Czyszczenie cache**
```javascript
RouteExportAPI.clearLocationCache();
```

### **Logi**
Moduł automatycznie loguje swoje działania w konsoli przeglądarki.

## 🔧 Rozwój

### **Dodawanie nowych formatów**
1. Dodaj metodę `exportToXXX()` w `RouteExporter`
2. Rozszerz switch w `exportRoute()`
3. Dodaj odpowiednie API w `route-export-integration.js`

### **Testowanie**
```javascript
// Test eksportu
const testGeoJSON = { /* ... */ };
try {
  const result = await RouteExportAPI.exportKML(testGeoJSON, 'Test');
  console.log('Test zaliczony:', result);
} catch (error) {
  console.error('Test nie zaliczony:', error);
}
```

## 📦 Kompatybilność

- ✅ **Kompatybilny** z istniejącym kodem `app.js`
- ✅ **Fallback** do starych funkcji przy błędach
- ✅ **Zero breaking changes** dla użytkowników
- ✅ **Progresywne ulepszenie** funkcjonalności

## 🚧 Roadmap

- [ ] Eksport do PNG/JPEG
- [ ] Wsparcie dla więcej formatów GPS (TCX, FIT)
- [ ] Offline cache dla Google Maps
- [ ] Batch export wielu tras
- [ ] Integracja z innymi usługami map (OpenStreetMap, Bing)

---

*Utworzono przez Copilot - 7 października 2025*