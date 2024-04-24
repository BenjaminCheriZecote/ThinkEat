import CoreController from './core.controller.js';
import RecipeDatamapper from '../datamappers/recipe.datamapper.js';
import RecipeValidator from '../validators/recipe.validator.js';

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
}
