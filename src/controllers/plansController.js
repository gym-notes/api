import Plan from '../models/Plan.js';
import Exercise from '../models/Exercise.js';
import PlanService from '../services/planService.js';
import ExerciseService from '../services/exerciseService.js';

const planService = new PlanService(Plan);
const exerciseService = new ExerciseService(Exercise);

export default {
  async createPlan(req, res) {
    const plan = {
      name: req.body.name,
      exercises: req.body.exercises,
      userId: req.user.sub,
    };

    const planExists = await planService.planExistsAsync({
      name: plan.name,
      userId: plan.userId,
    });

    if (planExists)
      return res.status(400).json({ errors: 'plan already exists' });

    const exercisesExist = await exerciseService.exercisesExist(plan.exercises);

    if (!exercisesExist)
      return res
        .status(400)
        .json({ errors: "some of your exercises don't exist" });

    const result = await planService.createPlanAsync(plan);

    return result.success
      ? res.status(201).json({ planId: result.data.id })
      : res.status(400).json({ errors: result.errors });
  },

  async getMyPlans(req, res) {
    const plans = await planService.getPlansByUserId(req.user.sub);

    return plans.length > 0
      ? res.status(200).json({
          plans: plans.map((plan) => ({ id: plan.id, name: plan.name })),
        })
      : res.status(204).send();
  },

  async getPlanById(req, res) {
    const { planId } = req.params;

    const plan = await planService.getPlanById(planId);

    if (plan == null) return res.status(404).send();

    // eslint-disable-next-line eqeqeq
    if (plan.userId != req.user.sub)
      return res.status(403).json({ errors: ['It is not your plan'] });

    return res
      .status(200)
      .json({ id: plan.id, name: plan.name, exercises: plan.exercises });
  },
};
