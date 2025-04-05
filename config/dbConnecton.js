import express from  'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();
const dbConnection = async()=>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected with database🟢")
    } catch (error) {
        console.log(error.message)
        throw new Error(error)
    }
}
export default dbConnection