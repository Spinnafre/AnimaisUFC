import express from "express";
import * as yup from "yup";

import { getToken, isAdm, isAuth } from "../../utils";
import Donation from "../model/DonationModel";
import DonationProd from "../model/DonationProduct";

const router = express.Router();

router.get("/search", async (req, res) => {
  // const category = req.query.category ? { category: req.query.category } : {};
  try {
    if(req.query.searchName !=={}){
      const searchName = req.query.searchName && {
        donationType: {
          $regex: req.query.searchName,
          $options: "i",
        },
      };
  
      const donations = await Donation.find({ ...searchName }) ;
      const donationsProd = await DonationProd.find({ ...searchName });
      
      const don = [...(donations || {}), ...(donationsProd || {})];
      if (don.length !==0) {
        return res.status(200).send(don);
      } 
  
      const searchTypeBank = req.query.searchName && {
        bank: {
          $regex: req.query.searchName,
          $options: "i",
        },
      };
      const searchTypeProd = req.query.searchName && {
        neighborhood: {
          $regex: req.query.searchName,
          $options: "i",
        },
      };
  
      const donationsB = await Donation.find({ ...searchTypeBank }) ;
      const donationsProduct = await DonationProd.find({ ...searchTypeProd });
      const donationsName = [...(donationsB || {}), ...(donationsProduct|| {})];
      if (donationsName.length !==0) {
        return res.status(200).send(donationsName);
      } 
  
      const allBank = await Donation.find({});
      const allProd = await DonationProd.find({});
  
      const donationsAll = [...(allBank || {}), ...(allProd|| {})];
      return res.status(200).send(donationsAll);
    }else{
      const allBankNoSearch = await Donation.find({});
      const allProdNoSearch = await DonationProd.find({});
  
      const donationsNoSearch = [...(allBankNoSearch || {}), ...(allProdNoSearch|| {})];
      return res.status(200).send(donationsNoSearch);
    }

  } catch (error) {
    return res.status(400).send({ error: "Ocorreu problemas na " });
  }
});

router.get("/", async (req, res) => {
  try {
    const donation = await Donation.find({});
    const donationProd = await DonationProd.find({});
    if (donation) {
      return res
        .status(200)
        .send({
          message: `Conseguir pegar todos as doações`,
          data: [...donation, ...donationProd],
        });
    } else {
      return res
        .status(200)
        .send({ message: `Lamento mas não consegui pegar os doações` });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
