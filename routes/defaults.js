import express from "express";
import * as defaultsController from "../controllers/defaultsController.js";

const router = express.Router();

router.get("", defaultsController.getOperation);

router.post("", defaultsController.postOperation);

router.patch("", defaultsController.patchOperation);

router.delete("", defaultsController.deleteOperation);

export default router;
