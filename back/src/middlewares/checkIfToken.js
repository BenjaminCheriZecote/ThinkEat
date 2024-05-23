import authenticateToken from "./authenticateToken.js";

export default function (req, res ,next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const authHeader2 = req.headers['cookie'];
  const cookie = authHeader2 && authHeader2.split('=')[1];

  if (token && cookie) {
    authenticateToken(req,res,next);    
  } else {
    next();
  }
}