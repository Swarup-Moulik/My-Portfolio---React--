import express from "express";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';

import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import userDataRouter from "./routes/userDataRoute.js";
import portRouter from "./routes/portfolioRoutes.js";

// Required for ESM to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints
app.use('/api/user', express.urlencoded({ extended: true }), userRouter);
app.use('/api/portfolio', userDataRouter);
app.use('/api/edit', portRouter);

// Serve static files from React dist folder (Vite build output)
const frontendPath = path.join(__dirname, 'client', 'dist'); // adjust path if different
app.use(express.static(frontendPath));

//Health check route
app.get('/', (req, res) => {
    res.send("API is running !");
});

// Fallback for all other routes (React SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

//Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
