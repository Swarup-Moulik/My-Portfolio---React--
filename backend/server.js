import express from "express";
import cors from "cors";
import 'dotenv/config';

import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import userDataRouter from "./routes/userDataRoute.js";
import portRouter from "./routes/portfolioRoutes.js";
import contactRouter from "./routes/contactRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middleware
/*app.use(cors({
  origin: "https://my-portfolio-react-frontend.vercel.app",
  credentials: true
}));*/
app.use(cors());
app.use(express.json());

// API Endpoints
app.use('/api/user', express.urlencoded({ extended: true }), userRouter);
app.use('/api/portfolio', userDataRouter);
app.use('/api/edit', portRouter);
app.use('/api/contact', contactRouter)
//Health check route
app.get('/', (req, res) => {
    res.send("API is running !");
});

//Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
