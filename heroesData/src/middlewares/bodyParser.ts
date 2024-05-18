import { json, urlencoded } from 'express';


// Middleware to parse incoming request bodies
const bodyParserMiddleware = (app : any) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
};

export default bodyParserMiddleware;