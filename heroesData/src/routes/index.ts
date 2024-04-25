import express from "express";
import { FetchHeroesData } from "../models/helper-functions";
import { Character } from "../interfaces/types";

const router = express.Router();

router.get("/", async (req, res) => {
  const query: string = (req.query.q as string) || "";
  const characters: Character[] = await FetchHeroesData();

  const filteredCharacters = characters.filter(
    (character) =>
      character.name.toLowerCase().includes(query.toLowerCase()) ||
      character.powers.some((power) =>
        power.name.toLowerCase().includes(query.toLowerCase())
      )
  );

  // Sorting logic
  const sortField = (req.query.sortField as string) || "name"; 
  const sortDirection = (req.query.sortDirection as string) || "asc";

  filteredCharacters.sort((a, b) => {
    let fieldA = a[sortField];
    let fieldB = b[sortField];
    if (typeof fieldA === "string" && typeof fieldB === "string") {
      fieldA = fieldA.toUpperCase();
      fieldB = fieldB.toUpperCase();
    }
    if (sortDirection === "asc") {
      return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
    } else {
      return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
    }
  });
  res.render("index", {
    characters: filteredCharacters,
    sortField,
    sortDirection,
    q: query,
  });
});

router.get("/character/:id", async (req, res) => {
  const characters: Character[] = await FetchHeroesData();
  const character = characters.find((c) => c.id === parseInt(req.params.id));
  res.render("characterPage", { character });
});

export default router;
