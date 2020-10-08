import mongoose from 'mongoose'

// import bcrypt from "bcrypt";

/*
- [ ]  Tipo de doação
- [ ]  Bairro
- [ ]  Rua
- [ ]  Complemento
- [ ]  Telefone
- [ ]  Número
- [ ]  Ref
*/
const ProductSchema=new mongoose.Schema({
    donationType: { type: String, required: true},
    name: { type: String, required: true},
    neighborhood: { type: String, required: true },
    street:{type:String,required:true},
    complement:{type:String,required:true},
    telephone:{type:String,required:true},
    number:{type:Number,required:true},
    ref:{type:String,required:true},
})

const DonationProduct=mongoose.model("DonationProduct",ProductSchema)


export default DonationProduct