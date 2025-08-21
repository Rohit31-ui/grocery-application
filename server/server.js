import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config'; 
//route imports 
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoutes.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
//controller
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();
//port no
const port = process.env.PORT || 4000;

//for database connection
await connectDB()
//for cloudinary connection
await connectCloudinary()

//allowed origins
const allowedOrigins = ['http://localhost:5173','']

app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)

// middleware configauration
 app.use(express.json()); 
 app.use(cookieParser());
 app.use(cors({ origin: allowedOrigins, credentials: true }));

//routes configuration
app.get('/' ,(req,res)=>res.send("API Is Working"));
app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)

//app listen on port
app.listen(port,()=>{
    console.log(`Server is Running On http://localhost:${port}`)
})