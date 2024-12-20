import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserDatamapper from "../datamappers/user.datamapper.js";
import UserValidator from "../validators/user.validator.js";
import CoreController from './core.controller.js';
import { sendMailResetPassword, sendMailValidateAccount } from '../helpers/mailer.js';
import ApiError from '../helpers/apiError.js';
import RecipeDatamapper from '../datamappers/recipe.datamapper.js';

export default class UserController extends CoreController {
  static datamapper = UserDatamapper;
  static className = "user";
  static validator = UserValidator;

  static async postSignup(req, res) {
    const data = this.validator.checkBodyForCreate(req.body);
    
    const existingUser = await this.datamapper.findAll({filter:{user:[["email","=",data.email]]}}); // on vérifie que l'email n'est pas déjà utilisé
    this.validator.checkIfMailIsUsed(existingUser[0]);
    
    const hashedPassword = await bcrypt.hash(data.password, parseInt(process.env.PASSWORD_SALT)); // on hash le mot de passe
    
    const newUser = await this.datamapper.create({ ...data, password: hashedPassword });
    const key = await this.datamapper.createKey({"user_id":newUser.id, type:"account_validation"});

    await sendMailValidateAccount(data.email, key.id);

    res.status(201).end();
  }
  static async postSignin(req, res) {
    const data = this.validator.checkBodyForSignIn(req.body);

    let [ existingUser ] = await this.datamapper.findAll({filter:{user:[["email","=",data.email]]}});

    await this.validator.checkUserSignin(data, existingUser);
    
    delete existingUser.password;

    const expiresIn = parseInt(process.env.JWT_EXPIRE_IN, 10) || 60;
    const accessTokenExpiresAt = new Date(Math.round(Date.now() + (1000 * expiresIn))).toISOString();
    const accessToken = jwt.sign({ ...existingUser, ip: req.ip, userAgent: req.headers['user-agent']}, process.env.JWT_PRIVATE_KEY, { expiresIn });
    
    const key = await this.datamapper.createKey({"user_id":existingUser.id, type:"refresh_token"});
    const refreshTokenExpiresIn = parseInt(process.env.JWT_REFRESH_EXPIRE_IN, 10) || 2000000;
    const refreshTokenExpiresAt = new Date(Math.round(Date.parse(key["created_at"]) + (1000 * refreshTokenExpiresIn))).toISOString();

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
    });
    
    res.json({
      accessToken,
      accessTokenExpiresAt,
      refreshToken: key.id,
      refreshTokenExpiresAt,
      user: existingUser
    });
  }

  static async postResetPassword(req, res) {
    const data = this.validator.checkBodyForResetPassword(req.body);

    const users = await this.datamapper.findAll({filter:{user:[["email","=",data.email]]}});
    const user = users[0];
    this.validator.checkIfExist(user, this.className);
    
    const key = await this.datamapper.createKey({"user_id":user.id, type:"reset_password"});

    await sendMailResetPassword(data.email, key.id);

    res.status(200).end();
  }

  static async patchActiveAccount(req,res) {
    const { uuid } = req.params;
    this.validator.checkUuid(uuid);

    const key = await this.datamapper.findKeyByPkAndType(uuid, "account_validation");
    this.validator.checkIfExist(key, this.className);

    await this.datamapper.update({id: key["user_id"], active:true});
    await this.datamapper.deleteKey(key.id);

    res.status(200).end();
  }
  static async patchResetPassword(req,res) {
    const { uuid } = req.params;
    this.validator.checkUuid(uuid);
    const data = this.validator.checkBodyForUpdatePassword(req.body);
    
    const key = await this.datamapper.findKeyByPkAndType(uuid, "reset_password");
    this.validator.checkIfExist(key, this.className);

    const hashedPassword = await bcrypt.hash(data.password, parseInt(process.env.PASSWORD_SALT));
    
    const row = await this.datamapper.update({...data, id:key["user_id"], password: hashedPassword});
    await this.datamapper.deleteKey(key.id);
    
    delete row.password;

    return res.status(200).json(row);

  }
  static async patchUpdatePassword(req,res) {
    const {email, actualPassword, password, passwordConfirm} = req.body;
    const dataMapped = {email:email, password:actualPassword};
    const data = this.validator.checkBodyForSignIn(dataMapped);

    let [ existingUser ] = await this.datamapper.findAll({filter:{user:[["email","=",data.email]]}});

    await this.validator.checkUserSignin(data, existingUser);

    const data2 = this.validator.checkBodyForUpdatePassword({password, passwordConfirm});
    const {id} = req.user;

    const hashedPassword = await bcrypt.hash(data2.password, parseInt(process.env.PASSWORD_SALT));
    
    const row = await this.datamapper.update({...data2, id:id, password: hashedPassword});
  
    delete row.password;

    return res.status(200).json(row);

  }
  
  static async getRefreshToken(req,res) {
    const tokenData = req.user;
    const { refreshToken } = req.body;
    this.validator.checkUuid(refreshToken);
    const key = await this.datamapper.findKeyByPkAndType(refreshToken, "refresh_token");
    
    this.validator.checkIfExist(key, "Key");
    if (tokenData.id !== key["user_id"]) throw new ApiError("Ce token n'est pas valdie", {name: "Forbiden", httpStatus:403});
     
    const refreshTokenExpiresIn = parseInt(process.env.JWT_REFRESH_EXPIRE_IN, 10) || 2000000;
    const refreshTokenExpiresAt = new Date(Math.round(Date.parse(key["created_at"]) + (1000 * refreshTokenExpiresIn))).toISOString();

    const expiresIn = parseInt(process.env.JWT_EXPIRE_IN, 10) || 60;
    const accessTokenExpiresAt = new Date(Math.round(Date.now() + (1000 * expiresIn))).toISOString();
    const accessToken = jwt.sign({ ...req.user, ip: req.ip, userAgent: req.headers['user-agent']}, process.env.JWT_PRIVATE_KEY, { expiresIn });

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
    });
    
    res.json({
      accessToken,
      accessTokenExpiresAt,
      refreshToken: key.id,
      refreshTokenExpiresAt
    });
  }

  static async deleteLogout(req, res) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
    });
    res.status(200).end();
  }

  static async getRecipeToUser(req, res) {
    const userId = req.user.id;
    const query = this.validator.checkQueryForGet(req.query);
    const rows = await this.datamapper.getRecipeToUser(query, userId);
    res.status(200).json(rows);
  }

  static async addRecipeToUser(req, res) {
    
    const data = this.validator.checkDataForAddRemoveRecipe({ ...req.params});
    

    const existingRecipeInUser = await this.datamapper.findRecipeToUser(data);
    this.validator.checkIfAlreadyExist(existingRecipeInUser, "This recipe in user");

    const existingUser = await this.datamapper.findByPk(data.userId);
    this.validator.checkIfExist(existingUser, "User");

    const existingRecipe = await RecipeDatamapper.findByPk(data.recipeId);
    this.validator.checkIfExist(existingRecipe, "Recipe");

    await this.datamapper.addRecipeToUser(data);
    res.status(200).end();
  }

  static async removeRecipeToUser(req, res) {
    const data = this.validator.checkDataForAddRemoveRecipe({ ...req.params});

    const existingRecipeInUser = await this.datamapper.findRecipeToUser(data);
    this.validator.checkIfExist(existingRecipeInUser, "This recipe in user");

    await this.datamapper.removeRecipeToUser(data);
    res.status(200).end();
  }

}

