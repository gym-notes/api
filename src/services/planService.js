export default class PlanService {
  constructor(planModel) {
    this.PlanModel = planModel;
  }

  async planExistsAsync(plan) {
    const foundPlan = await this.PlanModel.findOne(plan);

    return foundPlan != null;
  }

  createPlanAsync(plan) {
    const newPlan = new this.PlanModel(plan);

    return newPlan
      .save()
      .then((data) => ({ success: true, data }))
      .catch((err) => ({ success: false, errors: err.errors }));
  }

  async getPlansByUserId(userId) {
    const plans = await this.PlanModel.find({ userId }).exec();

    return plans;
  }
}
