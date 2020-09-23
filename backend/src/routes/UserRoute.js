import express from "express";
import * as yup from "yup";
import User from "../model/userModel";
import { getToken, isAdm, isAuth } from "../../utils";

import multer from "multer";
import MulterConfig from "../config/multer";
import FileController from "../controllers/FileController";

import jwt from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import crypto from "crypto";
import mailer from "../modules/nodemail";

const router = express.Router();
const uploads = multer(MulterConfig);

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res
        .status(200)
        .send({ message: `Conseguir pegar o usuário`, data: user });
    } else {
      return res
        .status(200)
        .send({ message: `Lamento mas não consegui pegar os dados` });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/forgot", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: `Usuário não encontrado` });
    }
    // Gerando um token aleatório
    const token = crypto.randomBytes(20).toString("hex");
    // Estou definindo o tempo de expiração de 1hr
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user._id, {
      $set: {
        passwordResetToken: token,
        passwordResetTokenExpires: now,
      },
    });

    mailer.sendMail(
      {
        from: email,
        to:"davispenha@gmail.com",
        template: "auth/forgot_password",
        subject: "Redefinição de senha",
        context: { token },
      },
      (err) => {
        if (err) {
          return res
            .status(400)
            .send({
              message: "Error em esqueci a minha senha, tente novamente!",
            });
        }
        return res.status(200).send({ message: "Email enviado" });
      }
    );
  } catch (error) {
    return res
      .status(400)
      .send({
        error: `Error em acessar a rota /forgot, descrição do error: ${error.message}`,
      });
  }
});
router.post("/create", async (req, res) => {
  try {
    // Validação
    const schema = yup.object().shape({
      email: yup.string().email(),
      password: yup.string().min(6),
      confirmPassword: yup
        .string()
        .when("password", (password, field) =>
          password ? field.required().oneOf([yup.ref("password")]) : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).send({ message: "Error na validação" });
    }

    // const password_hash = await bcrypt.hash(req.body.password, 8);

    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = await user.save();
    if (newUser) {
      return res.status(200).send({
        _id: newUser._id,
        email: newUser.email,
        password: newUser.password,
        isADM: newUser.isADM,
        token: getToken(newUser),
      });
    } else {
      return res.status(401).send({ message: "Email ou Senha incorretos" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/delete/:id", isAuth,isAdm, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      return res.status(200).send({
        message: `O usuário com o id: ${user._id} foi deletado`,
        data: user,
      });
    } else {
      return res.status(200).send({ message: `Nenhum usuário encontrado` });
    }
    // const newUser = await user.save();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).send({ error: "Error na validação" });
    }

    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res
        .status(401)
        .send({ error: "Provavelmente o email informado está errado" });
    }

    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) {
      return res.status(401).send({ error: "Senha digitada errada!" });
    }
    return res.status(200).send({
      _id: user._id,
      email: user.email,
      password: user.password,
      isADM: user.isADM,
      token: getToken(user),
    });
  } catch (error) {
    return res.status(400).send({
      error:
        "Lamento mas uma falha foi detectada, descrição: " + error.message,
    });
  }
});

router.post("/reset_password", async (req, res) => {
  const { email, token, password,confirmPassword } = req.body;

  
  try {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      confirmPassword: yup
        .string()
        .when("password", (password, field) =>
          password ? field.required().oneOf([yup.ref("password")]) : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).send({ error: "Error na validação" });
    }

    const user = await User.findOne({ email }).select(
      "+passwordResetToken passwordResetTokenExpires"
    );
 
    
    if (!user) {
      return res.status(400).send({ error: `Usuário não encontrado` });
    }
    
    if (token !== user.passwordResetToken) {
      return res.status(400).send({ error: "Token inválido" });
    }
    // Se o token estiver expirado, irá dar error
    const now = new Date();
    if (now > user.passwordResetTokenExpires) {
      return res
        .status(400)
        .send({ error: "Token expirou, por favor gere outro novamente!" });
      }

      user.password = password;
      user.email=email
      
      await user.save();
      return res.status(200).send({ message: "Ok, reset realizado com sucesso!" });
    } catch (error) {
      return res
      .status(400)
      .send({ error: "Error ao tentar resetar o passowrd" });
  }
});

router.put("/updateUser/:id", isAuth,isAdm, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    const schema = yup.object().shape({
      email: yup.string().email(),
      password: yup.string().min(6),
      confirmPassword: yup
        .string()
        .when("password", (password, field) =>
          password ? field.required().oneOf([yup.ref("password")]) : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).send({ message: "Error na validação" });
    }

    // Se estou digitando um email diferente do que eu tinha antes
    // Irá verificar se não existe um email com o mesmo valor
    if (user.email !== req.body.email) {
      const userExists = await User.findOne({ email: req.body.email });
      // Se existir um usuário com o mesmo emails
      if (userExists) {
        return res.status(400).send({ message: "Email já existe" });
      }
    }

    if (user) {
      // const password_hash =
      //   req.body.password && (await bcrypt.hash(req.body.password, 8));
      (user.email = req.body.email || user.email),
        (user.password = req.body.password || user.password);

      const updatedUser = await user.save();
      return res.status(200).send({
        _id: updatedUser._id,
        email: updatedUser.email,
        isADM: updatedUser.isADM,
        token: getToken(updatedUser),
      });
    } else {
      return res.status(500).send({ message: "Falha ao atualizar o usuário" });
    }
  } catch (error) {
    return res.status(401).send({ error: "Lamento mas o usuário não existe" });
  }
});

export default router;
