import e from "express";
import { MongoClient } from "mongodb";

// Configureer de URL met het juiste MongoDB URI schema.
const uri =
  "mongodb+srv://jesus:jesus@clusterap.zyr6ufp.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAP";
const client = new MongoClient(uri);

// Creëer een variabele om de database te beheren na verbinding.
let dbInstance: any;

// Eenmalige verbinding setup functie.
async function connectDB() {
  if (dbInstance) {
    return dbInstance;
  }
  try {
    await client.connect();
    dbInstance = client.db("Heroes");
    console.log("Connected to the database");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    // Optioneel: gooi een error om aan te geven dat de verbinding mislukt is.
    throw new Error("Database connection failed");
  }
  return dbInstance;
}

// Haal alle helden op uit de database.
export async function getHeroes() {
  const db = await connectDB();
  const collection = db.collection("heroes");
  return await collection.find({}).toArray();
}

// Haal een held op via ID.
export async function getHeroById(id: number) {
  const db = await connectDB();
  const collection = db.collection("heroes");
  return await collection.findOne({ id: id });
}

// Haal alle superkrachten op uit de database.
export async function getPowers() {
  const db = await connectDB();
  const collection = db.collection("powers");
  return await collection.find({}).toArray();
}

// Haal een superkracht op via ID.
export async function getPowerById(id: number) {
  const db = await connectDB();
  const collection = db.collection("powers");
  return await collection;
}

// Controleer de aanwezigheid van gegevens en haal data op indien niet aanwezig.
export async function checkAndFetchDataHeroes() {
  const db = await connectDB();
  const collection = db.collection("heroes");
  const dataExists = await collection.findOne({});
  if (!dataExists) {
    const response = await fetch(
      "https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-Prometheus1993/main/heroesData/assets/json/characters.json"
    );
    const data = await response.json();
    await collection.insertMany(data);
    console.log("Data fetched and saved to MongoDB");
  } else {
    console.log("Data already exists in MongoDB");
  }
}
export async function checkAndFetchDataPowers() {
  const db = await connectDB();
  const collection = db.collection("powers");
  const dataExists = await collection.findOne({});
  if (!dataExists) {
    const response = await fetch(
      "https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-Prometheus1993/main/heroesData/assets/json/powers.json"
    );
    const data = await response.json();
    await collection.insertMany(data);
    console.log("Data fetched and saved to MongoDB");
  } else {
    console.log("Data already exists in MongoDB");
  }
}
