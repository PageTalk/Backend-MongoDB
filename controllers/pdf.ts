import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import multer from "multer";
import * as admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
var path = require("path");
import jwt from "jsonwebtoken";

import { interaction } from "../models/interaction";
import { pdf } from "../models/pdf";
import { Token } from "../interfaces/token";
import { Role } from "../enums/role";

// Initialize Firebase
const serviceAccount = require("../page-talk-firebase-adminsdk-xfipa-265e33596f.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "page-talk.appspot.com",
});

function bytesToMegabytes(bytes: number): string {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(1) + " MB";
}

const storage = admin.storage();

export const uploadPDF = async (req: Request, res: Response) => {
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

        const upload = multer({
            storage: multer.memoryStorage(),
            limits: {
                fileSize: 10 * 1024 * 1024, // 10 MB limit
            },
        }).single("pdf"); // 'pdf' should be the field name in the form that you use to upload the file

        upload(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            const file = req.file;
            if (!file) {
                return res.status(400).json({
                    status: false,
                    message: "No file uploaded",
                });
            }
            const bucket = storage.bucket();
            const uniqueFilename = `${uuidv4()}_${file.originalname}`;
            const fileBlob = bucket.file(uniqueFilename);

            const blobStream = fileBlob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on("error", (error) => {
                console.error(error);
                return res
                    .status(500)
                    .json({ error: "Error uploading file to Firebase" });
            });

            blobStream.on("finish", async () => {
                const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileBlob.name}`;

                const expirationDate = new Date();
                // Set the expiration date to 60 days from the current date and time
                expirationDate.setDate(expirationDate.getDate() + 60);

                // Format the expiration date as an ISO 8601 string
                const formattedExpiration = expirationDate.toISOString();

                const [url] = await fileBlob.getSignedUrl({
                    action: "read",
                    expires: formattedExpiration, // Specify an expiration time for the URL
                });

                await pdf.create({
                    username,
                    url: fileUrl,
                    title: file.originalname,
                    downloadURL: url,
                    size: bytesToMegabytes(file.size),
                });

                interaction.create({
                    username,
                    interaction_type: "Upload PDF",
                    interaction_details: "PDF uploaded",
                });

                return res.status(201).json({
                    status: true,
                    message: "PDF uploaded successfully",
                    url: fileUrl,
                    downloadURL: url,
                });
            });

            blobStream.end(file.buffer);
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const retrievePDF = async (req: Request, res: Response) => {
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

        if (username !== (decodedToken as Token).username) {
            return res.status(403).json({
                status: false,
                message: "You are not authorized to perform this action",
            });
        }

        const pdfArray = await pdf.find({ username: username }).exec();

        interaction.create({
            username,
            interaction_type: "Get PDF",
            interaction_details: "PDF retrieved",
        });

        return res.status(200).json({
            status: true,
            message: "PDFs retrieved successfully",
            data: pdfArray,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

// TODO: CREATE A FORM FOR PDF UPLOADS
export const uploadForm = (req: Request, res: Response) => {
    res.sendFile(path.resolve("public/form.html"));
};
