// userController.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import cloudinary from '../config/cloudinary.js';
import jwt from 'jsonwebtoken'

const createToken = async (id)=>{
  return jwt.sign({
    id:id,

  })
}
const signup = async (req, res) => {
  try {
    const { password, email, channelName, phone } = req.body;
    
    // Validate required fields
    if (!password || !email || !channelName || !phone || !req.files?.logoUrl) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }

    // Upload image to Cloudinary
    const uploadImage = await cloudinary.uploader.upload(
      req.files.logoUrl.tempFilePath,
      { folder: 'user-profiles' } // Better organization in Cloudinary
    );

    // Hash password
    const hashcode = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new userModel({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashcode,
      channelName,
      phone,
      logoUrl: uploadImage.secure_url,
      logoId: uploadImage.public_id,
    });

    const user = await newUser.save();
    
    // Omit sensitive data from response
    // const userResponse = user.toObject();
    // delete userResponse.password;
    
    res.status(201).json({
      success: true,
      user: userResponse
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Internal server error'
    });
  }
}

const login = async (req, res) => {
  try {
    // Implement your login logic here
    // ...
    const {email,password} = req.body;

    const existingUser = await userModel.findOne({email});
    if(!existingUser){
      return res.status(404).json({
        success:true,
        message:"User not found"
      })
    }
    const isValid = await bcrypt.compare(password,existingUser.password);
    if(!isValid){
      return res.status(404).json({
        success:true,
        message:"Invalid credentials"
      })
    }
    const token = jwt.sign({
        id:existingUser._id,
        channelName:existingUser.channelName,
        email:existingUser.email,
        phone:existingUser.email,
        phone:existingUser.phone,
        logoId:existingUser.logoId
        
      },process.env.JWT_SECRET,{expiresIn:"10d"})
    


    res.status(200).json({
       success: true ,
       id:existingUser._id,
        channelName:existingUser.channelName,
        email:existingUser.email,
        phone:existingUser.email,
        phone:existingUser.phone,
        logoId:existingUser.logoId,
        logoUrl:existingUser.logoUrl,
        token:token,
        subscribedChannelIs:existingUser.subscribedChannelIs
      
      });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Internal server error'
    });
  }
}

export { signup, login };