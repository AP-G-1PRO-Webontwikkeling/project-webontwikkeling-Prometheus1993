import { Router } from 'express';
import passport from 'passport';
import { registerUser } from '../models/user'; // Adjust the path

const router = Router();

router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

router.get('/register', (req, res) => {
  res.render('register', { message: req.flash('error'), success: req.flash('success') });
});

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    await registerUser(username, password, role);
    req.flash('success', 'Registration successful. Please login.');
    res.redirect('/auth/register');
  } catch (error) {
    req.flash('error', (error as Error).message);
    res.redirect('/auth/register');
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

router.post('/logout', (req, res) => {
    res.redirect('/auth/login');
});

export default router;