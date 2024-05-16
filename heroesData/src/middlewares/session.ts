import session from 'express-session';
import passport from 'passport';


const sessionMiddleware = (app: any) => {
  app.use(session({
    secret: process.env.SESSION_SECRET || 'my-secret-key',
    resave: false,
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};

export default sessionMiddleware;