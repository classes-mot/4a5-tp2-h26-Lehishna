import mongoose from "mongoose";

const jeuSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    categorie: { type: String, required: true },
    nbJoueurs: { type: String, required: true },
    editeur: { type: String },
});
export const Jeu = mongoose.model('Jeu', jeuSchema);
