import { Router } from "express";
import User from "../controllers/User";

const router = Router();

/**
 * User controller
 */
const user = new User();

/**
 * Endpoints
 */
router.get("/fetch", user.fetch);

export default router;