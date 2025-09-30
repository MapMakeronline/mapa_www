# Interaktywna Mapa WWW

Interaktywna aplikacja webowa do wizualizacji i animacji szlaków pieszych w Wałbrzychu. Projekt umożliwia przeglądanie tras, animowane śledzenie szlaków z dynamiczną kamerą oraz interaktywne zarządzanie odtwarzaniem.

![Interaktywna Mapa Szlaków Pieszych](https://via.placeholder.com/800x400?text=Interaktywna+Mapa+Szlak%C3%B3w+Pieszych)

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


## 📜 Licencja

Projekt jest dostępny na licencji [MIT](LICENSE).

## 🙏 Podziękowania

- [Mapbox](https://www.mapbox.com/) za dostarczenie API map
- [Turf.js](https://turfjs.org/) za narzędzia do analizy danych geograficznych

---

Projekt rozwijany przez zespół [MapMakeronline](https://github.com/MapMakeronline), bazujący na oryginalnej pracy [AleksandraDebiec](https://github.com/AleksandraDebiec)