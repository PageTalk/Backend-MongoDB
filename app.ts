import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import express from "express";
import mysql from "mysql2";
var bodyParser = require("body-parser");

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
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/admin", AdminRouter);
app.use("/api/v1/queries", QueryRouter);
app.use("/api/v1/pdf", PdfRouter);
app.use("/api/v1/collection", CollectionRouter);

// Starting Server
const start = async () => {
    try {
        const connection = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            port: 3306,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
        });
        await connection.connect((err) => {
            if (err) {
                console.error("Error connecting to MySQL:", err);
                return;
            }
            console.log("Connected to MySQL!");
        });
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
