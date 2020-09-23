import mongoose from 'mongoose'
import bcrypt from "bcrypt";

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true,index: true, dropDups:true},
    passwordResetToken:{type:String,select:false},
    passwordResetTokenExpires:{type:Date,select:false},
    password:{type:String,required:true},
    isADM:{type:Boolean,required:true,default:false}
})

userSchema.pre('save',async function(next){
    const hash=await bcrypt.hash(this.password,8)
    this.password=hash
    next()
})


const userModel=mongoose.model("User",userSchema)


export default userModel