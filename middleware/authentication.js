import jwt from "jsonwebtoken";
import "dotenv/config";

export default {
  authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "unauthenticated" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json({ message: err });

      req.user = user;
      next();
    });
  },
};
