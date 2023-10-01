import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import express from "express";
var bodyParser = require("body-parser");
import { MongoClient, ServerApiVersion } from "mongodb";
import { Request, Response } from "express";

import { user } from "./models/user";

import { connectDB } from "./database/connection";

import UserRouter from "./routes/user";
import AdminRouter from "./routes/admin";
import QueryRouter from "./routes/query";
import PdfRouter from "./routes/pdf";
import CollectionRouter from "./routes/collection";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Files directory
app.use(express.static("./public"));

// Routes

// clean routes (ex. api/v1/{user}/pdf and then upload etc.)
// app.use("/api/v1/user", UserRouter);
// app.use("/api/v1/admin", AdminRouter);
// app.use("/api/v1/queries", QueryRouter);
// app.use("/api/v1/pdf", PdfRouter);
// app.use("/api/v1/collection", CollectionRouter);

app.get("/api/v1/PageTalk", async (req: Request, res: Response) => {
    const User = await user.create({
        user_id: 1,
        username: "test",
        first_name: "test",
        last_name: "test",
        role: "user",
        phone: 1234567890,
        email: "test@gmail.com",
        isVerified: true,
        password: "test",
        user_metadata: {
            created_at: new Date(),
            updated_at: new Date(),
        },
        last_login: new Date(),
    });
    res.status(200).json({ message: "success", data: User });
});

const client = new MongoClient(process.env.MONGO_URI!, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// Starting Server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI!);
        console.log("Successfully connected to MongoDB!");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
