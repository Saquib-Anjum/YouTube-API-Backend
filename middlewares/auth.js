import express from 'express';
import jwt from 'jsonwebtoken';
const auth = async (req ,res ,next)=>{
try{
    const {token} = req.headers;
    if(!token){
        res.status(401).json({
            success:false,
            message:"some thing went erong"
        })
    }
    const decoded_user = jwt.verify(token,process.env.JWT_SECRET);

    req.user = decoded_user;
    next()
}catch(err){
console.log(err);
res.json({
    success:false,
    message:err.message
})
}
}
export default auth