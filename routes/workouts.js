import { Router } from "express";
import Workout from "../models/Workout.js";

const router = Router();

router.get("/:workoutId", async (req, res) => {
  try {
    const workouts = await Workout.findById(req.params.workoutId);
    res.json(workouts);
  } catch {
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
});

router.get("", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch {
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
});

router.post("", (req, res) => {
  const workout = new Workout({
    title: req.body.title,
    description: req.body.description,
  });

  workout
    .save()
    .then((data) => {
      res.json(data);
    })
    .then((err) => {
      res.json({ message: err });
    });
});

router.delete("/:workoutId", async (req, res) => {
  try {
    const workouts = await Workout.findByIdAndDelete(req.params.workoutId);
    res.status(204).json();
  } catch {
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
});

router.patch("/:workoutId", async (req, res) => {
  try {
    const updatedWorkout = await Workout.updateOne(
      { _id: req.params.workoutId },
      { $set: { title: req.body.title } }
    );

    res.status(200).json(updatedWorkout);
  } catch {
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
});

export default router;
