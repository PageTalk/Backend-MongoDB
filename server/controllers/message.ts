import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Request, Response, query } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { sendQuery, addResponseToQuery } from "./query";

import { interaction } from "../database/models/interaction";
import { message } from "../database/models/message";
import { Token } from "../interfaces/token";

export const createUserMessage = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "Error! Please provide a token.",
            });
        }
        const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
        const username = (decodedToken as Token).username;
        const user_id = (decodedToken as Token).user_id;
        const { pdf_id, content } = req.body;

        console.log(username, user_id);

        const query_id = await sendQuery(username, user_id, content, pdf_id);

        const savedMessage = await message.create({
            content,
            username,
            user_id: new mongoose.mongo.ObjectId(user_id),
            pdf_id: new mongoose.mongo.ObjectId(pdf_id),
            query_id: new mongoose.mongo.ObjectId(query_id),
            isModelResponse: false,
        });

        interaction.create({
            username,
            user_id: new mongoose.mongo.ObjectId(user_id),
            interaction_type: "Create",
            interaction_details: "Message sent",
        });

        return res.status(200).json({
            status: true,
            message: "Message sent successfully",
            message_id: savedMessage._id.toString(),
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const createModelMessage = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "Error! Please provide a token.",
            });
        }
        const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
        const username = (decodedToken as Token).username;
        if (username !== "Tex") {
            return res.status(403).json({
                status: false,
                message: "You are not authorized to perform this action",
            });
        }

        const user_id = (decodedToken as Token).user_id;
        const { pdf_id, content, query_id } = req.body;

        const updateQuery_id = await addResponseToQuery(
            query_id,
            username,
            user_id,
            content,
            Date.now().toString(),
            true
        );

        const savedMessage = await message.create({
            content,
            username: "Tex",
            user_id: new mongoose.mongo.ObjectId(user_id),
            pdf_id: new mongoose.mongo.ObjectId(pdf_id),
            query_id: new mongoose.mongo.ObjectId(query_id),
            isModelResponse: true,
        });

        interaction.create({
            username,
            user_id: new mongoose.mongo.ObjectId(user_id),
            interaction_type: "Create",
            interaction_details: "Message sent",
        });

        return res.status(200).json({
            status: true,
            message: "Message sent successfully",
            message_id: savedMessage._id.toString(),
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};
