import { Router, Request, Response } from "express";
import tasksController from "../src/controllers/tasks";

const tasksRouter = Router();

tasksRouter.get("/", tasksController.getAllTasks);

export default tasksRouter;
