/**
 * Ulepszona funkcja do pobrania ścieżki do zdjęcia szlaku na podstawie jego nazwy
 * @param {string} trailName - Pełna nazwa szlaku
 * @returns {string} Ścieżka do zdjęcia szlaku lub obrazu domyślnego
 */
function getTrailImage(trailName) {
  // Domyślny obraz dla szlaków bez zdjęć
  const defaultImage = 'assets/images/trails/default-trail.jpg';
  if (!trailName) return defaultImage;
  
  // Konwertuj nazwę szlaku na małe litery dla łatwiejszego dopasowania
  const lowerName = trailName.toLowerCase();
  
  // Funkcja do zamiany polskich znaków na ich odpowiedniki ASCII
  function replacePolishChars(str) {
    const polishChars = {
      'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
      'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
    };
    return str ? str.split('').map(char => polishChars[char] || char).join('') : '';
  }
  
  // Tablica mapująca fragmenty nazw szlaków na nazwy plików zdjęć
  // Struktura:
  // - keywords: obowiązkowe słowa kluczowe do znalezienia
  // - exactMatch: tablica słów które muszą wystąpić dokładnie w takiej formie (opcjonalnie)
  // - exclude: słowa które wykluczają dopasowanie (opcjonalnie)
  // - minKeywords: minimalna liczba słów kluczowych wymagana do dopasowania (opcjonalnie)
  // - image: nazwa pliku obrazu
  const trailImageMap = [
    // Dworzec kolejowy i powiązane
    { 
      keywords: ['dworzec', 'kolejowy', 'wałbrzych', 'główny', 'barbarka'],
      exactMatch: ['barbarka'],
      exclude: ['jedlina', 'szypka', 'rusinowa'],
      minKeywords: 3,
      image: 'dworzec-kolejowy-wabrzych-gwny-barbarka.png' 
    },
    { 
      keywords: ['dworzec', 'kolejowy', 'wałbrzych', 'główny', 'jedlina', 'zdrój'],
      exactMatch: ['jedlina'],
      exclude: ['barbarka', 'szypka', 'rusinowa'],
      minKeywords: 3,
      image: 'dworzec-kolejowy-wabrzych-gwny--jedlina-zdrj.png' 
    },
    { 
      keywords: ['dworzec', 'kolejowy', 'wałbrzych', 'główny', 'przełęcz', 'szypka'],
      exactMatch: ['szypka'],
      exclude: ['barbarka', 'jedlina', 'rusinowa'],
      minKeywords: 3,
      image: 'dworzec-kolejowy-wabrzych-gwny-przecz-szypka.png' 
    },
    { 
      keywords: ['dworzec', 'kolejowy', 'wałbrzych', 'główny', 'rusinowa'],
      exactMatch: ['rusinowa'],
      exclude: ['barbarka', 'jedlina', 'szypka'],
      minKeywords: 3,
      image: 'dworzec-kolejowy-wabrzych-gwny-rusinowa.png' 
    },
    
    // Glinik i powiązane
    { 
      keywords: ['glinik', 'sobięcin', 'sobicin'],
      image: 'glinik-sobięcin.png' 
    },
    { 
      keywords: ['glinik - sobięcin', 'glinik - sobiecin'],
      image: 'glinik-sobięcin.png' 
    },
    { 
      keywords: ['glinik', 'borowa'],
      exactMatch: ['borowa'],
      exclude: ['sobięcin', 'sobicin'],
      minKeywords: 2,
      image: 'glinik-borowa.png' 
    },
    
    // Przejścia i przełęcze
    { 
      keywords: ['borowa', 'przełęcz', 'kozia'],
      exactMatch: ['borowa', 'kozia'],
      exclude: ['szypka', 'rozdroże'],
      minKeywords: 2,
      image: 'borowa-przelecz-kozia.png' 
    },
    { 
      keywords: ['przełęcz', 'szypka', 'kozia'],
      exactMatch: ['szypka', 'kozia'],
      exclude: ['borowa', 'rozdroże'],
      minKeywords: 2,
      image: 'przecz-szypka-przecz-kozia.png' 
    },
    { 
      keywords: ['rozdroże', 'pod', 'borow', 'szypka'],
      exactMatch: ['rozdroże', 'szypka'],
      minKeywords: 3,
      image: 'rozdroe-pod-borow-przecz-szypka.png' 
    },
    
    // Międzynarodowe szlaki
    { 
      keywords: ['international', 'bergwander', 'eisenach', 'budapest'],
      minKeywords: 2,
      image: 'internationaler-bergwanderweg-eisenachbudapest-polen-west.png' 
    },
    { 
      keywords: ['european', 'long', 'distance', 'e3', 'poland'],
      minKeywords: 2,
      image: 'european-long-distance-path-e3-part-poland-west.png' 
    },
    { 
      keywords: ['międzynarodowy', 'górski', 'szlak', 'przyjaźni'],
      minKeywords: 3,
      image: 'european-long-distance-path-e3-part-poland-west.png' 
    },
    
    // Inne szlaki
    { 
      keywords: ['barbarka', 'pamięci', 'henia'],
      exactMatch: ['pamięci', 'henia'],
      minKeywords: 2,
      image: 'barbarka-pamieci-henia-przewodnika.png' 
    },
    { 
      keywords: ['dom', 'wycieczkowy', 'pttk'],
      minKeywords: 2,
      image: 'dom-wycieczkowy-pttk-harcwka-ptasia-kopa.png' 
    },
    { 
      keywords: ['drabina', 'wałbrzyska'],
      minKeywords: 2,
      image: 'drabina-wabrzyska.png' 
    },
    { 
      keywords: ['jałowiec', 'platforma', 'widokowa'],
      minKeywords: 2,
      image: 'jaowiec-platforma-widokowa-pod-duyn.png' 
    },
    { 
      keywords: ['kuźnice', 'świdnickie', 'chemiec'],
      minKeywords: 2,
      image: 'kunice-widnickie-chemiec.png' 
    },
    { 
      keywords: ['podzamcze', 'cis', 'bolko'],
      exactMatch: ['podzamcze'],
      exclude: ['stare', 'bogaczowice'],
      minKeywords: 2,
      image: 'podzamcze-cis-bolko.png' 
    },
    { 
      keywords: ['stare', 'bogaczowice', 'cis'],
      exactMatch: ['stare', 'bogaczowice'],
      exclude: ['podzamcze'],
      minKeywords: 2,
      image: 'stare-bogaczowice-cis-bolko.png' 
    },
    { 
      keywords: ['siodełko', 'pod', 'starym', 'książem'],
      minKeywords: 3,
      image: 'siodeko-pod-starym-ksiem-wwz-ksi.png' 
    },
    
    // Szczawno-Zdrój i okolice
    { 
      keywords: ['szczawno', 'zdrój', 'zamek', 'cisy'],
      exactMatch: ['szczawno', 'cisy'],
      exclude: ['książ'],
      minKeywords: 3,
      image: 'szczawno-zdrój-zamek-cisy.png' 
    },
    { 
      keywords: ['szczawno', 'zdrój', 'zamek', 'książ'],
      exactMatch: ['szczawno', 'książ'],
      exclude: ['cisy'],
      minKeywords: 3,
      image: 'szczawno-zdrój-zamek-książ.png' 
    },
    
    // Szklarska Poręba
    { 
      keywords: ['szklarska', 'poręba', 'pasterka'],
      exactMatch: ['pasterka'],
      exclude: ['wałbrzych'],
      minKeywords: 2,
      image: 'szklarska-poręba-pasterka.png' 
    },
    { 
      keywords: ['szklarska', 'poręba', 'wałbrzych'],
      exactMatch: ['szklarska', 'wałbrzych'],
      exclude: ['pasterka'],
      minKeywords: 2,
      image: 'szklarska-poręba---wałbrzych.png' 
    },
    
    // Szlaki jubileuszowe i pamięci
    { 
      keywords: ['szlak', '50', 'lecia', 'boguszowa', 'gorc'],
      exactMatch: ['50', 'boguszowa'],
      minKeywords: 3,
      image: 'szlak-50-lecia-boguszowa-gorc.png' 
    },
    { 
      keywords: ['szlak', 'pamięci', 'wędrowców'],
      exactMatch: ['pamięci', 'wędrowców'],
      minKeywords: 2,
      image: 'szlak_pamięci_wędrowców.png' 
    },
    { 
      keywords: ['szlak', 'weteranów', 'turystyki'],
      exactMatch: ['weteranów'],
      minKeywords: 2,
      image: 'szlak-weteranów-turystyki.png' 
    },
    
    // Szlaki zamkowe i tematyczne
    { 
      keywords: ['szlak', 'zamków', 'piastowskich'],
      exactMatch: ['zamków', 'piastowskich'],
      minKeywords: 2,
      image: 'szlak-zamków-piastowskich.png' 
    },
    
    // Ścieżki dydaktyczne i spacerowe
    { 
      keywords: ['ścieżka', 'dydaktyczna', 'park', 'rusinowa', 'czerwona'],
      exactMatch: ['ścieżka', 'rusinowa', 'czerwona'],
      exclude: ['niebieska'],
      minKeywords: 3,
      image: 'ścieżka-dydaktyczna-park-rusinowa---czerwona.png' 
    },
    { 
      keywords: ['ścieżka', 'dydaktyczna', 'park', 'rusinowa', 'niebieska'],
      exactMatch: ['ścieżka', 'rusinowa', 'niebieska'],
      exclude: ['czerwona'],
      minKeywords: 3,
      image: 'ścieżka-dydaktyczna-park-rusinowa---niebieska.png' 
    },
    { 
      keywords: ['ścieżka', 'hochbergów'],
      exactMatch: ['hochbergów', 'ścieżka'],
      minKeywords: 2,
      image: 'ścieżka-hochbergów.png' 
    },
    { 
      keywords: ['ścieżka', 'spacerowa', 'niedźwiadki', 'czerwona'],
      exactMatch: ['niedźwiadki', 'czerwona'],
      exclude: ['niebieska', 'zielona'],
      minKeywords: 3,
      image: 'ścieżka-spacerowa-niedźwiadki---czerwona.png' 
    },
    { 
      keywords: ['ścieżka', 'spacerowa', 'niedźwiadki', 'niebieska'],
      exactMatch: ['niedźwiadki', 'niebieska'],
      exclude: ['czerwona', 'zielona'],
      minKeywords: 3,
      image: 'ścieżka-spacerowa-niedźwiadki---niebieska (2).png' 
    },
    { 
      keywords: ['ścieżka', 'spacerowa', 'niedźwiadki', 'zielona'],
      exactMatch: ['niedźwiadki', 'zielona'],
      exclude: ['czerwona', 'niebieska'],
      minKeywords: 3,
      image: 'ścieżka-spacerowa-niedźwiadki---zielona.png' 
    },
    { 
      keywords: ['ścieżka', 'spacerowa', 'ptasia', 'kopa', 'czarna'],
      exactMatch: ['ptasia', 'kopa', 'czarna'],
      exclude: ['czerwona', 'zielona'],
      minKeywords: 3,
      image: 'ścieżka-spacerowa-ptasia-kopa---czarna.png' 
    },
    { 
      keywords: ['ścieżka', 'spacerowa', 'ptasia', 'kopa', 'czerwona'],
      exactMatch: ['ptasia', 'kopa', 'czerwona'],
      exclude: ['czarna', 'zielona'],
      minKeywords: 3,
      image: 'ścieżka-spacerowa-ptasia-kopa---czerwona.png' 
    },
    { 
      keywords: ['ścieżka', 'spacerowa', 'ptasia', 'kopa', 'zielona'],
      exactMatch: ['ptasia', 'kopa', 'zielona'],
      exclude: ['czarna', 'czerwona'],
      minKeywords: 3,
      image: 'ścieżka-spacerowa-ptasia-kopa---zielona.png' 
    },
    { 
      keywords: ['świebodzice', 'pkp', 'zamek', 'książ'],
      exactMatch: ['świebodzice', 'książ'],
      minKeywords: 3,
      image: 'świebodzice-pkp---zamek-książ.png' 
    },
    
    // Trasy miejskie i wałbrzyskie
    { 
      keywords: ['trasa', 'turystyczna', 'szlakiem', 'starego', 'grodu'],
      exactMatch: ['starego', 'grodu'],
      minKeywords: 3,
      image: 'trasa-turystyczna-szlakiem-starego-grodu.png' 
    },
    { 
      keywords: ['wałbrzych', 'centrum', 'przełęcz', 'szypka'],
      exactMatch: ['wałbrzych', 'centrum', 'szypka'],
      exclude: ['szczawienko'],
      minKeywords: 3,
      image: 'wałbrzych-centrum---przełęcz-szypka.png' 
    },
    { 
      keywords: ['wałbrzych', 'centrum', 'wałbrzych', 'szczawienko'],
      exactMatch: ['wałbrzych', 'szczawienko'],
      exclude: ['przełęcz', 'szypka'],
      minKeywords: 3,
      image: 'wałbrzych-centrum---wałbrzych-szczawienko.png' 
    },
    
    // Trasy zamkowe i okoliczne
    { 
      keywords: ['witoszów', 'zamek', 'książ'],
      exactMatch: ['witoszów', 'książ'],
      minKeywords: 2,
      image: 'witoszów---zamek-książ.png' 
    },
    { 
      keywords: ['zamek', 'książ', 'bystrzyca', 'górna'],
      exactMatch: ['książ', 'bystrzyca'],
      minKeywords: 3,
      image: 'zamek-książ---bystrzyca-górna.png' 
    },
    { 
      keywords: ['zamek', 'stary', 'książ', 'zamek', 'cisy'],
      exactMatch: ['stary', 'książ', 'cisy'],
      minKeywords: 3,
      image: 'zamek-stary-książ---zamek-cisy.png' 
    }
  ];

  // Próbujemy dopasować szlak do jednego z zdefiniowanych - zapisujemy najlepsze dopasowanie
  let bestMatch = null;
  let bestMatchScore = 0;
  const normalizedName = replacePolishChars(lowerName);
  
  console.log(`Szukam dopasowania dla szlaku: "${trailName}" (znormalizowane: "${normalizedName}")`);
  
  for (const entry of trailImageMap) {
    console.log(`Sprawdzam dopasowanie dla obrazu: ${entry.image}`);
    
    // Sprawdzamy, czy słowa wykluczające nie występują w nazwie szlaku
    if (entry.exclude && entry.exclude.some(word => {
      const normalizedExcludeWord = replacePolishChars(word.toLowerCase());
      const isExcluded = normalizedName.includes(normalizedExcludeWord);
      if (isExcluded) {
        console.log(`  Wykluczone - znaleziono słowo "${word}" w nazwie szlaku`);
      }
      return isExcluded;
    })) {
      continue; // Pomiń tę pozycję, jeśli zawiera słowa wykluczające
    }
    
    // Sprawdzamy słowa wymagające dokładnego dopasowania
    if (entry.exactMatch) {
      const missingExactMatches = entry.exactMatch.filter(phrase => {
        const normalizedPhrase = replacePolishChars(phrase.toLowerCase());
        return !normalizedName.includes(normalizedPhrase);
      });
      
      if (missingExactMatches.length > 0) {
        console.log(`  Brakuje wymaganych słów: ${missingExactMatches.join(', ')}`);
        continue; // Pomiń tę pozycję, jeśli brakuje dokładnych dopasowań
      }
    }
    
    // Sprawdzamy, czy słowa kluczowe występują w nazwie szlaku
    const matchedKeywords = [];
    const unmatchedKeywords = [];
    
    entry.keywords.forEach(keyword => {
      const normalizedKeyword = replacePolishChars(keyword.toLowerCase());
      if (normalizedName.includes(normalizedKeyword)) {
        matchedKeywords.push(keyword);
      } else {
        unmatchedKeywords.push(keyword);
      }
    });
    
    const matchCount = matchedKeywords.length;
    
    // Obliczamy wynik dopasowania (stosunek dopasowanych słów do wszystkich)
    const minRequired = entry.minKeywords || Math.ceil(entry.keywords.length / 2);
    console.log(`  Znaleziono ${matchCount}/${entry.keywords.length} słów kluczowych (minimum: ${minRequired})`);
    console.log(`  Dopasowane: ${matchedKeywords.join(', ')}`);
    console.log(`  Niedopasowane: ${unmatchedKeywords.join(', ')}`);
    
    if (matchCount >= minRequired) {
      // Obliczamy wynik dopasowania w skali 0-100
      const score = (matchCount / entry.keywords.length) * 100;
      console.log(`  Wynik dopasowania: ${score.toFixed(1)}% (aktualny najlepszy: ${bestMatchScore.toFixed(1)}%)`);
      
      // Jeśli to najlepsze dopasowanie do tej pory, zapisujemy je
      if (score > bestMatchScore) {
        bestMatch = entry;
        bestMatchScore = score;
        console.log(`  To jest nowe najlepsze dopasowanie!`);
      }
    } else {
      console.log(`  Za mało dopasowanych słów kluczowych, pomijam`);
    }
  }
  
  // Jeśli znaleziono dopasowanie, użyj go
  if (bestMatch) {
    console.log(`WYNIK: Dopasowano szlak "${trailName}" do obrazu: ${bestMatch.image} (wynik: ${bestMatchScore.toFixed(1)}%)`);
    return `assets/images/trails/${bestMatch.image}`;
  }
  
  console.log(`WYNIK: Nie znaleziono żadnego dopasowania dla "${trailName}", używam domyślnej nazwy pliku`);

  // Fallback: jeśli nie znaleziono dopasowania, używamy nazwy szlaku aby stworzyć nazwę pliku
  const slug = replacePolishChars(lowerName)
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-_]/g, '');
  
  console.log(`Brak bezpośredniego dopasowania dla "${trailName}", próbuję użyć pliku: ${slug}.png`);
  
  // Zwracamy ścieżkę do zdjęcia lub obrazu domyślnego, jeśli nie istnieje
  return `assets/images/trails/${slug}.png`;
}