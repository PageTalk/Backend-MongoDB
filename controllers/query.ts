import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { interaction } from "../models/interaction";
import { query } from "../models/query";
import { pdf } from "../models/pdf";
import { Token } from "../interfaces/token";
import { Role } from "../enums/role";

export const sendQuery = async (req: Request, res: Response) => {
    try {
        const { pdfID } = req.params;
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "Error! Please provide a token.",
            });
        }
        const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
        const user_id = (decodedToken as Token).id;

        const retirevedPDFArray = await pdf.find({ pdf_id: pdfID }).exec();
        if (!retirevedPDFArray || retirevedPDFArray.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No such PDF exists",
            });
        }

        const pdf_id = retirevedPDFArray[0].pdf_id;

        const { query_text } = req.body;
        const savedQuery = await query.create({
            user_id,
            pdf_id,
            query_text,
        });

        interaction.create({
            user_id,
            interaction_type: "Create",
            interaction_details: "Query sent",
        });

        return res.status(200).json({
            status: true,
            message: "Query sent successfully",
            query_number: savedQuery.query_id,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const getAllQueriesbyUsernameAndPDF = async (req: Request, res: Response) => {
    try {
        const { pdfID } = req.params;
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "Error! Please provide a token.",
            });
        }
        const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
        const user_id = (decodedToken as Token).id;
        const retirevedPDFArray = await pdf.find({ pdf_id: pdfID }).exec();
        if (!retirevedPDFArray || retirevedPDFArray.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No such PDF exists",
            });
        }
        const selectedQueries = await query.find({ user_id, pdf_id: pdfID }).exec();

        interaction.create({
            user_id,
            interaction_type: "Get",
            interaction_details: "Queries retrieved",
        });

        return res.status(200).json({
            status: true,
            message: "Queries retrieved successfully",
            queries: selectedQueries,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const getQuerybyID = async (req: Request, res: Response) => {
    try {
        const { queryID } = req.params;
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "Error! Please provide a token.",
            });
        }
        const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
        const user_id = (decodedToken as Token).id;
        const selectedQuery = query.findOne({ user_id, query_id: queryID }).exec();

        interaction.create({
            user_id,
            interaction_type: "Get",
            interaction_details: "Query retrieved",
        });

        return res.status(200).json({
            status: true,
            message: "Query retrieved successfully",
            query: selectedQuery,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const updateQuery = async (req: Request, res: Response) => {
    try {
        const { queryID } = req.params;
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "Error! Please provide a token.",
            });
        }
        const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
        const user_id = (decodedToken as Token).id;
        
        const retirevedQueryArray = await query.find({ query_id: queryID, user_id: user_id }).exec();
        if (!retirevedQueryArray || retirevedQueryArray.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No such query exists",
            });
        }
        
        const { query_text, query_response, response_timestamp, is_answered } =
            req.body;
        
        await query.updateOne(
            { query_id: queryID, user_id: user_id },
            {
                query_text,
                query_response,
                response_timestamp,
                is_answered,
            }
        );

        interaction.create({
            user_id,
            interaction_type: "Update",
            interaction_details: "Query updated",
        });

        return res.status(200).json({
            status: true,
            message: "Query updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const deleteQuery = async (req: Request, res: Response) => {
    try {
        const { queryID } = req.params;
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "Error! Please provide a token.",
            });
        }
        const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
        const user_id = (decodedToken as Token).id;
        
        const retirevedQueryArray = await query.find({ query_id: queryID, user_id: user_id }).exec();
        if (!retirevedQueryArray || retirevedQueryArray.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No such query exists",
            });
        }

        await query.deleteOne({ query_id: queryID, user_id: user_id }).exec();

        interaction.create({
            user_id,
            interaction_type: "Delete",
            interaction_details: "Query deleted",
        });

        return res.status(200).json({
            status: true,
            message: "Query deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

// Admin function(s)

export const getAllQueries = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "Error! Please provide a token.",
            });
        }
        const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
        const role = (decodedToken as Token).role;
        if (role !== Role.admin) {
            return res.status(403).json({
                status: false,
                message: "You are not authorized to perform this action",
            });
        }
        
        const results = await query.find().exec();

        interaction.create({
            user_id: (decodedToken as Token).id,
            interaction_type: "Get",
            interaction_details: "All queries retrieved (admin)",
        });

        return res.status(200).json({
            status: true,
            results: results.length,
            data: {
                queries: results,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};
