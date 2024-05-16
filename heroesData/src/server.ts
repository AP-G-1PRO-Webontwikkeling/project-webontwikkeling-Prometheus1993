import express from "express";
import path from "path";
import dotenv from "dotenv";
import passport from 'passport';
import connectFlash from 'connect-flash';
import indexRouter from "./routes/index";
import powersRouter from "./routes/power";
import authRouter from "./routes/auth";
import {
  checkAndFetchDataHeroes,
  checkAndFetchDataPowers,
} from "./databases/database";
import bodyParserMiddleware from "./middlewares/bodyParser";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import sessionMiddleware from "./middlewares/session";
import staticFilesMiddleware from "./middlewares/staticFiles";
import { initializeDefaultUsers } from './models/user';

dotenv.config();

const app = express();

// Passport config
require('./config/passport');

// Set up the view engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '../public/views'));

// Use middleware
bodyParserMiddleware(app);
staticFilesMiddleware(app);
sessionMiddleware(app);
app.use(passport.initialize());
app.use(passport.session());


app.use(connectFlash());

// Routes
app.use("/", indexRouter);
app.use("/", powersRouter);
app.use("/auth", authRouter);

// Error Handling Middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  try {
    await checkAndFetchDataHeroes();
    await checkAndFetchDataPowers();
    await initializeDefaultUsers();
  } catch (error) {
    console.error("Failed to fetch or insert data:", error);
  }
});