import express from "express";
import * as yup from "yup";

import { getToken, isAdm, isAuth } from "../../utils";
import Donation from "../model/DonationModel";
import DonationProd from '../model/DonationProduct'

const router = express.Router();

// Pesquisar Doações por Nome e Tipo
router.get("/search", async (req, res) => {
  // const category = req.query.category ? { category: req.query.category } : {};
  try {
    const searchName = req.query.searchName
      ? {
          bank: {
            $regex: req.query.searchName,
            $options: "i",
          },
        }
      : {};

    const searchType = req.query.searchType
      ? {
          donationType: {
            $regex: req.query.searchType,
            $options: "i",
          },
        }
      : {};

    const donations = await Donation.find({ ...searchType, ...searchName });
    if(donations.data){
      return res.status(200).send(donations);
    }
    else{
      return res.status(400).send({message:"Não consegui pegar as doções"})
    }
  } catch (error) {
    return res.status(400).send({ error: "Ocorreu problemas na " });
  }
});
// Pegar uma doação
router.get("/:id", async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (donation) {
      return res
        .status(200)
        .send({ message: `Conseguir pegar o doação`, data: donation });
    } else {
      return res
        .status(200)
        .send({ message: `Lamento mas não consegui pegar os dados da doação` });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Pegar todos as doações
router.get("/", async (req, res) => {
  try {
    const donation = await Donation.find({});
    if (donation) {
      return res
        .status(200)
        .send({ message: `Conseguir pegar todos as doações`, data: donation });
    } else {
      return res
        .status(200)
        .send({ message: `Lamento mas não consegui pegar os doações` });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Criar Doações
router.post("/create", isAuth,isAdm, async (req, res) => {
  try {
    // Validação
    const schema = yup.object().shape({
      donationType: yup.string().required(),
      bank: yup.string().required(),
      agency: yup.string().required(),
      countBank: yup.number().required().positive().integer(),
      receiverName: yup.string().required(),
      desc: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .send({ message: "Não foi possível criar a doação" });
    }

    const donation = new Donation({
      donationType: req.body.donationType,
      bank: req.body.bank,
      agency: req.body.agency,
      countBank: req.body.countBank,
      receiverName: req.body.receiverName,
    });

    const newDonation = await donation.save();
    if (newDonation) {
      return res.status(200).send({
        _id: newDonation._id,
        donationType: newDonation.donationType,
        bank: newDonation.bank,
        agency: newDonation.agency,
        countBank: newDonation.countBank,
        receiverName: newDonation.receiverName,
      });
    } else {
      return res
        .status(401)
        .send({ mensage: "Alguns dados informados estão errados" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Atualizar Animal
router.put("/put/:id", isAuth,isAdm, async (req, res) => {
  const DonationId = req.params.id;
  const donation = await Donation.findById(DonationId);
  if (donation) {
    donation.donationType = req.body.donationType;
    donation.bank = req.body.bank;
    donation.agency = req.body.agency;
    donation.countBank = req.body.countBank;
    donation.receiverName = req.body.receiverName;
    donation.desc = req.body.desc;

    const newDonation = await donation.save();
    if (newDonation) {
      return res
        .status(200)
        .send({ message: "Doação Atualizada com sucesso", data: newDonation });
    }
  }
  return res.status(500).send({ message: "Falha ao Atualizar produto" });
});
// Deletar Animal
router.delete("/delete/:id", isAuth,isAdm, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (donation) {
      await donation.remove();
      return res.status(200).send({
        message: `A donation com o id: ${donation._id} foi deletado`,
        data: donation,
      });
    } else {
      return res.status(200).send({ message: `Nenhuma doação encontrada` });
    }
    // const newUser = await animais.save();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
