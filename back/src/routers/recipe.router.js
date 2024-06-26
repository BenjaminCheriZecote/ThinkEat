import { Router } from "express";

import RecipeController from "../controllers/recipe.controller.js";
import { authenticateToken, authorizedByUserId, errorHandler as eh } from "../middlewares/index.js";
import checkIfToken from "../middlewares/checkIfToken.js";

export const router = Router();

router.route("/recipe/:id")
  .get(checkIfToken,eh(RecipeController.getByPk.bind(RecipeController)))
  .patch(authenticateToken,eh(authorizedByUserId("id", "recipe")),eh(RecipeController.update.bind(RecipeController)))
  .post(authenticateToken,eh(authorizedByUserId("id", "recipe")),eh(RecipeController.postImageToRecipe.bind(RecipeController)))
  .delete(authenticateToken,eh(authorizedByUserId("id", "recipe")),eh(RecipeController.delete.bind(RecipeController)));

router.route("/recipe")
  .get(checkIfToken,eh(RecipeController.getAll.bind(RecipeController)))
  .post(authenticateToken, eh(RecipeController.create.bind(RecipeController)));

router.route("/proposal")
  .get(checkIfToken,eh(RecipeController.getProposal.bind(RecipeController)));

