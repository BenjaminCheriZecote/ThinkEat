import { Router } from "express";

import HistoryController from "../controllers/history.controller.js";
import { authenticateToken, errorHandler as eh } from "../middlewares/index.js";


export const router = Router();

router.route("/history/:historyId/recipe/:recipeId")
  .put(authenticateToken,eh(HistoryController.addRecipe.bind(HistoryController)))
  .patch(authenticateToken,eh(HistoryController.updateRecipe.bind(HistoryController)))
  .delete(authenticateToken,eh(HistoryController.removeRecipe.bind(HistoryController)));

router.route("/history/:id")
  .get(authenticateToken, eh(HistoryController.getByPk.bind(HistoryController)))
  .delete(authenticateToken,eh(HistoryController.delete.bind(HistoryController)));

router.route("/history")
  .get(authenticateToken, eh(HistoryController.getRecipeToHistory.bind(HistoryController)))
  .post(authenticateToken,eh(HistoryController.create.bind(HistoryController)));



