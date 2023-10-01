import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { queryDatabase } from "../database/connection";
import { Role } from "../enums/role";

export const createAdminUser = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;

        // Check if username already exists
        let retrieveUserQuery = `SELECT *
            FROM users
            WHERE username = '${username}'`;
        let retrieveUser = await queryDatabase(retrieveUserQuery);
        if (retrieveUser.length !== 0) {
            return res.status(400).json({
                status: false,
                message: "Sorry the username has been taken",
            });
        }

        const { first_name, last_name, phone, email, password } = req.body;

        // Check if the email is associated with a different username
        retrieveUserQuery = `SELECT *
            FROM users
            WHERE email = '${email}'`;
        let retrieveUser2 = await queryDatabase(retrieveUserQuery);
        if (retrieveUser2.length !== 0) {
            return res.status(400).json({
                status: false,
                message:
                    "Sorry, the email is associated with a different username",
            });
        }

        // Hashing the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password, salt);

        const createUserQuery = `SELECT InsertUserAndGetID ('${username}' , '${first_name}', '${last_name}', '${email}', '${securedPassword}', '${Role.admin}', '${phone}');`;

        // const createUser = await queryDatabase(createUserQuery);
        const createUserQueryArray = await queryDatabase(createUserQuery);
        const user_id = Object.values(createUserQueryArray[0])[0];

        const payloadData = {
            id: user_id,
            username,
            email,
            role: Role.admin,
        };

        // Creating a JWT token
        const authToken = jwt.sign(payloadData, process.env.JWT_SECRET!);

        return res.status(201).json({
            status: true,
            message: "User created successfully",
            user_id,
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
