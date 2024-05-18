import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser } from '../models/user';

// Router for authentication routes
const router = Router();

// JWT secret key
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

// Login route
router.get('/login', (req, res) => {
  const { error } = req.query;
  res.render('login', { message: error ? [error] : [] });
});

// Register route
router.get('/register', (req, res) => {
  const { error, success } = req.query;
  res.render('register', { message: error ? [error] : [], success: success ? [success] : [] });
});

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    await registerUser(username, password, role);
    res.redirect('/auth/register?success=Registration successful. Please login.');
  } catch (error) {
    res.redirect(`/auth/register?error=${encodeURIComponent((error as Error).message)}`);
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username);

  try {
    const user = await loginUser(username, password);
    if (!user) {
      console.log('Invalid username or password');
      return res.redirect('/auth/login?error=Invalid username or password');
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    console.log('Login successful, redirecting to /');
    res.redirect('/');
  } catch (error) {
    console.log('Login error:', error);
    res.redirect(`/auth/login?error=${encodeURIComponent((error as Error).message)}`);
  }
});

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/auth/login');
});

export default router;