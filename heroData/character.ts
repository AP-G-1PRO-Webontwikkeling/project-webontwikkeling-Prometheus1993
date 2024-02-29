import readline from "readline-sync";
import { Character } from "./interface";

// Function to view all character data
const viewAllData = (characters: Character[]) => {
    console.log("Alle karakters:\n");
    for (const character of characters) {
        console.log(`${character.id}: ${character.name}`);
    }
};

// Function to filter character data by ID
const filterById = (characters: Character[]) => {
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
        console.log(` - Hobby: ${character.hobbies.join(", ")}`);
        console.log(` - Krachten: ${character.powers.type}`);
        console.log(`  - Kracht: ${character.powers.strength}`);
        console.log(`  - Humanoid: ${character.powers.isHuman}`);
        console.log(`  - Special Move: ${character.powers.specialMove}`);
        console.log(`  - Foto: ${character.powers.imageUrl}`);
    } else {
        console.log("Geen karakter gevonden met dat ID!!");
    }
};

export { viewAllData, filterById };
