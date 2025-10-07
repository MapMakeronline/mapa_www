# Route Export Module

## 📖 Opis

Nowy modularny system eksportu tras, który zastępuje poprzednią funkcjonalność pobierania w `app.js`. System składa się z dwóch głównych komponentów:

## 📁 Struktura

```
js/lib/
├── route-export.js              # Główny moduł eksportu
├── route-export-integration.js  # Adapter integracyjny
└── README.md                    # Ta dokumentacja
```

## 🔧 Komponenty

### 1. `route-export.js`
**Główna klasa `RouteExporter`** - czysta implementacja logiki eksportu

**Funkcjonalności:**
- ✅ Eksport do KML z multi-modal routing
- ✅ Eksport do GPX
- ✅ Cache geolokalizacji (5 min)
- ✅ Walidacja współrzędnych
- ✅ Integracja z Google Maps
- ✅ Obsługa błędów i fallback
- 🔄 Eksport do PNG (w przyszłości)

**Główne metody:**
```javascript
const exporter = new RouteExporter();

// Eksport do różnych formatów
await exporter.exportRoute(geojson, name, 'kml', options);
await exporter.exportRoute(geojson, name, 'gpx', options);

// Geolokalizacja
const location = await exporter.getCurrentUserLocation();

// Google Maps
await exporter.openRouteInGoogleMaps(geojson, name, userLocation);
```

### 2. `route-export-integration.js`
**Adapter łączący nowy moduł z istniejącym kodem**

**Funkcjonalności:**
- ✅ Automatyczna inicjalizacja
- ✅ Kompatybilność wsteczna
- ✅ Fallback do starych funkcji przy błędach
- ✅ API do łatwego dostępu
- ✅ Migracja istniejących funkcji

**API dostępu:**
```javascript
// Proste API
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