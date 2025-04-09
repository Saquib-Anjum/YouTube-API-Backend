import express from 'express';
import {uploadVideo , updateVideo} from '../controllers/videoController.js'
import auth from '../middlewares/auth.js'
const videoRouter = express.Router();

videoRouter.post('/upload',auth,uploadVideo);

videoRouter.put('/update',auth,updateVideo)

export default videoRouter