import jwt from "jsonwebtoken";
import "dotenv/config";

export default {
  login(req, res) {
    const { email, password } = req.body;

    if (email === "user@example.com" && password === "example") {
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const lifetime = parseInt(process.env.ACCESS_TOKEN_LIFETIME_IN_SECONDS);

      const token = jwt.sign({ email }, secret, { expiresIn: lifetime });

      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: "Auth Failed" });
  },

  register(req, res) {
    res.status(200).json({ message: "authenticated route" });
  },
};
