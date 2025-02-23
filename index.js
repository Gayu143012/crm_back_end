import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import connectDB from './Database/dbConfig.js';
import authRoutes from './routes/auth.routes.js';
import reportRoutes from './routes/report.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import customerRoutes from './routes/customer.routes.js';
import contactRoutes from './routes/contact.routes.js';
import communicationRoutes from './routes/communication.routes.js';
import userRoutes from './routes/user.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import userDashboardRoutes from './routes/userDashboard.routes.js';
import followUpRoutes from './routes/followUp.routes.js';


const app = express();

// middleware
app.use(express.json());
app.use(cors({
    origin: config.clientUrl || 'https://crmfep.netlify.app',
    credentials: true
}));

// db connection
connectDB();

// routes
app.get("/", (req, res) => {
    res.send("Welcome to the Customer Relationship System");
});

app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/communication", communicationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/followup", followUpRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/userdashboard", userDashboardRoutes);
// listen
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});