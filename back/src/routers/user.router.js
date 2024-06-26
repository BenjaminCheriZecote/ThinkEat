import { Router } from "express";

import UserController from "../controllers/user.controller.js";
import { authorizedByUserId, errorHandler as eh, authenticateToken, isDisconnected, getTokenData} from "../middlewares/index.js";

export const router = Router();

router.route("/user/:userId/recipe/:recipeId")
  .put(authenticateToken, eh(UserController.addRecipeToUser.bind(UserController)))
  .delete(authenticateToken, eh(UserController.removeRecipeToUser.bind(UserController)));

router.route("/user/:userId/recipe")
  .get(authenticateToken, eh(UserController.getRecipeToUser.bind(UserController)));

router.route("/user/:id")
  .patch(authenticateToken, eh(authorizedByUserId("id","user")), eh(UserController.update.bind(UserController)))
  .delete(authenticateToken, eh(authorizedByUserId("id","user")), eh(UserController.delete.bind(UserController)));

router.patch("/user/account/:uuid", eh(UserController.patchActiveAccount.bind(UserController)));
router.patch("/user/password/:uuid", eh(UserController.patchResetPassword.bind(UserController)));
  
router.post("/reset-password", eh(UserController.postResetPassword.bind(UserController)));
router.patch("/update-password", authenticateToken, eh(UserController.patchUpdatePassword.bind(UserController)));

router.post("/signup", isDisconnected, eh(UserController.postSignup.bind(UserController)));
router.post("/signin", isDisconnected, eh(UserController.postSignin.bind(UserController)));
router.delete("/logout", authenticateToken, eh(UserController.deleteLogout.bind(UserController)));
  
router.post("/user/token", getTokenData, eh(UserController.getRefreshToken.bind(UserController)));