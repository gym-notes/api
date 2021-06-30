import express from "express";
import * as defaultsController from "../controllers/defaultsController.js";

const router = express.Router();

/**
 * @openapi
 * /defaults:
 *   get:
 *     summary: empty get endpoint.
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("", defaultsController.getOperation);

/**
 * @openapi
 * /defaults:
 *   post:
 *     summary: empty post endpoint
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post("", defaultsController.postOperation);

/**
 * @openapi
 * /defaults:
 *   patch:
 *     summary: empty patch endpoint
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.patch("", defaultsController.patchOperation);

/**
 * @openapi
 * /defaults:
 *   delete:
 *     summary: empty delete endpoint
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.delete("", defaultsController.deleteOperation);

export default router;
