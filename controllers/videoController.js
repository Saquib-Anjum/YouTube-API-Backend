import mongoose from 'mongoose';
import express from 'express'
import cloudinary from '../config/cloudinary.js'
import videoModel from '../models/videoModel.js'
const uploadVideo = async (req , res )=>{
try{
 const{title ,description , category,tags } = req.body;

 if(! req.files||!req.files.video ||!req.files.thumbnail){
    return res.status(500).json({
        success:false,
        message:"Upload your file please"
    })
 }
 const videoUpload = await cloudinary.uploader.upload(req.files.video.tempFilePath,{
    resource_type:"video",
    folder:"videos"
 })
 const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath,{
    resource_type:"image",
    folder:"thumbnails"
 })
 const newVideo = new videoModel({
    _id: new mongoose.Types.ObjectId(),
    title,
    description,
    user_id: req.user._id,
    videoUrl: videoUpload.secure_url,
    videoId: videoUpload.public_id,
    thumbnailUrl: thumbnailUpload.secure_url,
    thumbnailId: thumbnailUpload.public_id,
    category,
    tags: tags ? tags.split(",") : [],
 })
 await newVideo.save();
 res.status(201).json({
    success:true,
    message:"video uploaded successfully"
 })
}catch(err){
    console.log(err);
    res.status(500).json({
        success:false,
        message:err.message
    })
}
}
const updateVideo = async (req , res )=>{
//here we will change video title description 
    try{
const {title , description ,category} = req.body;

const videoId =  req.params.id;

let video= await
//find video from data base 
}catch(err){
    console.log(err);
    res.json({
        success:false,
        message:err.message
    })
}
}
export {uploadVideo ,updateVideo};