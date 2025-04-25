import express from "express";
import { updateRoleToEducator } from "../controllers/educatorController.js";

const educatorRouter = express.Router();

// Add Educator Router
educatorRouter.get("/updated-role", updateRoleToEducator);

export default educatorRouter;