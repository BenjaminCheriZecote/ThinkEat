import authenticateToken from "./authenticateToken.js";
import { getCookie } from "../helpers/cookies.js";

export default function (req, res ,next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const cookie = getCookie(req, 'access_token');

  if (token && cookie ) {
    authenticateToken(req,res,next);    
  } else {
    next();
  }
}