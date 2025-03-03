import jwt from "jsonwebtoken";
import config from "../config/config.js";

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
        if (!req.body.adminCode || req.body.adminCode !== process.env.ADMIN_REGISTRATION_CODE) {
            return res.status(403).json({ message: "Invalid admin registration code" });
        }
    }
    next();
};
