const express = require("express");
const cors = require("cors");
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";


import config from "../config";
// import express from 'express'
const app = express();
const port = 3333;

// Rotas
import userRoute from './routes/UserRoute'
import AnimalRoute from './routes/AnimalRoute'
import DonationBank from './routes/DonationBank'
import DonationProductRoute from './routes/ProductRoute'
import Donations from './routes/Donation'
import FaqRoute from './routes/FaqRoute'


dotenv.config();
const mongodbURL = config.MONGODB_URL;


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
    useFindAndModify: false,
  })
  .then(() => app.emit("pronto"))
  .catch((error) => console.log(error.reason));

app.use('/user/api/createUserAdm',userRoute)
app.use('/user/api',userRoute)
app.use('/animal/api',AnimalRoute)
app.use('/donation/api',DonationBank)
app.use('/donationProduct/api',DonationProductRoute)
app.use('/donationsAll/api',Donations)
app.use('/faq/api',FaqRoute )

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'tmp','uploads'))) 


app.on("pronto", () => {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});
