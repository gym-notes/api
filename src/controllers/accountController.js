import User from '../models/User.js';
import UsersService from '../services/usersService.js';

const usersService = new UsersService(User);

export default {
  async getMyAccountInfo(req, res) {
    const user = await usersService.getUserByIdAsync(req.user.sub);

    return res.status(200).json({ email: user.email, data: user.data }).send();
  },
};
