import express from 'express';
import { check } from 'express-validator';
import usersController from '../controllers/users-controller.js';
const router = express.Router();


router.post(
    '/register',
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    usersController.registerUser
);

router.post('/login', 
    [
        check('email').normalizeEmail().isEmail(),
        check('password').not().isEmpty(),
    ],
    usersController.login
);

export default router;
