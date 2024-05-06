import express from "express";
import path from "path";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import powersRouter from "./routes/power";
import { checkAndFetchDataHeroes,checkAndFetchDataPowers } from "./database";

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/", indexRouter);
app.use("/", powersRouter);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  try {
    await checkAndFetchDataHeroes()
    await checkAndFetchDataPowers();
  } catch (error) {
    console.error("Failed to fetch or insert data:", error);
  }
});
