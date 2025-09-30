# Interaktywna Mapa WWW

Interaktywna aplikacja webowa do wizualizacji i animacji szlaków pieszych w Wałbrzychu. Projekt umożliwia przeglądanie tras, animowane śledzenie szlaków z dynamiczną kamerą oraz interaktywne zarządzanie odtwarzaniem.

![Interaktywna Mapa Szlaków Pieszych](https://storage.googleapis.com/maps-mapmaker-production-293411-demo/map_demo/mapa.html)

## 🚀 Funkcjonalności

- Interaktywna mapa oparta na MapBox GL JS
- Animowane śledzenie szlaków z podążającą kamerą
- Lista dostępnych szlaków z możliwością wyboru
- Kontrola odtwarzania (pauza, ponowne odtwarzanie, prędkość, przewijanie)
- Automatyczne śledzenie trasy z obrotem kamery zgodnym z kierunkiem ruchu
- Responsywny design działający na urządzeniach mobilnych i desktopowych
- Możliwość pobierania danych szlaków

## 🛠️ Technologie

- HTML5, CSS3, JavaScript
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) - silnik map
- [Turf.js](https://turfjs.org/) - analiza i manipulacja danymi geojson
- GeoJSON - format przechowywania danych geograficznych

## 📋 Wymagania

- Token dostępu do API Mapbox
- Nowoczesna przeglądarka internetowa z obsługą JavaScript

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

1. Wybierz szlak z listy po prawej stronie, aby rozpocząć animację
2. Używaj panelu kontrolnego na dole ekranu do:
   - Pauzowania/wznawiania animacji
   - Ponownego odtworzenia animacji po jej zakończeniu (przycisk "Replay")
   - Zmiany prędkości odtwarzania
   - Przewijania postępu za pomocą suwaka
   - Pobierania danych szlaku
3. Przycisk "Resetuj animację" pozwala powrócić do stanu początkowego
4. Po zakończeniu animacji pasek odtwarzania pozostaje widoczny, umożliwiając ponowne odtworzenie
5. Na urządzeniach mobilnych można schować/pokazać panel boczny za pomocą przycisku menu

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

## 👨‍💻 Rozwój projektu

Projekt jest stale rozwijany. Ostatnio dodane funkcje:
- Przycisk "Replay" umożliwiający ponowne odtworzenie animacji dla wybranego szlaku
- Ujednolicony wygląd przycisków na pasku odtwarzania dla lepszej estetyki
- Naprawiona funkcjonalność przycisków pauza/wznów i innych kontrolek animacji
- Ulepszony system zarządzania stanem animacji po jej zakończeniu
- Dostosowane zachowanie paska odtwarzania, który pozostaje widoczny po zakończeniu animacji

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
3. Otwórz folder **`map_demo/`** – tam znajdują się wszystkie pliki (np. `mapa.html`, `js/`, `assets/`)

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

## 📜 Licencja

Projekt jest dostępny na licencji [MIT](LICENSE).

## 🙏 Podziękowania

- [Mapbox](https://www.mapbox.com/) za dostarczenie API map
- [Turf.js](https://turfjs.org/) za narzędzia do analizy danych geograficznych

---



Projekt rozwijany przez zespół [MapMakeronline](https://github.com/MapMakeronline), bazujący na oryginalnej pracy [AleksandraDebiec](https://github.com/AleksandraDebiec)