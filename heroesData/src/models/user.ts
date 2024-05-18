import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { User } from '../interfaces/types';

// MongoDB connection string
const client = new MongoClient(process.env.MONGODB_URI || '');

// Bcrypt salt rounds
const saltRounds: number = 10;
let userCollection: any;

// Connect to the database
async function connectToDatabase() {
  if (!userCollection) {
    await client.connect();
    userCollection = client.db('Heroes').collection<User>('users');
  }
}

export { userCollection };

// Check if a username is already registered
async function isUsernameRegistered(username: string): Promise<boolean> {
  try {
      const existingUser = await userCollection.findOne({ username });
      return !!existingUser;
  } catch (error) {
      console.error("Error checking username registration:", error);
      throw new Error("Failed to check username registration.");
  }
}

// Register a new user
export async function registerUser(username: string, password: string, role: 'ADMIN' | 'USER'): Promise<void>  {
  if (!username || !password) {
    throw new Error('Username and password must be provided');
  }
  const usernameExists = await isUsernameRegistered(username);
  if (usernameExists) {
      throw new Error("Username is already taken.");
  }
  await connectToDatabase();
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await userCollection.insertOne({
    username,
    password: hashedPassword,
    role: role || 'USER'
  });
}

// Login a user
export async function loginUser(username: string, password: string): Promise<User> {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
  await connectToDatabase();
  const user = await userCollection.findOne({ username });
  if (user && user.password) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      throw new Error('Password incorrect');
    }
  } else {
    throw new Error('User not found');
  }
}

// Initialize default users
export async function initializeDefaultUsers(): Promise<void>{
  await connectToDatabase();
  const adminUser = await userCollection.findOne({ username: 'admin' });
  const regularUser = await userCollection.findOne({ username: 'user' });

  if (!adminUser) {
    await registerUser('admin', 'admin', 'ADMIN');
    console.log('Admin user created with username: admin and password: admin');
  }

  if (!regularUser) {
    await registerUser('user', 'user', 'USER');
    console.log('Regular user created with username: user and password: user');
  }
}