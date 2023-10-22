import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { interaction } from "../models/interaction";
import { query } from "../models/query";
import { pdf } from "../models/pdf";
import { Token } from "../interfaces/token";
import { Role } from "../enums/role";
import mongoose from "mongoose";

export const sendQuery = async (
    username: string,
    user_id: string,
    query_text: string,
    pdf_id: string
) => {
    try {
        const savedQuery = await query.create({
            username,
            user_id: new mongoose.mongo.ObjectId(user_id),
            pdf_id: new mongoose.mongo.ObjectId(pdf_id),
            query_text,
        });

        interaction.create({
            username,
            interaction_type: "Create",
            interaction_details: "Query sent",
        });

        return savedQuery._id.toString();
    } catch (error) {
        return error;
    }
};

export const addResponseToQuery = async (
    query_id: string,
    username: string,
    user_id: string,
    query_response: string,
    response_timestamp: string,
    is_answered: boolean
) => {
    try {
        await query.updateOne(
            { _id: new mongoose.mongo.ObjectId(query_id) },
            {
                query_response,
                response_timestamp,
                is_answered,
            }
        );

        interaction.create({
            username,
            user_id: new mongoose.mongo.ObjectId(user_id),
            interaction_type: "Update",
            interaction_details: "Query updated",
            query_id: query_id,
        });

        return query_id;
    } catch (error) {
        return error;
    }
};

export const getAllQueriesbyUsernameAndPDF = async (
    username: string,
    pdf_id: string,
    user_id: string
) => {
    try {
        const selectedQueries = await query
            .find({
                username: username,
                pdf_id: new mongoose.mongo.ObjectId(pdf_id),
            })
            .exec();

        interaction.create({
            username,
            user_id: new mongoose.mongo.ObjectId(user_id),
            interaction_type: "Get",
            interaction_details: "Queries retrieved",
        });

        return selectedQueries;
    } catch (error) {
        return error;
    }
};

export const getQuerybyID = async (
    username: string,
    query_id: string,
    user_id: string
) => {
    try {
        const selectedQuery = query
            .findOne({
                username: username,
                _id: new mongoose.mongo.ObjectId(query_id),
            })
            .exec();

        interaction.create({
            username,
            user_id: new mongoose.mongo.ObjectId(user_id),
            interaction_type: "Get",
            interaction_details: "Query retrieved",
        });

        return selectedQuery;
    } catch (error) {
        return error;
    }
};

export const deleteQuery = async (
    query_id: string,
    username: string,
    user_id: string
) => {
    try {
        await query
            .deleteOne({
                _id: new mongoose.mongo.ObjectId(query_id),
                username: username,
            })
            .exec();

        interaction.create({
            username,
            user_id: new mongoose.mongo.ObjectId(user_id),
            interaction_type: "Delete",
            interaction_details: "Query deleted",
        });

        return true;
    } catch (error) {
        return error;
    }
};

// Admin function(s)

// export const getAllQueries = async (req: Request, res: Response) => {
//     try {
        
//         const results = await query.find().exec();

//         interaction.create({
//             username: (decodedToken as Token).username,
//             interaction_type: "Get",
//             interaction_details: "All queries retrieved (admin)",
//         });

//         return res.status(200).json({
//             status: true,
//             results: results.length,
//             data: {
//                 queries: results,
//             },
//         });
//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             message: "Some error occured",
//             error: error,
//         });
//     }
// };
