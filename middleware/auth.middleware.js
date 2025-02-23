import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers["x-auth-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(401).send({ message: "Unauthorized!" });
        }
        console.log('Token verified, user ID:', decoded.user.id);
        req.userId = decoded.user.id;
        next();
    });
}

export const verifyAdminRegistration = (req, res, next) => {
    if (req.body.role === 'admin') {
      // Check for a secret admin registration code
      if (req.body.adminCode !== process.env.ADMIN_REGISTRATION_CODE) {
        return res.status(403).json({ message: "Invalid admin registration code" });
      }
    }
    next();
  };