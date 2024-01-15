import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js'
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoute from './routes/productRoute.js'
//env setup
dotenv.config()
    //express loader
const app = express();
//mongo
connectDB()
    //middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//routes
app.use("/api/v1/auth", authRoutes)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)
    //rest api
app.get("/", (req, res) => {
        res.send("hello")
    })
    //port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('====================================');
    console.log(`server runnig on http://localhost:${PORT}`);
    console.log('====================================');
})