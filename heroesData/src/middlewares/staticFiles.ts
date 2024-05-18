import express from 'express';
import path from 'path';


// Middleware to serve static files
const staticFilesMiddleware = (app:any ) => {
  app.use(express.static(path.join(__dirname, '../../public')));
  app.use('/assets', express.static(path.join(__dirname, '../../public/assets')));
};

export default staticFilesMiddleware;