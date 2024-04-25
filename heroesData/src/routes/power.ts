import express from "express";
import { FetchHeroesData } from "../models/helper-functions";
import { Character, Power } from "../interfaces/types";

const router = express.Router();

router.get("/power", async (req, res) => {
  const characters: Character[] = await FetchHeroesData();
  const powers: Power[] = characters
    .map((character) => character.powers)
    .flat();

  // Sorting logic
  const sortField = (req.query.sortField as string) || "strength";
  const sortDirection = (req.query.sortDirection as string) || "asc";

  powers.sort((a, b) => {
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
  res.render("powers", { powers, sortField, sortDirection, characters });
});

router.get("/power/:powerId", async (req, res) => {
  const characters = await FetchHeroesData();
  const powerId = parseInt(req.params.powerId);
  let foundPower = null;

  for (const character of characters) {
    const power = character.powers.find((p: { id: number; }) => p.id === powerId);
    if (power) {
      foundPower = power;
      break;
    }
  }

  if (!foundPower) {
    return res.status(404).send("Power not found");
  }

  res.render("powerPage", { power: foundPower });
});


export default router;
