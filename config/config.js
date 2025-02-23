import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT || 5000,
    mongodbUrl: process.env.MONGODB_URL,
    jwtSecret: process.env.JWT_SECRET,
    emailId: process.env.EMAIL_ID,
    emailPass: process.env.EMAIL_PASS,
    clientUrl: process.env.CLIENT_URL
};

export default config;