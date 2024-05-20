import { MongoClient, Db } from "mongodb";
import { Power, Character } from "../interfaces/types";
import { config } from "dotenv";

config();

// MongoDB connection string
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

// Sluit de database connectie.
export async function closeDB(): Promise<void> {
  await client.close();
  console.log("Database connection closed");
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

export async function checkAndFetchDataHeroes(): Promise<void> {
  const db = await connectDB();
  const collection = db.collection<Character>("heroes");

  // Leeg de collectie
  await collection.deleteMany({});

  // Haal nieuwe data op en sla deze op in de database
  const response = await fetch(
    "https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-Prometheus1993/main/heroesData/assets/json/characters.json"
  );
  const data: Character[] = await response.json();
  await collection.insertMany(data);
  console.log("Data fetched and saved to MongoDB");
}

export async function checkAndFetchDataPowers(): Promise<void> {
  const db = await connectDB();
  const collection = db.collection<Power>("powers");

  // Leeg de collectie
  await collection.deleteMany({});

  // Haal nieuwe data op en sla deze op in de database
  const response = await fetch(
    "https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-Prometheus1993/main/heroesData/assets/json/powers.json"
  );
  const data: Power[] = await response.json();
  await collection.insertMany(data);
  console.log("Data fetched and saved to MongoDB");
}
