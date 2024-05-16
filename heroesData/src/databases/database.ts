import { MongoClient, Db } from "mongodb";
import { Power, Character } from "../interfaces/types";
import { config } from "dotenv";

config();

// Configureer de URL met het juiste MongoDB URI schema.
const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);
let db: Db;

// Database connection function
async function connectDB(): Promise<Db> {
  if (!db) {
    try {
      await client.connect();
      db = client.db("Heroes");
      console.log("Connected to the database");
    } catch (err) {
      console.error("Failed to connect to MongoDB", err);
      throw new Error("Database connection failed");
    }
  }
  return db;
}

// Haal alle helden op uit de database.
export async function getHeroes(): Promise<Character[]> {
  const db = await connectDB();
  const collection = db.collection<Character>("heroes");
  return await collection.find({}).toArray();
}

// Haal een held op via ID.
export async function getHeroById(id: number): Promise<Character | null> {
  const db = await connectDB();
  const collection = db.collection<Character>("heroes");
  return await collection.findOne({ id: id });
}

// Update een held in de database.
export async function updateHero(
  id: number,
  updateData: Partial<Character>
): Promise<void> {
  const collection = (await connectDB()).collection<Character>("heroes");
  const updateResult = await collection.updateOne(
    { id: id },
    { $set: updateData }
  );
  if (updateResult.modifiedCount === 0) {
    console.log("No character was updated.");
  } else {
    console.log("Character updated successfully.");
  }
}

// Haal alle superkrachten op uit de database.
export async function getPowers(): Promise<Power[]> {
  const db = await connectDB();
  const collection = db.collection<Power>("powers");
  return await collection.find({}).toArray();
}

// Haal een superkracht op via ID.
export async function getPowerById(id: number): Promise<Power | null> {
  const db = await connectDB();
  const collection = db.collection<Power>("powers");
  return await collection.findOne({ id: id });
}

// Controleer de aanwezigheid van gegevens en haal data op indien niet aanwezig.
export async function checkAndFetchDataHeroes(): Promise<void> {
  const db = await connectDB();
  const collection = db.collection<Character>("heroes");
  const dataExists = await collection.findOne({});
  if (!dataExists) {
    const response = await fetch(
      "https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-Prometheus1993/main/heroesData/assets/json/characters.json"
    );
    const data: Character[] = await response.json();
    await collection.insertMany(data);
    console.log("Data fetched and saved to MongoDB");
  } else {
    console.log("Data already exists in MongoDB");
  }
}
export async function checkAndFetchDataPowers(): Promise<void> {
  const db = await connectDB();
  const collection = db.collection<Power>("powers");
  const dataExists = await collection.findOne({});
  if (!dataExists) {
    const response = await fetch(
      "https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-Prometheus1993/main/heroesData/assets/json/powers.json"
    );
    const data: Power[] = await response.json();
    await collection.insertMany(data);
    console.log("Data fetched and saved to MongoDB");
  } else {
    console.log("Data already exists in MongoDB");
  }
}