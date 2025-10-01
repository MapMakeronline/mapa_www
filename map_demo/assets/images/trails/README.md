# Zdjęcia szlaków

W tym katalogu należy umieścić zdjęcia szlaków, które będą wyświetlane w bocznym panelu aplikacji.

## Nazewnictwo plików

Pliki powinny być nazwane zgodnie z nazwą szlaku, ale z następującymi zmianami:
- Wszystkie litery małe
- Spacje zamienione na myślniki (-)
- Polskie znaki zamienione na ich odpowiedniki bez znaków diakrytycznych (ą->a, ć->c, itd.)
- Usunięte znaki specjalne

Przykład:
- Szlak "Główny Szlak Sudecki" -> `glowny-szlak-sudecki.png` lub `glowny-szlak-sudecki.jpg`
- Szlak "Wokół Chełmca" -> `wokol-chelmca.png` lub `wokol-chelmca.jpg`

## Format i rozmiar

- Format: PNG lub JPG (preferowany PNG dla lepszej jakości)
- Zalecany rozmiar: 120x120 pikseli (zostaną wyświetlone jako kwadrat 60x60 pikseli)
- Maksymalny rozmiar pliku: 100 KB

## Priorytety formatów

System szuka obrazów w następującej kolejności:
1. Najpierw szuka pliku PNG (np. `szlak-czerwony.png`)
2. Jeśli nie znajdzie PNG, szuka pliku JPG (np. `szlak-czerwony.jpg`)
3. Jeśli żaden nie zostanie znaleziony, używa domyślnego obrazu

## Domyślne zdjęcie

Plik `default-trail.jpg` jest używany jako zastępczy obrazek dla szlaków, które nie mają przypisanego zdjęcia.