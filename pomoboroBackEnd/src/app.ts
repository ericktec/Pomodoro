import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";

import tasksRouter from "../routes/tasks";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

app.use("/tasks", tasksRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
