

import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const verifyToken = (req, res, next) => {
    let token = req.header("Authorization") || req.header("x-auth-token"); // ✅ Check both headers

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    // Remove "Bearer " prefix if it exists
    if (token.startsWith("Bearer ")) {
        token = token.slice(7);
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.status(401).json({ message: "Unauthorized!" });
        }

        console.log("Token verified, user ID:", decoded.user.id);
        req.userId = decoded.user.id;
        req.userRole = decoded.user.role; // ✅ Store user role for access control
        next();
    });
};

export const verifyAdminRegistration = (req, res, next) => {
    if (req.body.role === "admin") {
        console.log("Admin Registration Attempt. Admin Code Provided:", req.body.adminCode);
        console.log("Expected Admin Code:", process.env.ADMIN_REGISTRATION_CODE);

        if (!req.body.adminCode) {
            return res.status(400).json({ message: "Admin code is required for admin registration" });
        }

        if (req.body.adminCode !== process.env.ADMIN_REGISTRATION_CODE) {
            return res.status(403).json({ message: "Invalid admin registration code" });
        }
    }
    next();
};

