import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
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
    //     try {
    //         const { queryID } = req.params;
    //         const token = req.headers.authorization?.split(" ")[1];
    //         if (!token) {
    //             return res.status(200).json({
    //                 success: false,
    //                 message: "Error! Please provide a token.",
    //             });
    //         }
    //         const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
    //         const user_id = (decodedToken as Token).id;
    //         const selectQueryQuery = `SELECT * FROM query WHERE fk_user_id = ${user_id} AND query_id = ${queryID}`;
    //         const queryArray = await queryDatabase(selectQueryQuery);
    //         if (!queryArray || queryArray.length === 0) {
    //             return res.status(404).json({
    //                 status: false,
    //                 message: "No such query exists",
    //             });
    //         }
    //         const { query_text, query_response, response_timestamp, is_answered } =
    //             req.body;
    //         let sql = "UPDATE `query` SET ";
    //         const updateFields = [];
    //         if (query_text) {
    //             updateFields.push(`query_text = '${query_text}'`);
    //         }
    //         if (query_response) {
    //             updateFields.push(`query_response = '${query_response}'`);
    //         }
    //         if (response_timestamp) {
    //             updateFields.push(`response_timestamp = '${response_timestamp}'`);
    //         }
    //         if (typeof is_answered !== "undefined") {
    //             updateFields.push(`is_answered = ${is_answered ? true : false}`);
    //         }
    //         sql += updateFields.join(", ") + ` WHERE query_id = ${queryID}`;
    //         await queryDatabase(sql);
    //         const updatedQueryArray = await queryDatabase(
    //             `SELECT * FROM query WHERE fk_user_id = ${user_id} AND query_id = ${queryID}`
    //         );
    //         return res.status(200).json({
    //             status: true,
    //             message: "Query updated successfully",
    //             updated_query: updatedQueryArray[0],
    //         });
    //     } catch (error) {
    //         return res.status(500).json({
    //             status: false,
    //             message: "Some error occured",
    //             error: error,
    //         });
    //     }
};

export const deleteQuery = async (req: Request, res: Response) => {
    //     try {
    //         const { queryID } = req.params;
    //         const token = req.headers.authorization?.split(" ")[1];
    //         if (!token) {
    //             return res.status(200).json({
    //                 success: false,
    //                 message: "Error! Please provide a token.",
    //             });
    //         }
    //         const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
    //         const user_id = (decodedToken as Token).id;
    //         const selectQueryQuery = `SELECT * FROM query WHERE fk_user_id = ${user_id} AND query_id = ${queryID}`;
    //         const queryArray = await queryDatabase(selectQueryQuery);
    //         if (!queryArray || queryArray.length === 0) {
    //             return res.status(404).json({
    //                 status: false,
    //                 message: "No such query exists",
    //             });
    //         }
    //         const deleteQueryQuery = `DELETE FROM query WHERE fk_user_id = ${user_id} AND query_id = ${queryID}`;
    //         await queryDatabase(deleteQueryQuery);
    //         return res.status(200).json({
    //             status: true,
    //             message: "Query deleted successfully",
    //         });
    //     } catch (error) {
    //         return res.status(500).json({
    //             status: false,
    //             message: "Some error occured",
    //             error: error,
    //         });
    //     }
};

// Admin function(s)

export const getAllQueries = async (req: Request, res: Response) => {
    //     try {
    //         const token = req.headers.authorization?.split(" ")[1];
    //         if (!token) {
    //             return res.status(200).json({
    //                 success: false,
    //                 message: "Error! Please provide a token.",
    //             });
    //         }
    //         const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
    //         const role = (decodedToken as Token).role;
    //         if (role !== Role.admin) {
    //             return res.status(403).json({
    //                 status: false,
    //                 message: "You are not authorized to perform this action",
    //             });
    //         }
    //         const query = "SELECT * FROM query";
    //         const results = await queryDatabase(query);
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
};
