import User from "../model/userModel";
import * as yup from "yup";
import { getToken, isAdm, isAuth } from "../../utils";
import bcrypt from "bcrypt";

class UserController {
  // Criar usuário
  async store(req, res) {
    try {
      // Validação
      const schema = yup.object().shape({
        name: yup.string(),
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

      const password_hash = await bcrypt.hash(req.body.password, 8);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password_hash,
      });

      const newUser = await user.save();
      if (newUser) {
        return res.status(200).send({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          isADM: newUser.isADM,
          token: getToken(newUser),
        });
      } else {
        return res.status(401).send({ mensage: "Email ou Senha incorretos" });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
  
  async update(req, res) {
    try {
      const user = await User.findById(req.user._id);

      const schema = yup.object().shape({
        name: yup.string(),
        email: yup.string().email(),
        old_password: yup.string().min(6),
        password: yup
          .string()
          .min(6)
          .when("old_password", (old_password, field) =>
            old_password ? field.required() : field
          ),
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
      // Se digitar a senha antiga então irá veficiar se a senha entiga é igual a senha
      // cadastrada no banco
      if (
        req.body.old_password &&
        !(await bcrypt.compare(req.body.old_password, user.password))
      ) {
        return res.status(401).send({ error: "Senha digitada errada!" });
      }

      if (user) {
        const password_hash =
          req.body.password && (await bcrypt.hash(req.body.password, 8));
        (user.name = req.body.name || user.name),
          (user.email = req.body.email || user.email),
          (user.password = password_hash || user.password);

        const updatedUser = await user.save();
        return res.status(200).send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isADM: updatedUser.isADM,
          token: getToken(updatedUser),
        });
      } else {
        return res
          .status(500)
          .send({ message: "Falha ao atualizar o usuário" });
      }
    } catch (error) {
      return res
        .status(401)
        .send({ error: "Lamento mas o usuário não existe" });
    }
  }
}

export default new UserController();
