import jwt from 'jsonwebtoken';
import ApiError from '../helpers/apiError.js';
import UserValidator from '../validators/user.validator.js';

export default function (req, _, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const authHeader2 = req.headers['cookie'];
  const cookie = authHeader2 && authHeader2.split('=')[1];

  if (!token || !cookie ) throw new ApiError('Unauthorized', {httpStatus: 401});

  jwt.verify(cookie, process.env.JWT_PRIVATE_KEY, (err) => {
    if (err) throw new ApiError('Forbidden', {httpStatus: 403});
  });

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err,payload) => {
    if (err) throw new ApiError('Forbidden', {httpStatus: 403});
    
    const user = UserValidator.checkTokenPayload(payload, req);
    req.user = user;

    next();
  });
}