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

const allowedOrigins = [
  "https://unique-daifuku-953a72.netlify.app/login",
  "http://localhost:5173" // Allow local testing
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"], 
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
