export default class PlanService {
  constructor(planModel) {
    this.PlanModel = planModel;
  }

  async deletePlanById(planId) {
    const plan = await this.PlanModel.findById(planId);

    if (!plan) return;

    plan.deleted = true;
    await plan.save();
  }

  async planExistsAsync(plan) {
    const filter = plan;
    filter.deleted = { $in: [false, null] };

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
    const filter = { userId, deleted: { $in: [false, null] } };

    const plans = await this.PlanModel.find(filter).exec();

    return plans;
  }

  async getPlanById(planId) {
    const filter = { planId, deleted: { $in: [false, null] } };

    const plan = await this.PlanModel.find(filter)
      .populate({
        path: 'exercises',
        populate: { path: 'exerciseId', model: 'Exercise' },
      })
      .exec();

    return plan.deleted ? null : plan;
  }
}
