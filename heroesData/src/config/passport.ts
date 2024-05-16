import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { loginUser, userCollection } from '../models/user';
import { ObjectId } from 'mongodb';


passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await loginUser(username, password);
    return done(null, user);
  } catch (error) {
    return done(null, false, { message: (error as Error).message });
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userCollection.findOne({ _id: new ObjectId(id) });
    if (user) {
      done(null, user);
    } else {
      done(new Error('User not found'));
    }
  } catch (error) {
    done(error as Error);
  }
});