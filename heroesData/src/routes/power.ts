import express from "express";
import { getPowers, getPowerById } from "../databases/database";
import { filterPowers, sortPowers } from "../utils/helperFunctions";

// Create a new router
const router = express.Router();

// Route to display the powers page
router.get("/power", async (req, res) => {
  try {
    const query = (req.query.q || "").toString().toLowerCase();
    const sortField = (req.query.sortField as string) || "strength";
    const sortDirection = (req.query.sortDirection as string) || "asc";

    let powers = await getPowers();

    const filteredPowers = filterPowers(powers, query);
    const sortedPowers = sortPowers(filteredPowers, sortField, sortDirection);

    res.render("powers", {
      powers: sortedPowers,
      sortField,
      sortDirection,
      q: query,
    });
  } catch (error) {
    console.error("Error in /power route:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

// Route to display the power page
router.get("/power/:id", async (req, res) => {
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
    console.error("Error in /power/:id route:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

export default router;