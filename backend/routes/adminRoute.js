import express from "express";
import { adminLogin } from "../controllers/userController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

export default adminRouter;