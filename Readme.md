# CRM (Customer Relationship Management) System - Backend Documentation

1. Introduction
This CRM system is designed for a textile shop to manage customer relationships, track communications, and analyze sales data. It provides features for customer management, feedback collection, and reporting.

2. Base URL
The base URL for all API endpoints is: http://localhost:5000/api

2.1 the admin registration code is: 123456

3. Authentication
The system uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header for protected routes.

4. API Endpoints
4.1. Auth
POST /auth/register - Register a new user
POST /auth/login - Login and receive a token
GET /auth/user - Get current user information

4.2. Customers
GET /customer - Get all customers
GET /customer/:id - Get a specific customer
POST /customer - Create a new customer
PUT /customer/:id - Update a customer
DELETE /customer/:id - Delete a customer

4.3. Contacts
GET /contact - Get all contacts
GET /contact/user - Get user contacts
GET /contact/:id - Get a specific contact
POST /contact - Create a new contact
PUT /contact/:id - Update a contact
DELETE /contact/:id - Delete a contact

4.4. Communications
GET /communication - Get all communications
POST /communication - Create a new communication
PUT /communication/:id - Update a communication
DELETE /communication/:id - Delete a communication
GET /communication/customer/:customerId - Get communications for a specific customer

4.5. Feedback
GET /feedback - Get all feedback
POST /feedback - Submit new feedback
GET /feedback/customer/:customerId - Get feedback for a specific customer

4.6. Reports
GET /report/sales - Get sales report
GET /report/conversion-rates - Get conversion rates
GET /report/admin - Get admin reports
GET /report/sales-over-time - Get sales over time
GET /report/textile-specific - Get textile-specific report
GET /report/monthly-performance - Get monthly performance report

4.7. Dashboard
GET /dashboard/user - Get user dashboard data
GET /dashboard/populartextilechoices - Get popular textile choices
GET /dashboard/followupactions - Get follow-up actions
GET /dashboard/tasksdue - Get tasks due
GET /dashboard/totalcustomers - Get total customers count
GET /dashboard/newcustomersthismonth - Get new customers this month
GET /dashboard/topspendingcustomer - Get top spending customer
4.8. Follow-up
POST /followup/send - Send follow-up action

5. Data Models
5.1. User
name: string
email: string
username: string
password: string
role: enum['user', 'admin']

5.2. Customer
const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: String,
  address: String,
  preferences: {
    fabricTypes: [String],
    colors: [String],
    designs: [String],
    patterns: [String],
    seasons: [String],
    occasions: [String],
  },
  purchaseHistory: [
    {
      date: Date,
      items: [
        {
          name: String,
          quantity: Number,
          price: Number,
        },
      ],
      total: Number,
    },
  ],
  source: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },

  source: String,
status: String,
followUpActions: [{
  type: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true }
}],

});

5.3. Communication
customerId: ref to Customer
type: string
date: Date
content: string
createdBy: ref to User

5.4. Feedback
customerId: ref to Customer
rating: number
comment: string

5.5. Task
dueDate: Date
description: string

5.6. Order
total: number
items: array of { name: string, quantity: number, price: number }

6. Controllers
The backend uses various controllers to handle different functionalities:
authController: Handles user registration, login, and user retrieval
customerController: Manages CRUD operations for customers
contactController: Handles contact-related operations
communicationController: Manages communication records
feedbackController: Handles feedback submission and retrieval
reportController: Generates various reports
dashboardController: Provides data for user and admin dashboards
followUpController: Manages follow-up actions

7. Middleware
The backend uses middleware for authentication and authorization:
auth.middleware.js: Verifies JWT tokens
adminMiddleware.js: Checks if the user is an admin

8. Configuration
The backend configuration is stored in the config.js file:
const config = {
    port: process.env.PORT || 5000,
    mongodbUrl: process.env.MONGODB_URL,
    jwtSecret: process.env.JWT_SECRET,
    emailId: process.env.EMAIL_ID,
    emailPass: process.env.EMAIL_PASS,
    clientUrl: process.env.CLIENT_URL
};

9. Database Connection
The backend uses MongoDB for data storage. The connection is established in the dbConfig.js file.

10. Error Handling
The backend implements error handling in each controller to catch and respond to errors appropriately.

11. Security
Passwords are hashed before storing in the database
JWT is used for authentication
Role-based access control is implemented for admin routes



