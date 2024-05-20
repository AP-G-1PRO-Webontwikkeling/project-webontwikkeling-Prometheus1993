import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import indexRouter from "./routes/index";
import powersRouter from "./routes/power";
import authRouter from "./routes/auth";
import {
  checkAndFetchDataHeroes,
  checkAndFetchDataPowers,
  closeDB
} from "./databases/database";
import bodyParserMiddleware from "./middlewares/bodyParser";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import staticFilesMiddleware from "./middlewares/staticFiles";
import { initializeDefaultUsers } from './models/user';
import { authenticateJWT } from './middlewares/authenticateJWT'; 

dotenv.config();

const app = express();

// the view engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '../public/views'));

// middleware
bodyParserMiddleware(app);
staticFilesMiddleware(app);
app.use(cookieParser());

// Routes
app.use("/auth", authRouter);
app.use("/",authenticateJWT, indexRouter);
app.use("/",authenticateJWT, powersRouter);


// Middleware to authenticate JWT
app.use(authenticateJWT);

// Error Handling Middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const server = app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  try {
    await checkAndFetchDataHeroes();
    await checkAndFetchDataPowers();
    await initializeDefaultUsers();
  } catch (error) {
    console.error("Failed to fetch or insert data:", error);
  }
});


// Close the database connection when the app is closed
const gracefulShutdown = async () => {
  console.log("\nReceived shutdown signal, closing server...");
  server.close(async () => {
    console.log("HTTP server closed");
    await closeDB();
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown); 
process.on("SIGTERM", gracefulShutdown);

export default app;
