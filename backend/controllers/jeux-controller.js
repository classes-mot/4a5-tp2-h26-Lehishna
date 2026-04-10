import HttpError from '../util/http-error.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Jeu } from '../models/jeu.js';


const getJeux = async (req, res, next) => {
  let jeux;
  try {
    jeux = await Jeu.find();
  }catch(err){

    return next(new HttpError('Opération échouée...', 500))
  }

  res.json({ jeux: jeux.map((j) => j.toObject({ getters: true })) });
};

const getJeuById = async (req, res, next) => {
const jeuId = req.params.jid;

  let jeu;
  try{
    jeu = await Jeu.findById(jeuId);
  }catch(err){
 
    return next(new HttpError('Opération échouée...', 500))
  }
  
  if (!jeu) {
    return next(new HttpError('Jeu non trouvée', 404));
  }
  res.json({ jeu: jeu.toObject({ getters: true }) }); 
};



const createJeu = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(
      new HttpError('données saisies invalides valider votre payload', 422)
    );
  }
  const { title, description, categorie, nbJoueurs, editeur } = req.body;

  const nouveauJeu = new Jeu({
    title,
    description,
    categorie,
    nbJoueurs,
    editeur,
  });

  try{
    await nouveauJeu.save();
  }catch (err){

    return next(new HttpError('Échec de la création du jeu.', 500))
  }

  res.status(201).json({ jeu: nouveauJeu });
};


const updateJeu = async(req, res, next) => {
  const { title, description, categorie, nbJoueurs, editeur } = req.body;
  const jeuId = req.params.jid;
  
  let updatedJeu 
  try{
    updatedJeu = await Jeu.findById(jeuId);
    updatedJeu.title = title;
    updatedJeu.description = description;
    updatedJeu.categorie = categorie;
    updatedJeu.nbJoueurs = nbJoueurs;
    updatedJeu.editeur = editeur;
    await updatedJeu.save();
  }catch (err){

    return next(new HttpError('Mise à jour du jeu échouée...', 500))
  }

  res.status(200).json({ jeu: updatedJeu });
};

//DELETE
const deleteJeu = async (req, res, next) => {
  const jeuId = req.params.jid;
  try{
    const jeu = await Jeu.findByIdAndDelete(jeuId);

    if(!jeu){
      return res.status(404).json({ message: 'Jeu non trouvé' });
    }
    return res.status(200).json({ message: 'Jeu supprimé' })
  }catch(err){
    return next(new HttpError('Opération échouée...', 500))
  }
 
};

export default {
  getJeux: getJeux,
  getJeuById: getJeuById,
  createJeu: createJeu,
  updateJeu: updateJeu,
  deleteJeu: deleteJeu,
};
