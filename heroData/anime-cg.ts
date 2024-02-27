import readline from "readline-sync";
import { Character, Power } from "./interface";

const loadData = async <T>(url: string): Promise<T[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: T[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Fout bij het laden van data van ${url}:`, error);
    process.exit(1);
  }
};

// De URL's naar je JSON data
const charactersUrl =
  "https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-Prometheus1993/main/heroData/assets/json/characters.json";
const powersUrl =
  "https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-Prometheus1993/main/heroData/assets/json/powers.json";

// Asynchrone functie om de data te laden
const loadAndProcessData = async () => {
  const characters = await loadData<Character>(charactersUrl);
  const powers = await loadData<Power>(powersUrl);

  const viewAllData = () => {
    console.log("Alle karakters:\n");
    characters.forEach((character) => {
      console.log(`${character.id}: ${character.name}`);
    });
  };

  const filterById = () => {
    const id: number = readline.questionInt("Voer een ID in: ");
    const character = characters.find((character) => character.id === id);

    if (character) {
      console.log(`- naam: ${character.name} (${character.id})`);
      console.log(` - Beschrijving: ${character.description}`);
      console.log(` - leeftijd: ${character.age}`);
      console.log(` - IsActief: ${character.isActive}`);
      console.log(` - Geboortedatum: ${character.birthDate}`);
      console.log(` - Foto: ${character.imageUrl}`);
      console.log(` - Rol: ${character.role}`);
      console.log(` - Hobby: ${character.hobbies.join(', ')}`);
      console.log(` - Krachten: ${character.powers.type}`);
      console.log(`  - Kracht: ${character.powers.strength}`);
      console.log(`  - Humanoid: ${character.powers.isHuman}`);
      console.log(`  - Special Move: ${character.powers.specialMove}`);
      console.log(`  - Foto: ${character.powers.imageUrl}`);
    } else {
      console.log("Geen karakter gevonden met dat ID!!");
    }
  };

  let stop: boolean = false;
  // Keuzemenu
  while (!stop) {
    console.log("\nWelkom bij de Anime-Cardgame Data Viewer!!\n");
    console.log("1. Bekijk alle data\n2. Filter op ID\n3. Exit\n");

    let choice: number = readline.questionInt("Maak je keuze: ");
    switch (choice) {
      case 1:
        viewAllData();
        break;
      case 2:
        filterById();
        break;
      case 3:
        stop = true;
        break;
      default:
        console.log("Ongeldige keuze, probeer het opnieuw.");
        break;
    }
  }
  console.log("\nTot ziens!");
};
loadAndProcessData();
