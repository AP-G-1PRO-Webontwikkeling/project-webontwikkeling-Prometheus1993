import { Character,Power } from "../interfaces/types";


// Helper function to filter characters based on a query
  export const filterCharacters = (characters: Character[], query: string) => {
    return characters.filter((character) =>
      character.name.toLowerCase().includes(query)
    );
  };
  
  // Helper function to sort characters based on a field and direction
  export const sortCharacters = (
    characters: Character[],
    sortField: string,
    sortDirection: string
  ) => {
    return characters.sort((a: any, b: any) => {
      let fieldA = a[sortField];
      let fieldB = b[sortField];
  
      if (typeof fieldA === "string") fieldA = fieldA.toUpperCase();
      if (typeof fieldB === "string") fieldB = fieldB.toUpperCase();
  
      if (sortDirection === "asc") {
        if (fieldA < fieldB) {
          return -1;
        } else if (fieldA > fieldB) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (fieldA > fieldB) {
          return -1;
        } else if (fieldA < fieldB) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  };

  // Helper function to filter powers based on a query
  export const filterPowers = (powers: Power[], query: string) => {
    return powers.filter((power) =>
      power.type.toLowerCase().includes(query)
    );
  };

  // Helper function to sort powers based on a field and direction
  export const sortPowers = (
    powers: Power[],
    sortField: string,
    sortDirection: string
  ) => {
    return powers.sort((a: any, b: any) => {
      let fieldA = a[sortField];
      let fieldB = b[sortField];
  
      if (typeof fieldA === "string") fieldA = fieldA.toUpperCase();
      if (typeof fieldB === "string") fieldB = fieldB.toUpperCase();
  
      if (sortDirection === "asc") {
        if (fieldA < fieldB) {
          return -1;
        } else if (fieldA > fieldB) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (fieldA > fieldB) {
          return -1;
        } else if (fieldA < fieldB) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  };