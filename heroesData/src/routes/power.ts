import express from "express";
import { getPowers, getPowerById } from "../database";
import { Character, Power } from "../interfaces/types";

const router = express.Router();

// The /power route will display all the powers of the characters.

router.get("/power", async (req, res) => {
  try {
    const query = (req.query.q || "").toString().toLowerCase();
    let powers= await getPowers();

    const filteredPowers = powers.filter((power: { type: string }) =>
      power.type.toLowerCase().includes(query)
    );

    const sortField = (req.query.sortField as string) || "strength";
    const sortDirection = (req.query.sortDirection as string) || "asc";

    filteredPowers.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
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

    // Render the template with filtered and sorted powers
    res.render("powers", {
      powers: filteredPowers,
      sortField,
      sortDirection,
      q: query,
    });
  } catch (error) {
    console.error("Error in /power route:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

// The /power/:powerId route will display the details of a specific power.

router.get("/power/:powerId", async (req, res) => {
  try {
    const id = parseInt(req.params.powerId);
    const query = (req.query.q || "").toString().toLowerCase();
    const power = await getPowerById(id);
    if (!power) {
      res.status(404).send("Power not found");
      return;
    }
    res.render("powerPage", { power, q: query });
  } catch (error) {
    console.error("Error in /power/:powerId route:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

export default router;
