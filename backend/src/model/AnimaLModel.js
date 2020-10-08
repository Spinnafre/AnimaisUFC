import mongoose from 'mongoose'
// import bcrypt from "bcrypt";

/*
Foto - String
Nome - String
Categoria - String
Idade - Number
Espécie - String
Porte - 
Raça
Contato do responsável
Descrição
*/
const AnimalSchema=new mongoose.Schema({
    image: { type: String, required: true},
    name: { type: String, required: true },
    sex:{type: String, required: true},
    category:{type:String,required:true},
    age:{type:Number,required:true},
    species:{type:String,required:true},
    port:{type:String,required:true},
    breed:{type:String,required:true},
    telephone:{type:Number,required:true},
    desc:{type:String,required:true}

})

const AnimalModel=mongoose.model("Animal",AnimalSchema)


export default AnimalModel