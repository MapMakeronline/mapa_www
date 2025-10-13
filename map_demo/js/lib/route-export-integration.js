/**
 * Route Export Integration
 * Adapter łączący nowy moduł RouteExporter z istniejącym kodem app.js
 * 
 * @author Copilot
 * @version 1.0.0
 */

// Inicjalizacja modułu eksportu
let routeExporter = null;

/**
 * Inicjalizuje moduł eksportu tras
 */
function initializeRouteExporter() {
  console.log('Próba inicjalizacji RouteExporter...');
  console.log('typeof RouteExporter:', typeof RouteExporter);
  
  if (typeof RouteExporter === 'undefined') {
    console.error('RouteExporter nie jest załadowany. Sprawdź czy plik route-export.js został dołączony.');
    console.error('Dostępne globalne obiekty:', Object.keys(window).filter(k => k.includes('Route')));
    return false;
  }
  
  try {
    routeExporter = new RouteExporter();
    console.log('RouteExporter zainicjalizowany pomyślnie');
    return true;
  } catch (error) {
    console.error('Błąd podczas tworzenia instancji RouteExporter:', error);
    return false;
  }
}

/**
 * Pokazuje modal z wyborem opcji eksportu
 */
function showExportChoiceModal({title, subtitle, onDrive, onWalk}) {
  return new Promise((resolve) => {
    // Tworzenie modala
    const modalContainer = document.createElement('div');
    modalContainer.className = 'export-choice-modal-overlay';
    modalContainer.innerHTML = `
      <div class="export-choice-modal">
        <div class="export-choice-header">
          <h3>${title}</h3>
          ${subtitle ? `<p class="export-choice-subtitle">${subtitle}</p>` : ''}
          <button class="export-choice-close" aria-label="Zamknij">&times;</button>
        </div>
        <div class="export-choice-buttons">
          <button class="export-choice-btn export-choice-drive">
            <div class="export-choice-icon">🚗</div>
            <div class="export-choice-text">
              <strong>Dojazd samochodem</strong>
              <span>Do startu szlaku</span>
            </div>
          </button>
          <button class="export-choice-btn export-choice-walk">
            <div class="export-choice-icon">🚶</div>
            <div class="export-choice-text">
              <strong>Przejdź szlak pieszo</strong>
              <span>Cała trasa</span>
            </div>
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modalContainer);
    
    // Focus management
    const firstBtn = modalContainer.querySelector('.export-choice-drive');
    firstBtn.focus();
    
    // Event handlers
    const cleanup = () => {
      document.body.removeChild(modalContainer);
      resolve();
    };
    
    const closeBtn = modalContainer.querySelector('.export-choice-close');
    const driveBtn = modalContainer.querySelector('.export-choice-drive');
    const walkBtn = modalContainer.querySelector('.export-choice-walk');
    
    closeBtn.addEventListener('click', cleanup);
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) cleanup();
    });
    
    driveBtn.addEventListener('click', () => {
      cleanup();
      onDrive();
    });
    
    walkBtn.addEventListener('click', () => {
      cleanup();
      onWalk();
    });
    
    // Keyboard handling
    document.addEventListener('keydown', function handleKeydown(e) {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', handleKeydown);
        cleanup();
      }
      if (e.key === 'Enter') {
        const focusedBtn = document.activeElement;
        if (focusedBtn === driveBtn || focusedBtn === walkBtn) {
          focusedBtn.click();
        }
      }
    });
  });
}

/**
 * Pobiera geolokalizację użytkownika
 */
function getUserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve([position.coords.longitude, position.coords.latitude]);
      },
      () => {
        resolve(null);
      },
      { timeout: 5000, enableHighAccuracy: false }
    );
  });
}

/**
 * Nowa funkcja obsługi kliknięcia przycisku pobierania
 */
async function onClickDownload() {
  try {
    // Sprawdź czy moduł jest zainicjalizowany
    if (!routeExporter) {
      if (!initializeRouteExporter()) {
        throw new Error('Nie udało się zainicjalizować modułu eksportu');
      }
    }
    
    // Pobierz obecną trasę
    const currentPath = window.currentPath;
    const currentItem = window.currentItem;
    
    if (!currentPath || !currentItem) {
      alert('Nie wybrano żadnej trasy do eksportu');
      return;
    }
    
    const name = currentItem.name || 'Trasa';
    
    // Pobierz geolokację
    const userLocation = await getUserLocation();
    
    // Pokaż modal wyboru
    await showExportChoiceModal({
      title: 'Eksport do Google Maps',
      subtitle: `Wybierz opcję dla szlaku "${name}"`,
      onDrive: () => {
        routeExporter.exportDriveToStart(currentPath, name, userLocation);
      },
      onWalk: () => {
        routeExporter.exportWalkTrail(currentPath, name);
      }
    });
    
  } catch (error) {
    console.error('Błąd podczas eksportu:', error);
    alert(`Błąd eksportu: ${error.message}`);
  }
}

/**
 * Nowa funkcja pobierania trasy - zastępuje downloadCurrentRoute
 * @param {string} format - Format eksportu ('kml', 'gpx', 'png')
 */
async function downloadCurrentRouteNew(format = 'kml', context = {}) {
  try {
    console.log(`=== Rozpoczynam eksport ${format} ===`);
    
    // Sprawdź czy moduł jest zainicjalizowany
    if (!routeExporter) {
      console.log('RouteExporter nie jest zainicjalizowany, próbuję zainicjalizować...');
      if (!initializeRouteExporter()) {
        throw new Error('Nie udało się zainicjalizować modułu eksportu');
      }
    }
    
    // Pobierz dane z kontekstu lub użyj globalnych
    const currentItem = context.currentItem || window.currentItem;
    const currentPath = context.currentPath || window.currentPath;
    const map = context.map || window.map;
    const showCustomModal = context.showCustomModal || window.showCustomModal;
    
    // Sprawdź czy mamy aktualną trasę
    if (!currentItem) {
      console.warn('Brak aktualnej trasy do eksportu');
      return;
    }
    
    // Pokaż powiadomienie o rozpoczęciu eksportu
    console.log(`Rozpoczynam eksport trasy "${currentItem.properties?.name || currentItem.name || 'Nieznana trasa'}" do formatu ${format.toUpperCase()}`);
    
    // Debug info dla PNG
    if (format.toLowerCase() === 'png') {
      console.log('PNG Export Debug Info:');
      console.log('- currentPath:', currentPath);
      console.log('- currentItem:', currentItem);
      console.log('- map:', map);
      console.log('- map.getCanvas():', map ? map.getCanvas() : 'brak mapy');
    }
    
    // Wykonaj eksport
    const result = await routeExporter.exportRoute(
      currentPath,
      currentItem.properties?.name || currentItem.name || 'Trasa',
      format,
      {
        includeUserLocation: true, // Automatycznie spróbuj uzyskać lokalizację użytkownika
        lineColor: '#FF0000',
        lineWidth: 3,
        map: map,
        showCustomModal: showCustomModal
      }
    );
    
    console.log('Eksport zakończony pomyślnie:', result);
    return result;
    
  } catch (error) {
    console.error('Błąd podczas eksportu trasy:', error);
    
    // Fallback do starej funkcji w przypadku błędu
    if (typeof downloadCurrentRouteOriginal === 'function') {
      console.warn('Używam fallback do starej funkcji downloadCurrentRoute');
      return downloadCurrentRouteOriginal(format);
    } else {
      // Jeśli nie ma fallback, pokaż błąd użytkownikowi
      alert(`Błąd podczas eksportu ${format.toUpperCase()}: ${error.message}`);
      throw error;
    }
  }
}

/**
 * Nowa funkcja otwierania w Google Maps - zastępuje openRouteInGoogleMaps
 */
async function openRouteInGoogleMapsNew(geojson, name, userLocation = null) {
  try {
    // Sprawdź czy moduł jest zainicjalizowany
    if (!routeExporter) {
      if (!initializeRouteExporter()) {
        throw new Error('Nie udało się zainicjalizować modułu eksportu');
      }
    }
    
    // Jeśli nie podano lokalizacji użytkownika, spróbuj ją uzyskać
    if (!userLocation) {
      try {
        userLocation = await routeExporter.getCurrentUserLocation();
        console.log('Automatycznie uzyskano lokalizację użytkownika');
      } catch (error) {
        console.warn('Nie udało się uzyskać lokalizacji użytkownika:', error);
      }
    }
    
    // Otwórz trasę w Google Maps
    await routeExporter.openRouteInGoogleMaps(geojson, name, userLocation);
    
  } catch (error) {
    console.error('Błąd podczas otwierania Google Maps:', error);
    
    // Fallback do starej funkcji
    console.warn('Używam fallback do starej funkcji openRouteInGoogleMaps');
    return openRouteInGoogleMapsOriginal(geojson, name, userLocation);
  }
}

/**
 * Migruje istniejące funkcje do nowego systemu
 */
function migrateToNewExportSystem() {
  // Zachowaj oryginalne funkcje jako backup
  if (typeof downloadCurrentRoute === 'function') {
    window.downloadCurrentRouteOriginal = downloadCurrentRoute;
  }
  
  if (typeof openRouteInGoogleMaps === 'function') {
    window.openRouteInGoogleMapsOriginal = openRouteInGoogleMaps;
  }
  
  // Zastąp funkcje nowymi wersjami
  window.downloadCurrentRoute = downloadCurrentRouteNew;
  window.openRouteInGoogleMaps = openRouteInGoogleMapsNew;
  
  console.log('Migracja do nowego systemu eksportu zakończona');
}

/**
 * Przywraca oryginalne funkcje
 */
function restoreOriginalExportSystem() {
  if (typeof downloadCurrentRouteOriginal === 'function') {
    window.downloadCurrentRoute = downloadCurrentRouteOriginal;
  }
  
  if (typeof openRouteInGoogleMapsOriginal === 'function') {
    window.openRouteInGoogleMaps = openRouteInGoogleMapsOriginal;
  }
  
  console.log('Przywrócono oryginalny system eksportu');
}

/**
 * Funkcje pomocnicze dla łatwiejszego dostępu
 */
const RouteExportAPI = {
  // Eksport do różnych formatów
  exportKML: async (geojson, name, options = {}) => {
    if (!routeExporter) initializeRouteExporter();
    return await routeExporter.exportRoute(geojson, name, 'kml', options);
  },
  
  exportGPX: async (geojson, name, options = {}) => {
    if (!routeExporter) initializeRouteExporter();
    return await routeExporter.exportRoute(geojson, name, 'gpx', options);
  },
  
  // Funkcje geolokalizacji
  getUserLocation: async (useCache = true) => {
    if (!routeExporter) initializeRouteExporter();
    return await routeExporter.getCurrentUserLocation(useCache);
  },
  
  clearLocationCache: () => {
    if (routeExporter) routeExporter.clearLocationCache();
  },
  
  // Google Maps integration
  openInGoogleMaps: async (geojson, name, userLocation = null) => {
    if (!routeExporter) initializeRouteExporter();
    return await routeExporter.openRouteInGoogleMaps(geojson, name, userLocation);
  },
  
  // Konfiguracja
  setConfig: (config) => {
    if (!routeExporter) initializeRouteExporter();
    routeExporter.setConfig(config);
  },
  
  // Status
  isInitialized: () => routeExporter !== null,
  
  // Migracja
  migrate: migrateToNewExportSystem,
  restore: restoreOriginalExportSystem
};

// Automatyczna inicjalizacja po załadowaniu DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeRouteExporter);
} else {
  initializeRouteExporter();
}

// Eksportuj API
window.RouteExportAPI = RouteExportAPI;
window.downloadCurrentRouteNew = downloadCurrentRouteNew;