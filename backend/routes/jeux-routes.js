import express from 'express';
import { check } from 'express-validator';
import jeuxController from '../controllers/jeux-controller.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();


router.get('/', jeuxController.getJeux);
router.get('/:jid', jeuxController.getJeuById);

router.use(checkAuth);

router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('categorie').not().isEmpty(),
  ],
  jeuxController.createJeu
);

router.patch('/:jid', jeuxController.updateJeu);

router.delete('/:jid', jeuxController.deleteJeu);

export default router;
