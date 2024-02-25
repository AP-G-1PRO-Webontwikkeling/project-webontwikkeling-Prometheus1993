# project-webontwikkeling-Prometheus1993

# Web-ontwikkeling-Project

Deze repository bevat alle opdrachten en code voor mijn project van Web-Ontwikkeling in AP '24

# Anime/Manga Card Game JSON Project

## Overzicht

Dit project bevat een reeks JSON-bestanden ontworpen om een anime/manga card game database te structureren. Het biedt gedetailleerde informatie over verschillende personages en hun unieke krachten, die kunnen worden gebruikt om een interactief kaartspel te creëren of gewoon voor informatieve doeleinden.

## Bestandsstructuur

- `characters.json`: Bevat een lijst van anime/manga personages, elk met specifieke eigenschappen zoals naam, beschrijving, leeftijd, actieve status, geboortedatum, afbeeldings-URL, rol, hobby's en krachten.
- `powers.json`: Detailleert de verschillende krachten of vaardigheden die door de personages in het spel gebruikt kunnen worden, inclusief een unieke ID, type, sterkte, en of het personage menselijk is, een alien, of een heroïsche geest.

## Eigenschappen

Elk personage in `characters.json` heeft de volgende eigenschappen:

- `id`: Een unieke identificatie voor elk personage.
- `name`: De naam van het personage.
- `description`: Een lange beschrijving van het personage.
- `age`: De leeftijd van het personage.
- `isActive`: Een boolean die aangeeft of het personage momenteel actief is in hun verhaal.
- `birthDate`: De geboortedatum van het personage.
- `imageUrl`: Een URL naar een afbeelding van het personage.
- `role`: De rol van het personage binnen hun verhaal of spel.
- `hobbies`: Een lijst van hobby's of interesses van het personage.
- `powers`: Een object met informatie over de krachten van het personage, afkomstig uit `powers.json`.

## Hoe te Gebruiken

Dit project kan worden gebruikt als een database voor het ontwikkelen van een anime/manga-thema kaartspel, of als een educatieve bron voor fans. Ontwikkelaars kunnen de JSON-bestanden integreren in hun applicaties om dynamisch personagekaarten en hun vaardigheden te genereren.