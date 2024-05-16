import express from "express";
import { getPowers, getPowerById } from "../databases/database";
import { ensureAuthenticated } from "../middlewares/auth";
const router = express.Router();

router.get("/power", ensureAuthenticated, async (req, res) => {
  try {
    const query = (req.query.q || "").toString().toLowerCase();
    let powers = await getPowers();

    const filteredPowers = powers.filter((power: { type: string }) =>
      power.type.toLowerCase().includes(query)
    );

    const sortField = (req.query.sortField as string) || "strength";
    const sortDirection = (req.query.sortDirection as string) || "asc";

    filteredPowers.sort((a: any, b: any) => {
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
      q: query,
    });
  } catch (error) {
    console.error("Error in /power route:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

router.get("/power/:id", ensureAuthenticated, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
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
