// users-controller.js
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import HttpError from '../util/http-error.js';
import { validationResult } from 'express-validator';



const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  let user;

  try {
    user = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Erreur serveur.', 500));
  }

  if (user) {
    return res.status(422).json({
      message: 'Cet email est déjà utilisé.'
    });
  }

  const createdUser = new User({
    name,
    email,
    password

  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log("DÉTAIL DE L'ERREUR :", err);
    return next(new HttpError('Erreur inscription', 500));
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email: email });

  if (!user || user.password !== password) {
    return next(new HttpError('Identifiants invalides', 401));
  }

  let token = jwt.sign(
    { userId: user.id, email: user.email },
    'cleSuperSecrete!',
    { expiresIn: '1h' }
  );

  res.json({ userId: user.id, email: user.email, token: token });
};


export default {

  registerUser,
  login
};
