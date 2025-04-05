import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    channelName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    logoUrl:{
        type:String,
        required:true
    },
    logoId:{
        type:String,
        required:true,
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribedChannelIs:[{
        type:mongoose.Schema.Types.ObjectId , ref:"user"
    }]

},{timestamps:true})
const userModel = mongoose.model("user",userSchema);
export default userModel