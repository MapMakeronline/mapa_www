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
  if (typeof RouteExporter === 'undefined') {
    console.error('RouteExporter nie jest załadowany. Sprawdź czy plik route-export.js został dołączony.');
    return false;
  }
  
  routeExporter = new RouteExporter();
  console.log('RouteExporter zainicjalizowany pomyślnie');
  return true;
}

/**
 * Nowa funkcja pobierania trasy - zastępuje downloadCurrentRoute
 * @param {string} format - Format eksportu ('kml', 'gpx', 'png')
 */
async function downloadCurrentRouteNew(format = 'kml', context = {}) {
  try {
    // Sprawdź czy moduł jest zainicjalizowany
    if (!routeExporter) {
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
    console.warn('Używam fallback do starej funkcji downloadCurrentRoute');
    return downloadCurrentRouteOriginal(format);
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