import { collectionInterface } from './../interfaces/collection';
import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import multer from "multer";
import admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
var path = require("path");
import jwt from "jsonwebtoken";

import { collection } from "../models/collection";

import { Token } from "../interfaces/token";
import { Role } from "../enums/role";

// Collection Functions

export const createCollection = async (req: Request, res: Response) => {
    try {
        const { user_id: username, pdf_id, collection_name, collection_description } = req.body;

        const savedCollection = await collection.create({
            username,
            pdf_id,
            collection_name,
            collection_description,
        });
        console.log(savedCollection);

        return res.status(201).json({
            status: true,
            message: "Collection created successfully",
            data: savedCollection,
        });
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};