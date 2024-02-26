import readline from "readline-sync";
import { readFileSync } from "fs";
import { join } from "path";
import { Character, Power } from "./interface";

// Functies om de JSON data te laden
const loadData = <T>(fileName: string): T[] => {
  try {
    const filePath = join(__dirname, fileName);
    const rawData = readFileSync(filePath, "utf8");
    return JSON.parse(rawData) as T[];
  } catch (error) {
    console.error(`Fout bij het laden van ${fileName}:`, error);
    process.exit(1);
  }
};

// Laad de data
const characters = loadData<Character>(
  "../heroData/assets/json/characters.json"
);
const powers = loadData<Power>("../heroData/assets/json/powers.json");

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
    console.log(` - Hobby: {character.hobbies.join(', ')}`);
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
