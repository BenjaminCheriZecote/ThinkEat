import CoreController from './core.controller.js';
import RecipeDatamapper from '../datamappers/recipe.datamapper.js';
import RecipeValidator from '../validators/recipe.validator.js';

export default class RecipeController extends CoreController {
  static datamapper = RecipeDatamapper;
  static className = 'Recipe';
  static validator = RecipeValidator;

  static async getProposal(req, res) {

    const user = req.user ? req.user : null;

    const query = this.validator.checkQueryForGet(req.query);

    const filteredRecipes = await this.datamapper.findAll(query,user);
    const recipesNotes = await this.datamapper.getProposal(user.id);

    const evaluatedRecipes = filteredRecipes.map((filteredRecipe) => {
      const evaluateRecipe = recipesNotes.find((recipeNote) => recipeNote.id === filteredRecipe.id);
      return evaluateRecipe;
    });
   
    
    const sortedRecipes = evaluatedRecipes.sort((a, b) => {
      return b.history_note - a.history_note;
    });


    // Identifie les recettes avec la même history_note
    const groups = {};
    sortedRecipes.forEach(recipe => {
      const note = recipe.history_note;
      if (!groups[note]) {
        groups[note] = [];
      }
      groups[note].push(recipe);
    });

    // Permute aléatoirement les recettes avec la même history_note
    const result = [];
    Object.values(groups).forEach(group => {
      if (group.length > 1) {
        const shuffledGroup = shuffleArray(group); // Fonction de permutation aléatoire
        result.unshift(...shuffledGroup);
      } else {
        result.unshift(group[0]);
      }
    });

    // Fonction pour permuter aléatoirement un tableau
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    res.status(200).json(result);
  }
}
