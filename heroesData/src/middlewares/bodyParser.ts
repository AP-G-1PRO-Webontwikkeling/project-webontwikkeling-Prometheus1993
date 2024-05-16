import { json, urlencoded } from 'express';

const bodyParserMiddleware = (app : any) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
};

export default bodyParserMiddleware;