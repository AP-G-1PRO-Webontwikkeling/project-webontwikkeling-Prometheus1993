import express from "express";
import { getHeroes, getHeroById, updateHero } from "../databases/database";

import { filterCharacters, sortCharacters } from "../utils/helperFunctions";

// Create a new router
const router = express.Router();

// Route to display the home page
router.get("/", async (req, res) => {
  try {
    const query = (req.query.q || "").toString().toLowerCase();
    const sortField = (req.query.sortField || "name").toString();
    const sortDirection = (req.query.sortDirection || "asc").toString();
    
    let characters = await getHeroes();

    const filteredCharacters = filterCharacters(characters, query);
    const sortedCharacters = sortCharacters(filteredCharacters, sortField, sortDirection);

    res.render("index", {
      characters: sortedCharacters,
      sortField,
      sortDirection,
      q: query,
      user: req.user
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to display the character page
router.get("/character/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = (req.query.q || "").toString().toLowerCase();
    const character = await getHeroById(id);

    if (!character) {
      return res.status(404).send("Character not found");
    }

    res.render("characterPage", { character, q: query, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to display the edit form
router.get("/characters/:id/edit", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = (req.query.q || "").toString().toLowerCase();
    const character = await getHeroById(id);
    if (!character) {
      res.status(404).send("Character not found");
    } else {
      res.render("characterEditPage", { character, q: query, user: req.user });
    }
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).send("Server error");
  }
});

// Route to update the character
router.post("/update-character/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, age, role } = req.body;
    await updateHero(id, { name, description, age, role });
    res.redirect("/");
  } catch (error) {
    console.error("Error updating character:", error);
    res.status(500).send("Failed to update character");
  }
});

export default router;