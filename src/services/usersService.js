export default class UsersService {
  constructor(user) {
    this.UserModel = user;
  }

  async getUserByIdAsync(userId) {
    const user = await this.UserModel.findById(userId).exec();

    return user;
  }

  async findByIdAndUpdateAsync(userId, update) {
    await this.UserModel.findOneAndUpdate(
      { _id: userId },
      { data: update }
    ).exec();
  }
}
