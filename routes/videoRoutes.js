import express from 'express';
import {uploadVideo , updateVideo,deleteVideo,getAllVideo,getVideoById,getVideoByCategory, getVideoByTags,liked,disLiked,myVideos} from '../controllers/videoController.js'
import auth from '../middlewares/auth.js'
const videoRouter = express.Router();

videoRouter.post('/upload',auth,uploadVideo);
//update video
videoRouter.put('/update/:id',auth,updateVideo)
//deleteVideo
videoRouter.delete('/delete/:id',auth,deleteVideo)
//get all video 
videoRouter.get('/all',auth,getAllVideo);
//get video by Id
videoRouter.get('/:id',auth , getVideoById)
//get video by category
videoRouter.get('/category/:category',auth , getVideoByCategory)
//get video by Tags
videoRouter.get('/tags/:tag',auth , getVideoByTags)

//videoLike by user
videoRouter.post('/like',auth,liked)

//video disLike by user
videoRouter.post('/like',auth,disLiked)

//my all videos

videoRouter.get('/my-videos',auth,myVideos)


export default videoRouter