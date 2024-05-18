
// Middleware to handle errors
const errorHandlerMiddleware = (err: any, res:any ) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  };
  
  export default errorHandlerMiddleware;