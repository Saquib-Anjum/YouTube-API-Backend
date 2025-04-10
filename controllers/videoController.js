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
//here we will update all videos
const updateVideo = async (req , res )=>{
//here we will change video title description 
    try{
const {title , description ,category,tags} = req.body;

const videoId =  req.params.id;

let video= await videoModel.findOne({ _id: req.params.id });

if(req.files && req.files.thumbnail){
    await cloudinary.uploader.destroy(video.thumbnailId);
    const thumbnailUpload = await cloudinary.uploader.upload(
        req.files.thumbnail,{
            tempFilePath,
            folder:"thumbnails"}
    )

    video.thumbnailUrl = thumbnailUpload.secure_url;
    video.thumbnailId = thumbnailUpload.public_id
}
video.title = title || video.title;
video.description = description || video.description;
video.category = category || video.category;
video.tags = tags || video.tags;

await video.save();

//sending request
res.status(201).json({
    success:true,
    message:"update video details "
})

//find video from data base 
}catch(err){
    console.log(err);
    res.json({
        success:false,
        message:err.message
    })
}
}
const deleteVideo = async(req , res)=>{
try{
const videoId = req.params.id;

let video = await videoModel.findOne(videoId);

if(!video){
    return res.status(404).json({error:"Video not found!"})
}
//delete video from cloudinary
await cloudinary.uploader.destroy(video.videoId,{resource_type:"video"});
await cloudinary.uploader.destroy(video.thumbnailId);
await videoModel.findByIdAndDelete(videoId);
res.status(200).json({
    success:true,
    message:"video deleted successfully"
})
}catch(err){
    console.log(err);
    res.status(500).json({
        success:true,
        message:err.message
    })
}
}
// get all video 

const getAllVideo = async (req , res )=>{
try{
const video = await videoModel.find({});
res.status(200).json({
    success:true,
    message:"Here is all videos",
    video
})
}catch(err){
    console.log(err);
    res.status(500).json({
        success:true,
        message:err.message
    }) 
}
}
//get video by Id 
const getVideoById = async (req , res)=>{
    try{

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:true,
            message:err.message
        }) 
    }
}
//get video by category
const getVideoByCategory = async(req , res)=>{
    try{

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:true,
            message:err.message
        }) 
    }
}
//get video by tags
const getVideoByTags = async (req , res)=>{
    try{

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:true,
            message:err.message
        }) 
    }
}
//get all liked video
const liked = async(req,res)=>{
    try{

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:true,
            message:err.message
        }) 
    }
}

//get all disLiked video
const disLiked = async(req,res)=>{
    try{

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:true,
            message:err.message
        }) 
    }
}
//get my video
const myVideos=  async (req , res )=>{
    try{

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:true,
            message:err.message
        }) 
    }
}
export {uploadVideo ,updateVideo,deleteVideo, getAllVideo,getVideoById,getVideoByCategory, getVideoByTags,liked ,disLiked,myVideos};