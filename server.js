import express from 'express';
import dbConnection from './config/dbConnecton.js'
import userRouter from './routes/userRoutes.js'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import videoRouter from './routes/videoRoutes.js'
const app = express();
//config
dotenv.config();
app.use(express.json())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/temp/'
}))
dbConnection();
//api end point
app.use('/api/v1/user',userRouter);

app.use('/api/v1/video',videoRouter)

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
    
})