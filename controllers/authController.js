import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export default {
  async login(req, res) {
    const { email, password } = req.body;

    const foundUser = await User.findOne({
      email,
    });

    if (!foundUser)
      return res.status(400).json({ message: 'wrong email or password' });

    const correctPassword = await bcrypt.compare(password, foundUser.password);

    if (!correctPassword)
      return res.status(401).json({ message: 'wrong email or password' });

    const secret = process.env.ACCESS_TOKEN_SECRET;
    const lifetime = parseInt(process.env.ACCESS_TOKEN_LIFETIME_IN_SECONDS, 10);

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
        return res.status(400).json({ message: 'email already taken' });
      }

      return res.status(500).json({ message: 'something went wrong' });
    }

    return res.status(201).end();
  },

  async remindPassword(req, res) {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) res.status(400).json({ message: 'wrong email' });

    const token = jwt.sign({ email }, user.password, { expiresIn: 600 });

    res.status(200).json({ resetPasswordToken: token }).end();
  },

  async resetPassword(req, res) {
    const { token, newPassword } = req.body;

    const decoded = jwt.decode(token);

    if (!decoded) return res.status(400).json({ message: 'invalid token' });

    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(400).json({ message: 'invalid token' });

    try {
      jwt.verify(token, user.password);
    } catch {
      return res.status(401).json({ message: 'invalid token' });
    }

    const newPasswordSameAsOld = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (newPasswordSameAsOld)
      return res
        .status(400)
        .json({ message: "new password can't be the same as old" });

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    user.password = newPasswordHash;
    await user.save();

    return res.status(204).end();
  },
};
