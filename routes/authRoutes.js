import { Router } from "express";

import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

// Apply the rate limiting middleware to all requests.

const router = Router();
//REGISTER ENDPOINT

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - firstname
 *        - lastname
 *        - email
 *        - password
 *        - location
 *      properties:
 *        id:
 *          type: string
 *          description: The auto generated id
 *        firstname:
 *          type: string
 *          description: User first name
 *        lastname:
 *          type: string
 *          description: User last name
 *        email:
 *          type: string
 *          description: User email
 *        password:
 *          type: string
 *          minLength: 6
 *          description: User password
 *        location:
 *          type: string
 *          description: User location
 *      example:
 *        firstname: vaibhav
 *        lastname: kamble
 *        email: vaibhav@gmail.com
 *        password: vaibhav@123K
 *        location: pune
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Authentication apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    summary: register new user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: user created successfully
 *          content:
 *            application/json:
 *              $ref: '#/components/schemas/User'
 *        500:
 *          description: user not created
 */
router.post("/register", limiter, registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: login user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: user logged successfully
 *          content:
 *            application/json:
 *              $ref: '#/components/schemas/User'
 *        500:
 *          description: user login failed
 */
router.post("/login", limiter, loginController);

export default router;
