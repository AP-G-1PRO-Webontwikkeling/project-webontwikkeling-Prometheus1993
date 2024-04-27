import express from "express";
import { FetchHeroesData } from "../models/helper-functions";
import { Character } from "../interfaces/types";

const router = express.Router();

// The / route will display all the characters.
router.get("/", async (req, res) => {
  // Retrieve the query parameter and ensure it is treated as a string, even if it's undefined or empty
  const query = (req.query.q || "").toString().toLowerCase();

  // Fetch all characters
  const characters = await FetchHeroesData();

  // Filter characters based on the query, checking both the name and powers
  const filteredCharacters = characters.filter(
    (character: { name: string; powers: any[] }) =>
      character.name.toLowerCase().includes(query)
  );

  // Retrieve sorting parameters or set defaults
  const sortField = (req.query.sortField || "name").toString();
  const sortDirection = (req.query.sortDirection || "asc").toString();

  // Sort the filtered characters
  filteredCharacters.sort(
    (a: { [x: string]: any }, b: { [x: string]: any }) => {
      let fieldA = a[sortField];
      let fieldB = b[sortField];

      // Ensure case insensitivity if comparing strings
      if (typeof fieldA === "string") fieldA = fieldA.toUpperCase();
      if (typeof fieldB === "string") fieldB = fieldB.toUpperCase();

      // Sort ascending or descending
      if (sortDirection === "asc") {
        return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
      } else {
        return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
      }
    }
  );

  // Render the page with the filtered and sorted characters
  res.render("index", {
    characters: filteredCharacters,
    sortField,
    sortDirection,
    q: query,
  });
});

// The /character/:id route will display the details of a specific character.

router.get("/character/:id", async (req, res) => {
  const characters: Character[] = await FetchHeroesData();
  const character = characters.find((c) => c.id === parseInt(req.params.id));
  const query = (req.query.q || "").toString().toLowerCase();
  res.render("characterPage", { character, q: query });
});

export default router;
