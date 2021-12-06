import jwt from 'jsonwebtoken';
import 'dotenv/config';

function authorize(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'unauthorized' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: err });

    req.user = user;

    return next();
  });

  return null;
}

export default authorize;
