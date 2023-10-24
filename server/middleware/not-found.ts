import { Request, Response } from "express";
import path from "path";

const notFound = (req: Request, res: Response) =>
    res.status(404).sendFile(path.resolve("public/not-found.html"));

module.exports = notFound;
