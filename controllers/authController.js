import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcryptjs";
import user from "../models/User.js";

export default {
  async login(req, res) {
    const { email, password } = req.body;

    const foundUser = await user.findOne({
      email: email,
    });

    if (!foundUser)
      res.status(400).json({ message: "wrong email or password" });

    const correctPassword = await bcrypt.compare(password, foundUser.password);

    if (correctPassword) {
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const lifetime = parseInt(process.env.ACCESS_TOKEN_LIFETIME_IN_SECONDS);

      const token = jwt.sign({ email }, secret, { expiresIn: lifetime });

      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: "wrong email or password" });
  },

  async register(req, res) {
    const { email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    try {
      await user.create({
        email,
        password: passwordHash,
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ message: "email already taken" });
      } else {
        res.status(400).json({ message: "something went wrong" });
      }
    }

    res.status(201).end();
  },
};
