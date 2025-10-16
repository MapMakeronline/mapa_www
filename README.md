# Interaktywna Mapa Szlaków Wałbrzyskich

Zaawansowana interaktywna mapa szlaków turystycznych w rejonie Wałbrzycha z funkcjonalnościami animacji, eksportu i wyszukiwania. Aplikacja umożliwia eksplorację tras turystycznych, animowane śledzenie kamerą oraz eksport do wielu formatów.

## 🎯 Kluczowe Funkcjonalności

### 🗺️ Interaktywna Mapa
- Mapbox GL JS z obsługą 3D terrain
- Animowana kamera śledząca trasę
- Kontrola prędkości odtwarzania (0.5× - 2.25×)
- Timeline z precyzyjnym pozycjonowaniem
- Responsywny design (desktop/mobile)

### 📤 Eksport Wieloformatowy
- **PNG Export**: Wysokiej jakości zrzuty mapy z informacjami o trasie
- **KML Export**: Export do Google Maps (tryb jazdy samochodem do początku szlaku)
- **GPX Export**: Standardowy format GPS dla urzą## 📜 Licencja

Projekt jest dostępny na licencji [MIT](LICENSE).

## 🙏 Podziękowania

- [Mapbox](https://www.mapbox.com/) za dostarczenie API map
- [Turf.js](https://turfjs.org/) za narzędzia do analizy danych geograficznych
- Społeczność OpenStreetMap za dane szlaków turystycznych

## 📈 Historia Wersji

### v2024.10 - System Filtrów Facet
- ✨ Dodano zwijane filtry z kompaktowym interfejsem
- 🎨 Multi-select dla kolorów szlaków
- 💾 Zaawansowane zarządzanie stanem w localStorage
- ♿ Pełne wsparcie ARIA dla dostępności
- 🔄 Automatyczna migracja formatów danych
- 📱 Ulepszona responsywność na urządzeniach mobilnych

### v2024.09 - Export i Modularyzacja
- 📤 System eksportu do PNG/KML/GPX
- 🏗️ Modułowa architektura JavaScript
- 🖼️ Inteligentne mapowanie zdjęć szlaków
- 🎮 Ulepszone kontrolki odtwarzania

### v2024.08 - Podstawowa Funkcjonalność
- 🗺️ Implementacja Mapbox GL JS z animacją 3D
- 📍 System ładowania danych GeoJSON
- 🎬 Animowana kamera śledząca trasę
- 📱 Responsywny design desktop/mobileigacyjnych

### 🔍 Wyszukiwanie i Filtrowanie
- Inteligentne wyszukiwanie szlaków po nazwie
- **Zaawansowane filtry facet**:
  - Dystans: 0-3 km, 3-8 km, >8 km
  - Kolor szlaku: multi-select (niebieski, czerwony, zielony, żółty)
  - Tylko zapisane: szybki dostęp do ulubionych tras
- **Zwijany interfejs**: Kompaktowy przycisk "Filtry (n)" z płynną animacją
- Filtrowanie w czasie rzeczywistym z debounce
- Zachowywanie stanu filtrów w localStorage

### 🎨 Interfejs Użytkownika
- Ciemny motyw z płynną animacją
- Sidebar z listą szlaków i systemem zapisywania
- **Zwijane filtry**: Elegancki panel z licznikiem aktywnych filtrów
- FAB menu dla urządzeń mobilnych
- Backdrop blur effects
- Pełne wsparcie ARIA dla dostępności

## 🏗️ Architektura Techniczna

### Modułowa Struktura JavaScript
```
map_demo/
├── js/
│   ├── app.js                 # Główna aplikacja + system filtrów
│   ├── config.*.js            # Konfiguracja (local/UI)
│   └── lib/
│       ├── route-export.js              # Klasa RouteExporter
│       ├── route-export-integration.js  # Integracja wsteczna
│       ├── map-helpers.js              # Pomocniki mapy
│       └── trail-images.js             # Mapowanie obrazów szlaków
```

### Nowe Funkcjonalności (v2024.10)
- **Zwijane filtry**: Kompaktowy UI z animowanym rozwijaniem
- **Multi-select kolory**: Wybór wielu kolorów szlaków jednocześnie
- **System state management**: Zaawansowane zarządzanie stanem filtrów
- **ARIA accessibility**: Pełne wsparcie dla technologii asystujących
- **Migracja danych**: Automatyczna konwersja starych formatów localStorage

### Technologie i Biblioteki
- **Mapbox GL JS v3.0**: Renderowanie mapy z preserveDrawingBuffer
- **Turf.js**: Obliczenia geometryczne
- **Canvas API**: Generowanie PNG z overlayami
- **Fetch API**: Asynchroniczne ładowanie danych GeoJSON
- **ES6+ Modules**: Modułowa architektura

### Dane i Zasoby
- **GeoJSON**: Dane szlaków z OpenStreetMap
- **Trail Images**: 400+ zdjęć szlaków z inteligentnym mapowaniem
- **CSS3**: Zaawansowane animacje i responsywność

![Interaktywna Mapa Szlaków Pieszych](https://storage.googleapis.com/maps-mapmaker-production-293411-demo/map_demo/mapa.html)

Aby osadzić mapę w WordPress za pomocą Elementora, dodaj blok HTML i wstaw odpowiedni kod iFrame.

#### Gotowce iFrame

**Pełna szerokość (desktop):**
```html
<iframe
  src="https://storage.googleapis.com/maps-mapmaker-production-293411-demo/map_demo/mapa.html?v=20251001"
  width="100%"
  height="800"
  style="border:0; aspect-ratio: 16/9; max-width: 100%;"
  loading="lazy"
  allowfullscreen>
</iframe>
```

**Kafelek 16:9 (w kolumnie):**
```html
<iframe
  src="https://storage.googleapis.com/maps-mapmaker-production-293411-demo/map_demo/mapa.html?v=20251001"
  width="100%"
  height="480"
  style="border:0; aspect-ratio: 16/9; max-width: 100%;"
  loading="lazy"
  allowfullscreen>
</iframe>
```

**Mobile (sekcja z min-height):**
```html
<iframe
  src="https://storage.googleapis.com/maps-mapmaker-production-293411-demo/map_demo/mapa.html?v=20251001"
  width="100%"
  style="border:0; width:100%; min-height:70vh; max-width: 100%;"
  loading="lazy"
  allowfullscreen>
</iframe>
```

> Po aktualizacji treści dopisz/zmień `?v=YYYYMMDD` (np. `?v=20251001`), aby ominąć cache przeglądarki.

## 📋 Spis treści

1. [🚀 Funkcjonalności](#-funkcjonalności)
2. [🛠️ Technologie](#️-technologie)
3. [📋 Wymagania](#-wymagania)
4. [💻 Instalacja i uruchomienie](#-instalacja-i-uruchomienie)
5. [🎮 Instrukcja obsługi](#-instrukcja-obsługi)
6. [⚙️ Dostosowanie](#️-dostosowanie)
7. [🔄 Dane](#-dane)
8. [📱 Responsywność](#-responsywność)
9. [👨‍💻 Rozwój projektu](#-rozwój-projektu)
10. [🚀 Deployment (GCP + WordPress)](#-deployment-gcp--wordpress)
    - [Przygotowanie do wdrożenia](#przygotowanie-do-wdrożenia)
    - [Wdrożenie aplikacji](#wdrożenie-aplikacji)
    - [Osadzanie w WordPress](#osadzanie-w-wordpress)
    - [Zabezpieczenie tokena Mapbox](#zabezpieczenie-tokena-mapbox)
    - [Dodatkowe opcje](#dodatkowe-opcje)
    - [Zarządzanie plikami w Google Cloud Storage](#zarządzanie-plikami-w-google-cloud-storage)
        - [Przeglądanie plików](#przeglądanie-plików)
        - [Publiczne URL-e](#publiczne-url-e)
        - [Operacje na plikach](#operacje-na-plikach)
    - [Aktualizacja plików po zmianach](#aktualizacja-plików-po-zmianach)
        - [Scenariusz A — mała zmiana jednego pliku](#scenariusz-a--mała-zmiana-jednego-pliku)
        - [Scenariusz B — większa zmiana (pełny redeploy)](#scenariusz-b--większa-zmiana-pełny-redeploy)
        - [Scenariusz C — Dodanie nowego GeoJSON (3 warianty)](#scenariusz-c--dodanie-nowego-geojson-3-warianty)
            - [Wariant 1 — Podmiana istniejących danych](#wariant-1--podmiana-istniejących-danych-na-nowe-ten-sam-url)
            - [Wariant 2 — Dodatkowa warstwa](#wariant-2--drugi-geojson-jako-dodatkowa-warstwa-na-tej-samej-stronie)
            - [Wariant 3 — Nowa strona z nowymi danymi](#wariant-3--nowa-strona-z-nowymi-danymi)
11. [📂 Struktura kodu](#-struktura-kodu)
    - [Główne pliki i katalogi](#główne-pliki-i-katalogi)
    - [Kluczowe pliki i ich funkcje](#kluczowe-pliki-i-ich-funkcje)
        - [`mapa.html`](#mapahtml)
        - [`js/app.js`](#jsappjs)
        - [`js/config.*.js`](#jsconfigjs-pliki-konfiguracyjne)
        - [`js/lib/map-helpers.js`](#jslibmap-helpersjs)
    - [Kluczowe funkcje](#kluczowe-funkcje)
        - [W `app.js`](#w-appjs)
        - [W `map-helpers.js`](#w-map-helpersjs)
12. [📜 Licencja](#-licencja)
13. [🙏 Podziękowania](#-podziękowania)

## 🚀 Funkcjonalności

### 📍 Eksploracja Szlaków
- **Interaktywna mapa**: Mapbox GL JS z renderowaniem 3D terrain
- **400+ szlaków**: Kompletna baza szlaków Wałbrzycha z OpenStreetMap
- **Inteligentne obrazy**: Automatyczne mapowanie zdjęć szlaków na podstawie nazw
- **Zaawansowane filtry**: System facet z multi-select dla kolorów szlaków
- **Zapisywanie tras**: System ulubionych z lokalnym przechowywaniem

### 🔍 System Filtrowania
- **Dystans tras**: Single-select (0-3 km, 3-8 km, >8 km)
- **Kolory szlaków**: Multi-select (niebieski, czerwony, zielony, żółty)
- **Tylko zapisane**: Szybki dostęp do ulubionych tras
- **Zwijany interfejs**: Kompaktowy przycisk "Filtry (n)" z animacją
- **Wyszukiwanie tekstowe**: Filtrowanie po nazwie z debounce 120ms

### 🎬 Animacja i Kamera
- **Dynamiczne śledzenie**: Kamera podąża za trasą z automatycznym obrotem
- **Kontrola prędkości**: 4 poziomy (0.5× - 2.25×)
- **Timeline**: Precyzyjne pozycjonowanie w czasie rzeczywistym
- **Smooth transitions**: Płynne przejścia między szlakami

### 📤 Export Wieloformatowy
- **PNG Export**: Wysokiej jakości zrzuty mapy z overlayami informacyjnymi
- **KML Export**: Integracja z Google Maps (tryb jazdy do początku szlaku)
- **GPX Export**: Format GPS dla urządzeń nawigacyjnych
- **Metadata preservation**: Zachowywanie informacji o trasie w eksportowanych plikach

### 📱 Responsywny Design
- **Desktop**: Pełnoprawny interface z sidebar i timeline
- **Mobile**: Zoptymalizowany FAB menu i dotykowe sterowanie
- **Accessibility**: Pełne wsparcie dla screen readerów i klawiatury
- **Dark theme**: Elegancki ciemny motyw z backdrop blur effects

## 🛠️ Stack Technologiczny

### Frontend Core
- **HTML5/CSS3**: Semantyczny markup z zaawansowanym CSS Grid/Flexbox
- **JavaScript ES6+**: Modułowa architektura z async/await
- **Canvas API**: Renderowanie PNG z overlayami
- **Fetch API**: Asynchroniczne ładowanie danych GeoJSON

### Biblioteki Mapowe
- **[Mapbox GL JS v3.0](https://docs.mapbox.com/mapbox-gl-js/)**: Renderowanie WebGL z preserveDrawingBuffer
- **[Turf.js](https://turfjs.org/)**: Obliczenia geometryczne i analiza przestrzenna
- **GeoJSON**: Format danych geograficznych z metadanymi

### Architektura Modułowa
- **RouteExporter Class**: Centralizowany system eksportu (PNG/KML/GPX)
- **Map Helpers**: Biblioteka pomocnicza dla operacji mapowych
- **Trail Images**: Inteligentne mapowanie obrazów szlaków
- **Config System**: Rozdzielona konfiguracja (local/UI/example)

## 📋 Wymagania

- Token dostępu do API Mapbox
- Nowoczesna przeglądarka internetowa z obsługą JavaScript

### Wymagania przeglądarki
- Przeglądarka z **WebGL**: Chrome, Firefox, Edge, Safari (nowsze wersje).
- Zalecane: stabilne łącze internetowe i włączony JavaScript.
- Mobile: nowsze Android/iOS; wydajność zależna od urządzenia (GPU/RAM).

### Kompatybilność z przeglądarkami

Aplikacja działa poprawnie na większości nowoczesnych przeglądarek w ich najnowszych wersjach:
- Google Chrome (rekomendowana)
- Microsoft Edge
- Mozilla Firefox
- Safari

#### Znane ograniczenia
- **Internet Explorer**: Aplikacja nie jest kompatybilna z IE11 ani starszymi wersjami
- **Stare wersje przeglądarek**: Aplikacja wymaga obsługi nowoczesnych standardów JavaScript (ES6+)
- **Mobilne przeglądarki**: Na niektórych starszych urządzeniach mogą występować problemy z wydajnością
- Bardzo duże pliki **GeoJSON** mogą wolniej się renderować
- Słabsze urządzenia mobilne: niższa płynność, krótszy czas pracy na baterii
- Limit zapytań Mapbox przy dużym ruchu (zależny od planu)

## 💻 Instalacja i uruchomienie

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/MapMakeronline/mapa_www.git
   cd mapa_www
   ```

2. Skonfiguruj token Mapbox:
   - Skopiuj plik `map_demo/js/config.example.js` do `map_demo/js/config.local.js`
   - Wpisz swój token Mapbox w pliku `config.local.js`:
     ```javascript
     window.CONFIG = {
       MAPBOX_TOKEN: 'twój_token_mapbox',
       GEOJSON_URL: "./assets/geo/converted_map.geojson"
     };
     ```

3. Uruchom lokalny serwer (przykładowo za pomocą Live Server w VS Code lub Python):
   ```bash
   # Za pomocą Python:
   cd map_demo
   python -m http.server
   ```

4. Otwórz przeglądarkę i przejdź pod adres `http://localhost:8000`

## 🎮 Instrukcja obsługi

### Szybki start (60 sekund)
1. **Otwórz mapę**: strona ładuje się automatycznie z widokiem początkowym.
2. **Filtry**: Kliknij "Filtry" aby rozwinąć opcje filtrowania:
   - Wybierz dystans tras (0-3 km, 3-8 km, >8 km)
   - Wybierz kolory szlaków (można wybrać kilka naraz)
   - Włącz "Tylko zapisane" dla ulubionych tras
3. **Wyszukaj**: Użyj pola wyszukiwania do znalezienia konkretnej trasy
4. **Wybierz szlak** z listy po prawej stronie, aby rozpocząć animację.
5. **Steruj odtwarzaniem**: używaj panelu kontrolnego na dole ekranu do:
   - Pauzowania/wznawiania animacji
   - Ponownego odtworzenia animacji po jej zakończeniu (przycisk "Replay")
   - Zmiany prędkości odtwarzania
   - Przewijania postępu za pomocą suwaka
   - Pobierania danych szlaku
6. **Zapisz trasę**: Kliknij serduszko przy trasie aby dodać do ulubionych
7. Po zakończeniu animacji pasek odtwarzania pozostaje widoczny, umożliwiając ponowne odtworzenie
8. Na urządzeniach mobilnych można schować/pokazać panel boczny za pomocą przycisku menu

### Filtry i wyszukiwanie
- **Filtry zwijane**: Kliknij "Filtry (n)" aby rozwinąć/zwinąć panel filtrów
- **Multi-select kolory**: Wybierz kilka kolorów szlaków jednocześnie
- **Wyszukiwanie live**: Wpisuj nazwę trasy dla natychmiastowego filtrowania
- **Zapisane trasy**: System ulubionych z przyciskiem serduszka
- **Stan filtrów**: Automatyczne zapisywanie ustawień między sesjami

### Sterowanie i gesty
- **Mysz/trackpad:** przewijanie = zoom · przeciąganie = przesuwanie · prawy przycisk + przeciąganie = obrót/pochylenie.
- **Dotyk (mobile):** szczypanie = zoom · dwa palce = obrót/pochylenie.
- **Skróty:** spacja = pauza/wznowienie · R = reset · ←/→ = krok w tył/przód (jeśli włączone).

## ⚙️ Dostosowanie

Ustawienia interfejsu można zmienić w pliku `js/config.ui.js`:

```javascript
window.UI = {
  LINE_COLOR: '#00FFFF',   // Kolor linii szlaku
  LINE_WIDTH: 4,           // Grubość linii szlaku
  FIT_PADDING: 60,         // Margines wokół szlaku przy dopasowaniu widoku
  START_CENTER: [16.29, 50.77],  // Początkowy środek mapy [lng, lat]
  START_ZOOM: 12,          // Początkowe przybliżenie
  START_PITCH: 55,         // Początkowe nachylenie kamery
  START_BEARING: 10        // Początkowy kierunek kamery
};
```

## 🔄 Dane

Projekt wykorzystuje dane w formacie GeoJSON. Domyślnie aplikacja wczytuje dane z pliku `assets/geo/converted_map.geojson`. Możesz zastąpić ten plik własnymi danymi lub zmienić źródło w pliku konfiguracyjnym.

## 📱 Responsywność

Aplikacja jest w pełni responsywna i dostosowuje się do różnych rozmiarów ekranów:
- Na urządzeniach mobilnych panel boczny można ukryć/pokazać
- Elementy interfejsu zmieniają układ dla optymalnego doświadczenia użytkownika

## 🎨 Personalizacja wizualna

### Kolory i style

Podstawowe kolory i style można zmienić w pliku `config.ui.js`:

```javascript
window.UI = {
  LINE_COLOR: '#00FFFF',   // Kolor linii szlaku (cyjan)
  LINE_WIDTH: 4,           // Grubość linii szlaku
  // ... inne ustawienia
};
```

Bardziej zaawansowane zmiany stylów wymagają modyfikacji pliku `assets/css/styles.css`:

```css
/* Przykłady stylowania elementów */

/* Panel boczny */
.sidebar {
  background-color: rgba(35, 55, 75, 0.9);
}

/* Przyciski odtwarzania */
.timeline-controls button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

/* Marker trasy */
.marker {
  background-color: #007cbf;
  border: 2px solid white;
}
```

### Style mapy

W pliku `app.js` można zmienić styl mapy (dostępne style Mapbox):

```javascript
// Przykładowe style mapy
const mapStyles = {
  outdoors: 'mapbox://styles/mapbox/outdoors-v12',  // Standardowy styl outdoor
  satellite: 'mapbox://styles/mapbox/satellite-streets-v12',  // Zdjęcia satelitarne z ulicami
  light: 'mapbox://styles/mapbox/light-v11',  // Jasny, minimalny styl
  dark: 'mapbox://styles/mapbox/dark-v11',  // Ciemny styl
  streets: 'mapbox://styles/mapbox/streets-v12'  // Standardowy styl uliczny
};

// Zmień style w funkcji inicjalizacji mapy
const map = new mapboxgl.Map({
  container: 'map',
  style: mapStyles.outdoors,  // Wybierz styl
  // ...
});
```

## 👨‍💻 Rozwój projektu

Projekt jest stale rozwijany. Ostatnio dodane funkcje:
- Przycisk "Replay" umożliwiający ponowne odtworzenie animacji dla wybranego szlaku
- Ujednolicony wygląd przycisków na pasku odtwarzania dla lepszej estetyki
- Naprawiona funkcjonalność przycisków pauza/wznów i innych kontrolek animacji
- Ulepszony system zarządzania stanem animacji po jej zakończeniu
- Dostosowane zachowanie paska odtwarzania, który pozostaje widoczny po zakończeniu animacji

### Konwencje i standardy (dla deweloperów)

Podczas rozwijania projektu zaleca się przestrzeganie następujących konwencji:

1. **JavaScript:**
   - Używamy ES6+ (koniecznie obsługiwane przez nowoczesne przeglądarki)
   - Async/await zamiast callbacków tam, gdzie to możliwe
   - Camel case dla zmiennych i funkcji (`initMap`, `currentRoute`)
   - Komentarze JSDoc dla głównych funkcji

2. **CSS:**
   - BEM (Block Element Modifier) dla nazewnictwa klas
   - Zmienne CSS dla kolorów i powtarzalnych wartości
   - Media queries dla różnych rozmiarów ekranów

3. **Pliki i katalogi:**
   - Nazwy małymi literami z myślnikami (`map-helpers.js`, `user-controls.js`)
   - Logiczny podział funkcji między plikami
   - Biblioteki zewnętrzne zawsze w osobnym katalogu (`js/vendor/`)

4. **Git:**
   - Opisowe nazwy commitów w języku angielskim
   - Osobne branche dla nowych funkcji (`feature/search-filter`)
   - Pull requesty dla większych zmian

5. **GeoJSON:**
   - Poprawny format GeoJSON zgodny ze specyfikacją
   - Jednolity system nazewnictwa właściwości (`name`, `type`, `difficulty`)
   - Walidacja przed wdrożeniem

Plany na przyszłość:
- Implementacja wyszukiwarki i filtrowania szlaków
- Dodanie informacji o punktach POI wzdłuż trasy
- Rozszerzenie statystyk dla szlaków (długość, przewyższenie, trudność)
- Możliwość zapisywania ulubionych tras
- Więcej opcji kamery
- Warstwy mapy

## 🚀 Deployment (GCP + WordPress)

Aplikacja może być łatwo wdrożona na Google Cloud Storage i osadzona w WordPress za pomocą Elementora.

### Przygotowanie do wdrożenia

1. **Konfiguracja Google Cloud Platform:**
   ```bash
   gcloud config set project [TWÓJ_PROJECT_ID]
   PROJECT_ID="$(gcloud config get-value project)"
   REGION="europe-central2"
   BUCKET="maps-${PROJECT_ID}-demo"
   ```

2. **Utworzenie i konfiguracja bucketa:**
   ```bash
   gsutil mb -p "$PROJECT_ID" -l "$REGION" -c STANDARD "gs://$BUCKET"
   gsutil uniformbucketlevelaccess set on "gs://$BUCKET"
   gsutil iam ch allUsers:objectViewer "gs://$BUCKET"
   ```

3. **Konfiguracja produkcyjna Mapbox:**
   Utwórz plik `map_demo/js/config.prod.js` (nie dodawaj do repozytorium):
   ```javascript
   window.CONFIG = {
     MAPBOX_TOKEN: "TWÓJ_PUBLICZNY_TOKEN_MAPBOX",
     GEOJSON_URL: "./assets/geo/converted_map.geojson"
   };
   ```

### Wdrożenie aplikacji

1. **Przygotowanie plików:**
   ```bash
   mkdir -p /tmp/deploy
   cp -r map_demo /tmp/deploy/
   sed -i 's#./js/config.local.js#./js/config.prod.js#g' /tmp/deploy/map_demo/mapa.html
   
   # GeoJSON w docelowej ścieżce
   mkdir -p /tmp/deploy/map_demo/assets/geo
   [ -f converted_map.geojson ] && cp converted_map.geojson /tmp/deploy/map_demo/assets/geo/converted_map.geojson
   ```

2. **Upload na GCS:**
   ```bash
   gsutil -m rsync -r -d /tmp/deploy/map_demo "gs://$BUCKET/map_demo"
   
   # Ustawienie poprawnych typów MIME
   gsutil -m setmeta -h "Content-Type:text/javascript" "gs://$BUCKET/map_demo/js/*.js"
   gsutil -m setmeta -h "Content-Type:text/css" "gs://$BUCKET/map_demo/assets/css/*.css"
   ```

3. **Publiczny URL aplikacji:**
   ```
   https://storage.googleapis.com/maps-mapmaker-production-293411-demo/map_demo/mapa.html
   ```

### Osadzanie w WordPress

Aby osadzić mapę w WordPress za pomocą Elementora, dodaj blok HTML i wstaw następujący kod:

```html
<iframe
  src="https://storage.googleapis.com/[NAZWA_BUCKETA]/map_demo/mapa.html"
  width="100%"
  height="800"
  style="border:0; aspect-ratio: 16/9; max-width: 100%;"
  loading="lazy"
  allowfullscreen>
</iframe>
```
----------------------------------------------------------------------------------------------------
### DODATKOWO

### Zabezpieczenie tokena Mapbox

Zaleca się utworzenie specjalnego tokena produkcyjnego w Mapbox Dashboard z ograniczeniami:
- Ustaw nazwę (np. `prod_gcs_mapa`)
- Pozostaw domyślne uprawnienia (styles/tiles/fonts/images:read)
- Ogranicz dozwolone URL-e do:
  - `https://storage.googleapis.com/[NAZWA_BUCKETA]/*`
  - `https://twojadomena.pl/*` (opcjonalnie)

### Dodatkowe opcje

- **Cache dla statycznych plików:**
  ```bash
  gsutil -m setmeta -h "Cache-Control:public,max-age=86400" "gs://$BUCKET/map_demo/js/*.js" "gs://$BUCKET/map_demo/assets/css/*.css" "gs://$BUCKET/map_demo/assets/geo/*.geojson"
  ```

- **Content Security Policy (CSP):**
  ```bash
  gsutil -m setmeta -h "Content-Security-Policy: frame-ancestors 'self' https://twojadomena.pl" "gs://$BUCKET/map_demo/mapa.html"
  ```

- **Szybki redeploy:**
  ```bash
  gsutil -m rsync -r -d /tmp/deploy/map_demo gs://$BUCKET/map_demo
  ```

### Zarządzanie plikami w Google Cloud Storage

#### Przeglądanie plików

**W przeglądarce (konsola GCP):**
1. Wejdź do **Cloud Console → Cloud Storage → Buckets (Przeglądarka)**
2. Kliknij bucket **`maps-mapmaker-production-293411-demo`** (lub nazwę Twojego bucketa)
S3. Otwórz folder **`map_demo/`** – tam znajdują się wszystkie pliki (np. `mapa.html`, `js/`, `assets/`)

**Z Cloud Shell (terminal):**
```bash
# lista na poziomie głównym bucketa
gsutil ls gs://maps-mapmaker-production-293411-demo

# rekursywnie cała zawartość map_demo/
gsutil ls -r gs://maps-mapmaker-production-293411-demo/map_demo/**

# szczegóły pojedynczego pliku (Content-Type, rozmiar, itp.)
gsutil ls -L gs://maps-mapmaker-production-293411-demo/map_demo/js/config.prod.js
```

#### Publiczne URL-e

**Strona główna:**  
```
https://storage.googleapis.com/maps-mapmaker-production-293411-demo/map_demo/mapa.html
```

**Pojedyncze pliki (przykłady):**
```
https://storage.googleapis.com/maps-mapmaker-production-293411-demo/map_demo/js/app.js
https://storage.googleapis.com/maps-mapmaker-production-293411-demo/map_demo/assets/css/styles.css
```

#### Operacje na plikach

**Pobranie pliku na Cloud Shell:**
```bash
gsutil cp gs://maps-mapmaker-production-293411-demo/map_demo/js/config.prod.js .
```

**Podmiana pliku na serwerze:**
```bash
gsutil cp map_demo/js/config.prod.js gs://maps-mapmaker-production-293411-demo/map_demo/js/config.prod.js
```

**Usunięcie pliku:**
```bash
gsutil rm gs://maps-mapmaker-production-293411-demo/map_demo/assets/geo/converted_map.geojson
```

> **Uwaga:** katalog `/tmp/deploy/` jest tylko w Cloud Shell (tymczasowa kopia do wysyłki).  
> Na serwerze (GCS) pliki są *wyłącznie* w buckecie pod `map_demo/`.

### Aktualizacja plików po zmianach

#### Scenariusz A — mała zmiana jednego pliku
Przykład: zmiana `app.js`, `styles.css` albo `config.prod.js`.

```bash
# podmiana konkretnego pliku
gsutil cp map_demo/js/app.js gs://maps-mapmaker-production-293411-demo/map_demo/js/app.js
# (jeśli CSS)
gsutil cp map_demo/assets/css/styles.css gs://maps-mapmaker-production-293411-demo/map_demo/assets/css/styles.css

# ustaw poprawny MIME (gdy dotyczy)
gsutil setmeta -h "Content-Type:text/javascript" gs://maps-mapmaker-production-293411-demo/map_demo/js/app.js
gsutil setmeta -h "Content-Type:text/css" gs://maps-mapmaker-production-293411-demo/map_demo/assets/css/styles.css
```

> Jeśli przeglądarka trzyma starą wersję, dodaj parametr do iFrame: `...?v=YYYYMMDD` (np. `...?v=20251001`).

#### Scenariusz B — większa zmiana (pełny redeploy)
```bash
/bin/rm -rf /tmp/deploy && mkdir -p /tmp/deploy && cp -r map_demo /tmp/deploy/
sed -i 's#./js/config.local.js#./js/config.prod.js#g' /tmp/deploy/map_demo/mapa.html
gsutil -m rsync -r -d /tmp/deploy/map_demo gs://maps-mapmaker-production-293411-demo/map_demo
gsutil -m setmeta -h "Content-Type:text/javascript" gs://maps-mapmaker-production-293411-demo/map_demo/js/*.js
gsutil -m setmeta -h "Content-Type:text/css" gs://maps-mapmaker-production-293411-demo/map_demo/assets/css/*.css
```

#### Scenariusz C — Dodanie nowego GeoJSON (3 warianty)

Istnieją trzy główne podejścia do aktualizacji lub dodawania nowych danych GeoJSON, w zależności od potrzeb projektu:

##### Wariant 1 — Podmiana istniejących danych na nowe (ten sam URL)

**Kiedy stosować:** gdy chcesz, aby aktualna strona pokazywała nowy zestaw tras (np. Hel zamiast Wałbrzycha).

1. **Lokalnie podmień plik:** `map_demo/assets/geo/converted_map.geojson` na nowy GeoJSON.
2. **(Opcjonalnie) zaktualizuj startowy widok** w `map_demo/js/config.ui.js`:
   ```javascript
   window.UI = {
     LINE_COLOR: '#00FFFF',   // Kolor linii szlaku
     LINE_WIDTH: 4,           // Grubość linii szlaku
     FIT_PADDING: 60,         // Margines wokół szlaku przy dopasowaniu widoku
     START_CENTER: [18.80, 54.60],  // Nowy środek mapy [lng, lat] np. dla Helu
     START_ZOOM: 11,          // Dostosowane przybliżenie
     START_PITCH: 55,         // Nachylenie kamery
     START_BEARING: 10        // Kierunek kamery
   };
   ```
3. **Prześlij plik na serwer:**
   ```bash
   gsutil cp map_demo/assets/geo/converted_map.geojson gs://maps-mapmaker-production-293411-demo/map_demo/assets/geo/converted_map.geojson
   ```
4. **W Elementorze dodaj parametr wersji** do iFrame, aby ominąć cache:
   `...?v=20251001`

> Dzięki auto-zoomowi (`fitBounds`) mapa sama przeleci nad nowymi danymi.

##### Wariant 2 — Drugi GeoJSON jako dodatkowa warstwa na tej samej stronie

**Kiedy stosować:** gdy chcesz mieć kilka tras/obszarów w jednym interfejsie i umożliwić przełączanie między nimi.

1. **Dodaj nowy plik GeoJSON**, np.: `map_demo/assets/geo/hel.geojson`.
2. **W `map_demo/js/app.js` dodaj nową warstwę** po załadowaniu mapy:
   ```javascript
   await window.mapHelpers.addGeoJsonLine(map, {
     id: 'route-hel',
     url: './assets/geo/hel.geojson',
     paint: { 'line-color': '#00E5FF', 'line-width': 4 },
     beforeId: 'hiking-color',   // lub inny layer, nad/pod którym chcesz rysować
     fitToData: false            // fit wykonamy ręcznie przy kliknięciu
   });

   // Prosty przycisk na liście (przykład):
   document.getElementById('list')?.insertAdjacentHTML('beforeend',
     '<div class="item" id="item-hel"><div class="name">Hel – trasa</div></div>');

   // Fit do danych po kliknięciu:
   (async () => {
     const data = await (await fetch('./assets/geo/hel.geojson')).json();
     const bbox = turf.bbox(data);
     document.getElementById('item-hel')?.addEventListener('click', () => {
       map.fitBounds(bbox, { padding: 60 });
     });
   })();
   ```
3. **Prześlij pliki na serwer:**
   ```bash
   gsutil cp map_demo/assets/geo/hel.geojson gs://maps-mapmaker-production-293411-demo/map_demo/assets/geo/hel.geojson
   gsutil cp map_demo/js/app.js gs://maps-mapmaker-production-293411-demo/map_demo/js/app.js
   gsutil setmeta -h "Content-Type:text/javascript" gs://maps-mapmaker-production-293411-demo/map_demo/js/app.js
   ```

> Możesz dodać ukrywanie/pokazywanie warstw: `map.setLayoutProperty('route-hel-line','visibility','none'|'visible')`.

##### Wariant 3 — Nowa strona z nowymi danymi

**Kiedy stosować:** gdy potrzebujesz osobnego adresu URL dla nowej mapy (np. do innego iFrame).

1. **Sklonuj istniejącą stronę:**
   ```bash
   cp map_demo/mapa.html map_demo/mapa_hel.html
   ```
2. **Utwórz osobny config produkcyjny** dla tej strony:
   ```bash
   cat > map_demo/js/config.hel.prod.js << 'EOF'
   window.CONFIG = {
     MAPBOX_TOKEN: "TWÓJ_PUBLICZNY_TOKEN_MAPBOX",        // ten sam co w prod
     GEOJSON_URL: "./assets/geo/hel.geojson"             // ścieżka do nowych danych
   };
   EOF
   ```
3. **W `map_demo/mapa_hel.html` zaktualizuj ścieżkę do configu:**
   ```html
   <!-- było: <script src="./js/config.prod.js"></script> -->
   <script src="./js/config.hel.prod.js"></script>
   ```
   
   Opcjonalnie możesz nadpisać startowy widok dodając skrypt:
   ```html
   <script>
     window.UI = Object.assign({}, window.UI, {
       START_CENTER: [18.80, 54.60], START_ZOOM: 11
     });
   </script>
   ```
4. **Prześlij pliki na serwer:**
   ```bash
   gsutil cp map_demo/mapa_hel.html gs://maps-mapmaker-production-293411-demo/map_demo/mapa_hel.html
   gsutil cp map_demo/js/config.hel.prod.js gs://maps-mapmaker-production-293411-demo/map_demo/js/config.hel.prod.js
   gsutil cp map_demo/assets/geo/hel.geojson gs://maps-mapmaker-production-293411-demo/map_demo/assets/geo/hel.geojson

   gsutil setmeta -h "Content-Type:text/html" gs://maps-mapmaker-production-293411-demo/map_demo/mapa_hel.html
   gsutil setmeta -h "Content-Type:text/javascript" gs://maps-mapmaker-production-293411-demo/map_demo/js/config.hel.prod.js
   ```
5. **Nowy publiczny URL strony:**
   ```
   https://storage.googleapis.com/maps-mapmaker-production-293411-demo/map_demo/mapa_hel.html
   ```
6. **W Elementorze dodaj nowy iFrame** z tym adresem (dodaj `?v=20251001` dla uniknięcia problemów z cache).

**Uwaga o bezpieczeństwie tokena:** token w `config.hel.prod.js` to ten sam publiczny token Mapbox co w `config.prod.js`. Upewnij się, że w Mapbox **Allowed URLs** masz dodany Twój bucket GCS (i ewentualnie domenę WordPress).

## � Struktura kodu

Poniżej przedstawiono strukturę projektu i omówienie najważniejszych plików, co pomaga w orientacji w kodzie i ułatwia wprowadzanie zmian.

### Główne pliki i katalogi

```
map_demo/
├── mapa.html              # Główny plik HTML aplikacji
├── assets/                # Zasoby statyczne
│   ├── css/              
│   │   └── styles.css     # Style CSS aplikacji
│   └── geo/
│       └── converted_map.geojson  # Dane geograficzne tras
└── js/
    ├── app.js             # Główna logika aplikacji
    ├── config.example.js  # Przykładowy plik konfiguracyjny
    ├── config.local.js    # Konfiguracja lokalna (niewersjonowana)
    ├── config.prod.js     # Konfiguracja produkcyjna
    ├── config.ui.js       # Konfiguracja UI (kolory, widok itp.)
    └── lib/
        └── map-helpers.js # Funkcje pomocnicze do pracy z mapą
```

### Kluczowe pliki i ich funkcje

#### `mapa.html`
- Struktura HTML aplikacji
- Definicja interfejsu użytkownika
- Ładowanie skryptów JS i arkuszy CSS

#### `js/app.js`
- Inicjalizacja aplikacji i mapy
- **System filtrów facet**: Zwijane filtry z multi-select
- **Zarządzanie stanem**: localStorage dla filtrów i ulubionych
- Obsługa interakcji użytkownika
- Animacja tras i obsługa kontrolek
- Główna logika biznesowa

#### `js/config.*.js` (pliki konfiguracyjne)
- **config.example.js**: Przykład konfiguracji z pustymi wartościami
- **config.local.js**: Lokalna konfiguracja deweloperska (token Mapbox)
- **config.prod.js**: Konfiguracja produkcyjna
- **config.ui.js**: Parametry wizualne i ustawienia widoku

#### `js/lib/map-helpers.js`
- Funkcje pomocnicze do pracy z Mapbox GL JS
- Narzędzia do manipulacji danymi geograficznymi
- Abstrakcja złożonych operacji na mapie

### Kluczowe funkcje

#### W `app.js`
- `initApp()` - Inicjalizacja aplikacji
- **`mountFacetUI()`** - Tworzenie zwijanych filtrów z licznikiem
- **`applyFacets()`** - Filtrowanie tras według dystansu, koloru, zapisanych
- **`updateFacetCount()`** - Aktualizacja licznika aktywnych filtrów
- `addGeoJsonLine()` - Dodawanie linii GeoJSON do mapy
- `animateRoute()` - Animacja poruszania się po trasie
- `initTimelineControls()` - Inicjalizacja kontrolek odtwarzania
- `initSidebar()` - Inicjalizacja panelu bocznego z listą tras
- **`toggleSaved()`** - System zapisywania ulubionych tras

#### W `map-helpers.js`
- `createPoint()` - Tworzenie punktów na mapie
- `getBearing()` - Obliczanie kąta między punktami
- `getRoutePoints()` - Ekstrakcja punktów z geometrii GeoJSON
- `addLayerIfNotExists()` - Dodawanie warstwy do mapy

## �📜 Licencja

Projekt jest dostępny na licencji [MIT](LICENSE).

## 🙏 Podziękowania

- [Mapbox](https://www.mapbox.com/) za dostarczenie API map
- [Turf.js](https://turfjs.org/) za narzędzia do analizy danych geograficznych

---



Projekt rozwijany przez zespół [MapMakeronline](https://github.com/MapMakeronline), bazujący na oryginalnej pracy [AleksandraDebiec](https://github.com/AleksandraDebiec)