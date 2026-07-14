import express from 'express';
import cors from 'cors';
import 'dotenv/config';
//import path from 'path';
//import { fileURLToPath } from 'url';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user_Route.js';
import productRouter from './routes/productRoute.js';
import uploadRouter from './routes/uploadRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import adminRouter from "./routes/adminRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();


// Middlewares
app.use(express.json());
//app.use(express.urlencoded({ extended: true })); // Add this line
app.use(cors());

// API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use("/api/admin", adminRouter)

app.get('/', (req, res) => {
    res.send("API working ");
});

// Start server
app.listen(port, () => console.log(' Server started on PORT:' + port));




