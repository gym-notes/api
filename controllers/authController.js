import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export default {
  async login(req, res) {
    const { email, password } = req.body;

    const foundUser = await User.findOne({
      email: email,
    });

    if (!foundUser)
      res.status(400).json({ message: "wrong email or password" }).end(); //TODO End request properly

    const correctPassword = await bcrypt.compare(password, foundUser.password);

    if (!correctPassword)
      return res.status(401).json({ message: "wrong email or password" });

    const secret = process.env.ACCESS_TOKEN_SECRET;
    const lifetime = parseInt(process.env.ACCESS_TOKEN_LIFETIME_IN_SECONDS);

    const token = jwt.sign({ email }, secret, { expiresIn: lifetime });

    return res.status(200).json({ token });
  },

  async register(req, res) {
    const { email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    try {
      await User.create({
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

  async remindPassword(req, res) {
    const { email } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (!user) res.status(400).json({ message: "wrong email" });

    const token = jwt.sign({ email }, user.password, { expiresIn: 600 });

    res.status(200).json({ resetPasswordToken: token }).end();
  },
};
