import express from "express";
import { FetchHeroesData, FetchPowersData } from "../models/helper-functions";
import { Character, Power } from "../interfaces/types";
import { cp } from "fs";

const router = express.Router();

// The /power route will display all the powers of the characters.

router.get("/power", async (req, res) => {
  const characters: Character[] = await FetchHeroesData();
  const powers: Power[] = characters
    .map((character) => character.powers)
    .flat();
  const query = (req.query.q || "").toString().toLowerCase();

  const filteredPowers = powers.filter(
    (power: { specialMove: string;}) =>
      power.specialMove.toLowerCase().includes(query)
  );

  // Sorting logic
  const sortField = (req.query.sortField as string) || "strength";
  const sortDirection = (req.query.sortDirection as string) || "asc";

  filteredPowers.sort((a, b) => {
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
  res.render("powers", {
    powers: filteredPowers,
    sortField,
    sortDirection,
    characters,
    q: query,
  });
});

// The /power/:powerId route will display the details of a specific power.

router.get("/power/:powerId", async (req, res) => {
  const characters: Character[] = await FetchHeroesData();
  const powers: Power[] = characters
    .map((character) => character.powers)
    .flat();
    const query = (req.query.q || "").toString().toLowerCase();
  const power = powers.find((power) => power.id === Number(req.params.powerId));
  if (!power) {
    res.status(404).send("Power not found");
  } else {
    res.render("powerPage", { power, characters, q: query});
  }
});

export default router;
