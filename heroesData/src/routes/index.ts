import express from "express";
import { getHeroes, getHeroById } from "../database";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query = (req.query.q || "").toString().toLowerCase();
    let characters = await getHeroes();

    const filteredCharacters = characters.filter(
      (character: { name: string }) =>
        character.name.toLowerCase().includes(query)
    );

    const sortField = (req.query.sortField || "name").toString();
    const sortDirection = (req.query.sortDirection || "asc").toString();

    filteredCharacters.sort((a: any, b: any) => {
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

    res.render("index", {
      characters: filteredCharacters,
      sortField,
      sortDirection,
      q: query,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/character/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = (req.query.q || "").toString().toLowerCase();
    const character = await getHeroById(id);

    if (!character) {
      return res.status(404).send("Character not found");
    }

    res.render("characterPage", { character, q: query });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
