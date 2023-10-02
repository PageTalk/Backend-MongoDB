import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { user } from "../models/user";
import { Role } from "../enums/role";
import { Token } from "../interfaces/token";

// User Functions

export const createUser = async (req: Request, res: Response) => {
    try {
        // Check if username exists
        const username = req.params.username;
        const retrievedUser = await user.findOne({ username }).exec();
        if (retrievedUser) {
            return res.status(400).json({
                status: false,
                message: "User already exists",
            });
        }

        const { first_name, last_name, phone, email, password } = req.body;

        // Check if the email is associated with a different username
        const retrievedUser2 = await user.findOne({ username, email }).exec();
        if (retrievedUser2) {
            return res.status(400).json({
                status: false,
                message: "Email already exists",
            });
        }

        // Hashing the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password, salt);

        const savedUser = await user.create({
            username,
            first_name,
            last_name,
            phone,
            email,
            password: securedPassword,
        });
        console.log(savedUser);

        const payloadData: Token = {
            id: savedUser.user_id,
            username,
            email,
            role: Role.user,
        };

        // Creating a JWT token
        const authToken = jwt.sign(payloadData, process.env.JWT_SECRET!);

        return res.status(201).json({
            status: true,
            message: "User created successfully",
            id: savedUser.user_id,
            authToken,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured while creating a user",
            error: error,
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const retrievedUserArray = await user.find({ username }).exec();
            if (retrievedUserArray.length === 0) {
                return res.status(401).json({
                    status: false,
                    message: "Login with correct username",
                });
            }

            const retrievedUser = retrievedUserArray[0];
            const passwordCompare = await bcrypt.compare(
                password,
                retrievedUser.password
            );

            if (!passwordCompare) {
                return res.status(401).json({
                    status: false,
                    message: "Login with correct password",
                });
            }

            const payloadData: Token = {
                id: retrievedUser.user_id,
                username,
                email: retrievedUser.email,
                role: (retrievedUser.role) as Role,
            };

            // Creating a JWT token
            const authToken = jwt.sign(payloadData, process.env.JWT_SECRET!);

            return res.status(200).json({
                status: true,
                message: "User Login successful",
                authToken,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Some error occured",
                error: error,
            });
        }
};

export const updateUser = async (req: Request, res: Response) => {
    //     try {
    //         const token = req.headers.authorization?.split(" ")[1];
    //         if (!token) {
    //             return res.status(200).json({
    //                 success: false,
    //                 message: "Error! Please provide a token.",
    //             });
    //         }
    //         const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
    //         const token_username = (decodedToken as Token).username;
    //         const { username } = req.params;
    //         if (token_username !== username) {
    //             return res.status(403).json({
    //                 status: false,
    //                 message: "You are not authorized to perform this action",
    //             });
    //         }
    //         const user_id = (decodedToken as Token).id;
    //         const { first_name, last_name, phone, email, password } = req.body;
    //         let sql = "UPDATE `users` SET ";
    //         const updateFields = [];
    //         if (first_name) {
    //             updateFields.push(`first_name = '${first_name}'`);
    //         }
    //         if (last_name) {
    //             updateFields.push(`last_name = '${last_name}'`);
    //         }
    //         if (phone) {
    //             updateFields.push(`phone = '${phone}'`);
    //         }
    //         if (email) {
    //             updateFields.push(`email = '${email}'`);
    //         }
    //         if (password) {
    //             const salt = await bcrypt.genSalt(10);
    //             const securedPassword = await bcrypt.hash(password, salt);
    //             updateFields.push(`password = '${securedPassword}'`);
    //         }
    //         sql += updateFields.join(", ");
    //         await queryDatabase(sql);
    //         const updatedUserArray = await queryDatabase(
    //             `SELECT * FROM users WHERE user_id = ${user_id}`
    //         );
    //         return res.status(200).json({
    //             status: true,
    //             message: "User updated successfully",
    //             updated_query: updatedUserArray[0],
    //         });
    //     } catch (error) {
    //         return res.status(500).json({
    //             status: false,
    //             message: "Some error occured",
    //             error: error,
    //         });
    //     }
};

// Admin Functions

export const getUserByUsername = async (req: Request, res: Response) => {
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
    //         const query = `SELECT * FROM users WHERE username = '${req.params.username}'`;
    //         const result = await queryDatabase(query);
    //         return res.status(200).json({
    //             status: true,
    //             results: result.length,
    //             data: {
    //                 users: result,
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

export const getAllUsers = async (req: Request, res: Response) => {
    //     // console.log(req.body)
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
    //         const query = "SELECT * FROM users";
    //         const results = await queryDatabase(query);
    //         return res.status(200).json({
    //             status: true,
    //             results: results.length,
    //             userData: decodedToken,
    //             data: {
    //                 users: results,
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
