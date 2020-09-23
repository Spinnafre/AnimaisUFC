import express from "express";
import * as yup from "yup";

import { getToken, isAdm, isAuth } from "../../utils";
import Donation from "../model/DonationProduct";

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
    return res.status(200).send(donations);
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
      neighborhood: yup.string().required(),
      name: yup.string().required(),
      street: yup.string().required(),
      complement: yup.string().required(),
      telephone: yup.string().required(),
      number: yup.number().required().positive().integer(),
      ref: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .send({ message: "Não foi possível criar a doação de produtos" });
    }

    const donation = new Donation({
      donationType: req.body.donationType,
      name:req.body.name,
      neighborhood: req.body.neighborhood,
      street: req.body.street,
      complement: req.body.complement,
      telephone: req.body.telephone,
      number: req.body.number,
      ref: req.body.ref,
    });

    const newDonation = await donation.save();
    if (newDonation) {
      return res
        .status(200)
        .send({
          data: {
            _id: newDonation._id,
            name:newDonation.name,
            donationType: newDonation.donationType,
            neighborhood: newDonation.neighborhood,
            street: newDonation.street,
            complement: newDonation.complement,
            telephone: newDonation.telephone,
            number: newDonation.number,
            ref: newDonation.ref,
          },
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
    donation.name = req.body.name;
    donation.neighborhood = req.body.neighborhood;
    donation.street = req.body.street;
    donation.complement = req.body.complement;
    donation.telephone = req.body.telephone;
    donation.number = req.body.number;
    donation.ref = req.body.ref;

    const newDonation = await donation.save();
    if (newDonation) {
      return res
        .status(200)
        .send({
          message: "Doação de Produtos Atualizada com sucesso",
          data: newDonation,
        });
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
        message: `A donation de produtos com o id: ${donation._id} foi deletado`,
        data: donation,
      });
    } else {
      return res
        .status(200)
        .send({ message: `Nenhuma doação de produtos encontrada` });
    }
    // const newUser = await animais.save();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
