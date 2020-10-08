import express from "express";
import * as yup from "yup";

import { getToken, isAdm, isAuth } from "../../utils";
import Faq from "../model/faqModel";

const router = express.Router();
// Pesquisar FAQ
router.get("/searchFAQ", async (req, res) => {
  // const category = req.query.category ? { category: req.query.category } : {};
  if (req.query.searchTheme !== {}) {
    const Theme = req.query.searchTheme && {
      theme: {
        $regex: req.query.searchTheme,
        $options: "i",
      },
    };
    const faq = await Faq.find({ ...Theme });
    if (faq.length !== 0) {
      return res.status(200).send(faq);
    }
    const searchQuestion = req.query.searchTheme && {
      question: {
        $regex: req.query.searchTheme,
        $options: "i",
      },
    };

    const faqQuestion = await Faq.find({ ...searchQuestion });
    if (faqQuestion.length !== 0) {
      return res.status(200).send(faqQuestion);
    }
    const all = await Faq.find({});
    return res.status(200).send(all);
  }
  else{
    const noSearchTheme=await Faq.find({});
    return res.status(200).send(noSearchTheme);
  }
});

// Pegar uma doação
router.get("/:id", async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (faq) {
      return res
        .status(200)
        .send({ message: `Conseguir pegar as FAQ`, data: faq });
    } else {
      return res
        .status(200)
        .send({ message: `Lamento mas não consegui pegar os dados da a FAQ` });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Pegar todos as doações
router.get("/", async (req, res) => {
  try {
    const faq = await Faq.find({});
    if (faq) {
      return res
        .status(200)
        .send({ message: `Conseguir pegar todos as FAQ's`, data: faq });
    } else {
      return res
        .status(200)
        .send({ message: `Lamento mas não consegui pegar as FAQ's` });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Criar Doações
router.post("/create", isAuth, isAdm, async (req, res) => {
  try {
    // Validação
    const schema = yup.object().shape({
      theme: yup.string().required(),
      question: yup.string().required(),
      answer: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).send({ message: "Falha na validação" });
    }

    const faq = new Faq({
      theme: req.body.theme,
      question: req.body.question,
      answer: req.body.answer,
    });

    const newFaq = await faq.save();
    if (newFaq) {
      return res.status(200).send({
        _id: newFaq._id,
        theme: newFaq.theme,
        question: newFaq.question,
        answer: newFaq.answer,
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
router.put("/put/:id", isAuth, isAdm, async (req, res) => {
  const FaqId = req.params.id;
  const faq = await Faq.findById(FaqId);
  if (faq) {
    faq.theme = req.body.theme;
    faq.question = req.body.question;
    faq.answer = req.body.answer;

    const newFaq = await faq.save();
    if (newFaq) {
      return res
        .status(200)
        .send({ message: "FAQ Atualizado com sucesso", data: newFaq });
    }
  }
  return res.status(500).send({ message: "Falha ao Atualizar o FAQ" });
});
// Deletar Animal
router.delete("/delete/:id", isAuth, isAdm, async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (faq) {
      await faq.remove();
      return res.status(200).send({
        message: `A faq com o id: ${faq._id} foi deletado`,
        data: faq,
      });
    } else {
      return res.status(200).send({ message: `Nenhum FAQ encontrado` });
    }
    // const newUser = await animais.save();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
