import express from "express";
import * as defaultsController from "../controllers/defaultsController.js";
import authenticate from "../middleware/authentication.js";
import validate from "../middleware/validation.js";
import postRequestSchema from "../validationSchemas/defaultPostSchema.js";

const router = express.Router();

router.get("", authenticate, defaultsController.getOperation);

router.post(
  "",
  authenticate,
  validate(postRequestSchema),
  defaultsController.postOperation
);

router.patch("", defaultsController.patchOperation);

router.delete("", defaultsController.deleteOperation);

export default router;
