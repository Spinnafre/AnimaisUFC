import express from "express";
import multer from "multer";
import * as yup from "yup";

import { getToken, isAdm, isAuth } from "../../utils";

import MulterConfig from "../config/multer";
import FileController from "../controllers/FileController";
import Animal from "../model/AnimaLModel";

const router = express.Router();
const uploads = multer(MulterConfig);


router.get('/searchAnimalExtern',async (req, res) => {
  console.log('SEARCH GET ANIMAL= ',req.query.searchCategory)

  const category = req.query.searchCategory ? { category: req.query.searchCategory } : {};
  

  const SearchAnimal=await Animal.find({...category});
  return res.status(200).send(SearchAnimal);
})
// Pesquisar Animais por Nome e Categoria
router.get("/search", async (req, res) => {
  // const category = req.query.category ? { category: req.query.category } : {};
  if (req.query.searchName !== {}) {
    const searchName = req.query.searchName && {
      name: {
        $regex: req.query.searchName,
        $options: "i",
      },
    };

    const animals = await Animal.find({ ...searchName });
    if (animals.length !== 0) {
      return res.status(200).send(animals);
    }
    const searchCategory = req.query.searchName && {
      category: {
        $regex: req.query.searchName,
        $options: "i",
      },
    };
    const animalsCategory = await Animal.find({ ...searchCategory });
    if (animalsCategory.length !== 0) {
      return res.status(200).send(animalsCategory);
    }
    const all = await Animal.find({});
    return res.status(200).send(all);
  }else{
    const noSearchAnimal=await Animal.find({});
    return res.status(200).send(noSearchAnimal);
  }
 
});

// Pegar um único animal
router.get("/:id", async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (animal) {
      return res
        .status(200)
        .send({ message: `Conseguir pegar o animal`, data: animal });
    } else {
      return res
        .status(200)
        .send({ message: `Lamento mas não consegui pegar os dados` });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Pegar todos os animais
router.get("/", async (req, res) => {
  try {
    const species = req.query.species ? { species: req.query.species } : {};
    const age = req.query.age
      ? {
          age: {
            $lte: Number(req.query.age.split("-")[1]),
            $gte: Number(req.query.age.split("-")[0]),
          },
        }
      : {};
    const port = req.query.port
      ? {
          port: {
            $regex: req.query.port,
            $options: "i",
          },
        }
      : {};
    const sex = req.query.sex ? { sex: req.query.sex } : {};
    const category = req.query.category ? { category: req.query.category } : {};
    // const searchKeyword = req.query.searchKeyword
    //   ? {
    //       name: {
    //         $regex: req.query.searchKeyword,
    //         $options: "i",
    //       },
    //     }
    //   : {};

    const animal = await Animal.find({
      ...species,
      ...age,
      ...port,
      ...sex,
      ...category,
    });

    if (animal) {
      return res
        .status(200)
        .send({ message: `Conseguir pegar todos os animais`, data: animal });
    } else {
      return res
        .status(200)
        .send({ message: `Lamento mas não consegui pegar os animais` });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});
// Enviar foto do animal
router.post("/files", uploads.single("image"), FileController.store);

// Criar Animal
router.post("/create", isAuth, isAdm, async (req, res) => {
  try {
    // Validação
    const schema = yup.object().shape({
      image: yup.string().required(),
      name: yup.string().required(),
      sex: yup.string().required(),
      category: yup.string().required(),
      age: yup.number().required().positive().integer(),
      species: yup.string().required(),
      port: yup.string().required(),
      breed: yup.string().required(),
      telephone: yup.number().required().positive().integer(),
      desc: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .send({ message: "Não foi possível criar o animal" });
    }

    const animal = new Animal({
      image: req.body.image,
      name: req.body.name,
      sex: req.body.sex,
      category: req.body.category,
      age: req.body.age,
      species: req.body.species,
      port: req.body.port,
      breed: req.body.breed,
      telephone: req.body.telephone,
      desc: req.body.desc,
    });

    const newAnimal = await animal.save();
    if (newAnimal) {
      return res.status(200).send({
        _id: newAnimal._id,
        name: newAnimal.name,
        sex: newAnimal.sex,
        image: newAnimal.image,
        category: newAnimal.category,
        age: newAnimal.age,
        species: newAnimal.species,
        port: newAnimal.port,
        breed: newAnimal.breed,
        telephone: newAnimal.telephone,
        desc: newAnimal.desc,
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
  const AnimalId = req.params.id;
  const animal = await Animal.findById(AnimalId);
  if (animal) {
    animal.name = req.body.name;
    animal.sex = req.body.sex;
    animal.image = req.body.image;
    animal.category = req.body.category;
    animal.age = req.body.age;
    animal.species = req.body.species;
    animal.port = req.body.port;
    animal.breed = req.body.breed;
    animal.telephone = req.body.telephone;
    animal.desc = req.body.desc;

    const newProduct = await animal.save();
    if (newProduct) {
      return res
        .status(200)
        .send({ message: "Produto Atualizado com sucesso", data: newProduct });
    }
  }
  return res.status(500).send({ message: "Falha ao Atualizar produto" });
});
// Deletar Animal
router.delete("/delete/:id", isAuth, isAdm, async (req, res) => {
  try {
    const animais = await Animal.findById(req.params.id);
    if (animais) {
      await animais.remove();
      return res.status(200).send({
        message: `O animal com o id: ${animais._id} foi deletado`,
        data: animais,
      });
    } else {
      return res.status(200).send({ message: `Nenhum usuário encontrado` });
    }
    // const newUser = await animais.save();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
