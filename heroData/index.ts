import readline from "readline-sync";
import { loadData } from './dataLoading';
import { viewAllData, filterById } from './character';
import { Character } from "./interface";

// URL for the characters data
const charactersUrl =
  "https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-Prometheus1993/main/heroData/assets/json/characters.json";

const main = async () => {
  try {
    // Load the characters data from the URL
    const characters = await loadData<Character>(charactersUrl);

    let stop: boolean = false;
    while (!stop) {
      console.log("\nWelkom bij de Anime-Cardgame Data Viewer!!\n");
      console.log("1. Bekijk alle data\n2. Filter op ID\n3. Exit\n");

      // Prompt the user for their choice
      let choice: number = readline.questionInt("Maak je keuze: ");
      switch (choice) {
        case 1:
          // View all the data
          viewAllData(characters);
          break;
        case 2:
          // Filter the data by ID
          filterById(characters);
          break;
        case 3:
          // Exit the program
          stop = true;
          break;
        default:
          console.log("Ongeldige keuze, probeer het opnieuw.");
          break;
      }
    }
    console.log("\nTot ziens!");
  } catch (error) {
    console.error("Er is een fout opgetreden:", error);
  }
};

// Call the main function to start the program
main();
