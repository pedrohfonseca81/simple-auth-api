import { Router } from "express";
import Authentication from "../controllers/Authentication";

const router = Router();

/**
 * Authentication controller
 */
const auth = new Authentication();

/**
 * Endpoints
 */
router.post("/signup", auth.signUp);
router.post("/signin", auth.signIn);

export default router;