import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userCollection } from '../models/user';
import { ObjectId } from 'mongodb';


// JWT secret key
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to authenticate JWT
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, secret) as { id: string };
      const user = await userCollection.findOne({ _id: new ObjectId(decoded.id) });
      if (!user) {
        console.log("User not found");
        return res.redirect('/auth/login');
      }
      req.user = user;
      next();
    } catch (error) {
      console.log("Token verification failed:", error);
      return res.redirect('/auth/login');
    }
  } else {
    console.log("Token not found");
    return res.redirect('/auth/login');
  }
};