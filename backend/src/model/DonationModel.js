import mongoose from 'mongoose'

// import bcrypt from "bcrypt";

/*
- [ ]  Tipo de doação
- [ ]  Banco
- [ ]  Tipo de conta
- [ ]  Agência
- [ ]  CPF da conta destino
- [ ]  Tipo de Pessoa
- [ ]  Conta
- [ ]  Nome do recebedor
*/
const DonationSchema=new mongoose.Schema({
    donationType: { type: String, required: true},
    bank: { type: String, required: true },
    agency:{type:String,required:true},
    countBank:{type:Number,required:true},
    receiverName:{type:String,required:true},
    desc:{type:String}
})

const DonationModel=mongoose.model("Donation",DonationSchema)


export default DonationModel