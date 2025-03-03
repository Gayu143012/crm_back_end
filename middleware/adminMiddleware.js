import { User } from '../models/User.model.js';

export const isAdmin = async (req, res, next) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized! No user ID found." });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Requires Admin Role" });
        }

        next();  // User is admin, proceed to next middleware
    } catch (error) {
        console.error("Admin check error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
