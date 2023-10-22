import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import express from "express";
var bodyParser = require("body-parser");
const cors = require("cors");
var path = require("path");

import { connectDB } from "./database/connection";
const notFoundMiddleware = require("./middleware/not-found");

import UserRouter from "./routes/user";
import AdminRouter from "./routes/admin";
import PdfRouter from "./routes/pdf";
import CollectionRouter from "./routes/collection";
import MessageRouter from './routes/message';

const app = express();
const port = 5432;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  // Enable CORS for multiple origins
  cors({
    origin: ["http://localhost:3000", "https://frontend-pagetalk.vercel.app"],
  })
);

// Static Files directory
app.use(express.static("./public"));

// Head request at '/' route for UptimeRobot to keep the backend running and prevent inactivity
app.head("/", (req, res) => {
  return res.status(200).end();
});

// Project Description HTML Page at GET Request on '/'
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.resolve("public/welcome.html"));
});

// Routes
app.use("/user", UserRouter);
app.use("/admin", AdminRouter);
app.use("/pdf", PdfRouter);
app.use("/collection", CollectionRouter);
app.use("/message", MessageRouter);

app.use(notFoundMiddleware);

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
