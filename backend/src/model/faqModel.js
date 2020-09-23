import mongoose from 'mongoose'

const FaqSchema=new mongoose.Schema({
    theme: { type: String, required: true},
    question: { type: String, required: true },
    answer:{type:String,required:true},
})

const FaqModel=mongoose.model("Faq",FaqSchema)


export default FaqModel