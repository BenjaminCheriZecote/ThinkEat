import CoreController from './core.controller.js';
import RecipeDatamapper from '../datamappers/recipe.datamapper.js';
import RecipeValidator from '../validators/recipe.validator.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);



export default class RecipeController extends CoreController {
  static datamapper = RecipeDatamapper;
  static className = 'Recipe';
  static validator = RecipeValidator;

  static async getProposal(req, res) {
    const user = req.user ? req.user.id : null;
    const favorite  = req.query ? req.query.favorites : null;

    const query = this.validator.checkQueryForGet(req.query);
    let result;

    if (user) {
      if (!favorite) {
        result = await this.datamapper.getProposal(user, query);
      } else {
        result = await this.datamapper.getProposal(user, query, favorite);
      }

    } else {
      // result = await this.datamapper.getProposal(query);
      result = await this.datamapper.findAll(query);
      result.sort(() => Math.random() - 0.5);
    }
    res.status(200).json(result);
  }

  static async deleteFileImageByName(req, res) {
    const { id } = req.params;
    this.validator.checkId(id);

    const recipe = await this.datamapper.findByPk(id);

    if (recipe.image) {
      const filePath = path.join(__dirname, '../../public/img', recipe.image); // Assuming 'public' is the folder name
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted successfully');
      });
    }
    res.status(201).end();
  }

  static async postImageToRecipe(req, res){
    const {oldName, newName} = req.body;
    if (oldName && newName) return this.patchImageNameRecipe(req, res);
    
    // this.deleteFileImageByName(req, res);

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/img');
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    });
    const upload = multer({ 
      storage:storage,
      limits: { fileSize: 10 * 1024 * 1024 }
    });

    upload.single("image")(req, res, err => {
      if (err instanceof multer.MulterError) {
        // Gestion des erreurs Multer
        return res.status(400).json({ message: 'Erreur lors du téléchargement du fichier.', error: err });
      } else if (err) {
        // Gestion des autres erreurs
        return res.status(500).json({ message: 'Une erreur est survenue lors du traitement du fichier.', error: err });
      }
      res.status(201).end();
    });
  }

  static async patchImageNameRecipe(req, res) {
    const {oldName, newName} = req.body;

    const pathOldName = path.join(__dirname, '../../public/img', oldName);
    const pathNewName = path.join(__dirname, '../../public/img', newName);

    fs.rename(pathOldName, pathNewName, (err) => {
      if (err) {
        console.error('Erreur lors du renommage du fichier :', err);
        return;
      }
      console.log('Le fichier a été renommé avec succès.');
    });
    res.status(200).end();
  }
}
