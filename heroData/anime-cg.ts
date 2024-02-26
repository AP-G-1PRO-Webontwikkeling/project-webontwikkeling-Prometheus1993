import readline from "readline-sync";
import { readFileSync } from "fs";
import { join } from "path";
import { Character, Power } from "./interface";

let stop: boolean = false;

const viewAllData = () => {};

const filterById = () => {
  const id = readline.questionInt("Voer een ID in: ");
};

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
