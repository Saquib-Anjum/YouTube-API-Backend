import express from 'express';
import dbConnection from './config/dbConnecton.js'
import userRouter from './routes/userRoutes.js'
import dotenv from 'dotenv'
const app = express();
//config
dotenv.config();
app.use(express.json())
dbConnection();
//api end point
app.use('/api/v1/user',userRouter)
const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
    
})