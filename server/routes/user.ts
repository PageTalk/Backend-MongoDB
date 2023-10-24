import express from "express";
const router = express.Router();

import {
    createUser,
    loginUser,
    getAllUsers,
    getUserByUsername,
    updateUser,
} from "../controllers/user";

import { createAdminUser } from "../testing/admin";

router.route("/get").get(getAllUsers); // Get all users in the db
router.route("/login").post(loginUser); //  login
router
    .route("/:username")
    .get(getUserByUsername) // Get user with that username
    .post(createUser) // Create user
    .patch(updateUser); // update user

router.route("/admin/create/:username").post(createAdminUser); // Create admin user
export default router;

// TODO: Add User routes
