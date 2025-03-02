import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';
import config from '../config/config.js';

export const register = async (req, res) => {
    try {
     const { name, email, password } = req.body;
     
     // Check if user already exists
     let user = await User.findOne({ email });
     if (user) {
         return res.status(400).json({ message: "User with this email already exists" });
     }
 
     // Create new user
     user = new User({
         name,
         email,
         password,
         role: req.body.role || 'user'
     });
 
     // Hash password
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(password, salt);
 
     // Save user to database
     await user.save();
 
     // Create and return JWT
     const payload = {
         user: {
             id: user.id,
             role: user.role
         }
     };
 
     jwt.sign(
         payload,
         config.jwtSecret,
         {
             expiresIn: 3600,
         },
         (err, token) => {
             if (err) throw err;
             res.status(200).json({ token });
         }
     );
    } catch (error) {
     console.error(error);
     if (error.name === 'ValidationError') {
       return res.status(400).json({ message: error.message });
     }
     res.status(500).json({ message: "Server error" });
    }
 };

export const login = async (req, res) => {
   try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    const payload = {
        user: {
            id: user.id,
            role: user.role
        }
    };

    jwt.sign(
        payload,
        config.jwtSecret,
        {
            expiresIn: 3600,
        },
        (err, token) => {
            if (err) throw err;
            res.status(200).json({ token, redirectTo: '/dashboard' });
        }
    );
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
   }
};

export const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };