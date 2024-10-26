import { Request, Response } from "express";

export default {
    getAllTasks: (req: Request, res: Response) => {
        res.json({ test: "hola" });
    },
};
