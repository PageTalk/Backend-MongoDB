import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { interaction } from "../models/interaction";
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
            username,
            email,
            role: Role.user,
        };

        // Creating a JWT token
        const authToken = jwt.sign(payloadData, process.env.JWT_SECRET!);
    
        interaction.create({
            username: savedUser.username,
            interaction_type: "Sign-up",
            interaction_details: "user signed up",
        });

        return res.status(201).json({
            status: true,
            message: "User created successfully",
            username,
            first_name,
            last_name,
            phone,
            email,
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
            username,
            email: retrievedUser.email,
            role: (retrievedUser.role) as Role,
        };

        // Creating a JWT token
        const authToken = jwt.sign(payloadData, process.env.JWT_SECRET!);
        const { first_name, last_name, phone, email } = retrievedUser;

        interaction.create({
            username,
            interaction_type: "Login",
            interaction_details: "User logged in",
        });

        return res.status(200).json({
            status: true,
            message: "User Login successful",
            username,
            authToken,
            phone,
            email,
            first_name,
            last_name
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
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "Error! Please provide a token.",
            });
        }
        const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
        const token_username = (decodedToken as Token).username;
        const { username } = req.params;
        if (token_username !== username) {
            return res.status(403).json({
                status: false,
                message: "You are not authorized to perform this action",
            });
        }

        const { first_name, last_name, phone, email, password } = req.body;
        const updatedUser = await user.findOneAndUpdate(
            { username },
            { first_name, last_name, phone, email, password },
            { new: true }
        );

        interaction.create({
            username,
            interaction_type: "Update",
            interaction_details: "User updated",
        });

        return res.status(200).json({
            status: true,
            message: "User updated successfully",
            updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

// Admin Functions

export const getUserByUsername = async (req: Request, res: Response) => {
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
        const { username } = req.params;
        const userList = await user.find({ username }).exec();

        interaction.create({
            username,
            interaction_type: "Get",
            interaction_details: "User retrieved",
        });

        return res.status(200).json({
            status: true,
            data: {
                users: userList,
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

export const getAllUsers = async (req: Request, res: Response) => {
    // console.log(req.body)
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
        const username = (decodedToken as Token).username;
        
        if (role !== Role.admin) {
            return res.status(403).json({
                status: false,
                message: "You are not authorized to perform this action",
            });
        }
        const userList = await user.find().exec();

        interaction.create({
            username,
            interaction_type: "Get",
            interaction_details: "All users retrieved",
        });

        return res.status(200).json({
            status: true,
            data: {
                users: userList,
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
