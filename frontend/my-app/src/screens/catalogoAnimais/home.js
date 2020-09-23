import React, { useState, useEffect } from "react";
import { BoxLoading } from "react-loadingg";


import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";

import Main from "../../components/Title/main";


import { useSelector, useDispatch } from "react-redux";
import { listAnimals } from "../../Actions/listAnimals";
import { Register, Delete } from "../../Actions/AnimalRegisterActions";

import api from "../../api/api";

import "./styles.css";

function Home() {
  const [modaVisible, setModalVisible] = useState(false);


  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [category, setCategory] = useState("");
  const [age, setAge] = useState(0);
  const [species, setSpecies] = useState("");
  const [port, setPort] = useState("");
  const [breed, setBreed] = useState("");
  const [telephone, setTelephone] = useState("");
  const [desc, setDesc] = useState("");

  const [searchKeyword, setSearchKeyword] = useState("");

  const [uploading, setUploading] = useState(false);

  const AnimalList = useSelector((state) => state.AnimalList);
  const { animals, loading, error } = AnimalList;

  const UserLogin = useSelector((state) => state.UserLogin);
  const { loading: loadingUser, error: errorUser, userInfo } = UserLogin;

  const AnimalRegister = useSelector((state) => state.AnimalRegister);
  const {
    loading: loadingSave,
    error: errorSave,
    sucess: sucessSave,
  } = AnimalRegister;

  const AnimalDelete = useSelector((state) => state.AnimalDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    sucess: sucessDelete,
  } = AnimalDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (sucessSave) {
      setModalVisible(false);
    }
    dispatch(listAnimals());
  }, [sucessSave, sucessDelete]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      Register({
        _id: id,
        name,
        image,
        sex,
        category,
        age,
        species,
        port,
        breed,
        telephone,
        desc,
      })
    );
  }

  function HandleDelete(animal) {
    if(userInfo.data.isADM){
      if (
        window.confirm(
          `Tem certeza que deseja deletar o ${animal.name} com ID= ${animal._id}?`
        )
      ) {
        dispatch(Delete(animal._id));
      }
    }else{
      alert("Você não tem a permissão")
    }
    
  }
  function OpenModal(animal) {
    if(userInfo.data.isADM){
      setName(animal.name);
      setId(animal._id);
      setImage(animal.image);
      setSex(animal.sex);
      setCategory(animal.category);
      setAge(animal.age);
      setSpecies(animal.species);
      setPort(animal.port);
      setBreed(animal.breed);
      setTelephone(animal.telephone);
      setDesc(animal.desc);
  
      setModalVisible(true);
    }else{
      alert("Você não tem a permissão")
    }
    
  }

  function closeModel() {
    setModalVisible(false);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listAnimals(searchKeyword));
    setSearchKeyword("")
  };

  const uploadFileHandler = async (e) => {
    if(userInfo.data.isADM){
      const file = e.target.files[0];
      const bodyFormData = new FormData();
  
      bodyFormData.append("image", file);
      setUploading(true);
      await api
        .post("animal/api/files", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setImage(response.data.data.url);
          setUploading(false);
        })
        .catch((err) => {
          setUploading(false);
        });
    }else{
      alert("Você não tem permissão")
    }
    
  };

  return (
    <div className="content-grid">
      {loading ? (
        <div className="Loading-Container">
          <BoxLoading size={30} color="red" />
        </div>
      ) : error ? (
        <h1>Error ao conectar ao servidor</h1>
      ) : (
        <>
          <div className="Container-Header-Top">
            <Main icon="PetsIcon" title="Animais"></Main>

            {!modaVisible ? (
              <div className="Search-Bar">
                <form onSubmit={submitHandler}>
                  <input
                    name="searchKeyword"
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Pesquisar por nome"
                    autoComplete="off"
                  />
                  <button type="submit">
                    <SearchIcon size={25} />
                  </button>
                </form>
              </div>
            ) : (
              ""
            )}
          </div>

          {modaVisible && (
            <div className="Container-Form-edit">
              <div className="Header-GoBack" onClick={closeModel}>
                <button>
                  <KeyboardReturnIcon />
                </button>
                <span>Voltar</span>
              </div>
              <form onSubmit={handleSubmit} className="Form-Container">
                <div className="Content-Form-Container">
                  {loading && <div>Carregando</div>}
                  {error && <div>{error}</div>}

                  <fieldset>
                    <div className="Group-Inputs-Button">
                      <div
                        className={
                          image ? "image-container" : "preview-container"
                        }
                      >
                        {image ? (
                          <div className="Image-Preview">
                            <img src={image} alt="" />
                          </div>
                        ) : (
                          <InsertPhotoIcon fontSize="large" />
                        )}
                      </div>

                      <div className="label-input-file">
                        <label htmlFor="input-file">
                          <span>Upload do arquivo</span>
                        </label>
                        <input
                          type="file"
                          onChange={uploadFileHandler}
                          id="input-file"
                        ></input>
                        {uploading && <div>Enviando...</div>}
                      </div>
                    </div>

                    <div className="Group-Inputs">
                      <div className="input">
                        <label htmlFor="name">Nome:</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          required
                          onChange={(name) => setName(name.target.value)}
                        />
                      </div>
                      <div className="input">
                        <label htmlFor="especie">Espécie:</label>
                        <input
                          type="text"
                          name="especie"
                          id="especie"
                          value={species}
                          required
                          onChange={(species) =>
                            setSpecies(species.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="Group-Inputs">
                      <div className="input">
                        <label htmlFor="sex">Sexo:</label>
                        <select
                          name="sex"
                          id="sex"
                          value={sex}
                          onChange={(sex) => setSex(sex.target.value)}
                        >
                          <option value="" disabled selected>
                            Selecione
                          </option>
                          <option value="Masculino">Masculino</option>
                          <option value="Feminino">Feminino</option>
                        </select>
                      </div>
                      <div className="input">
                        <label htmlFor="port">Porte:</label>
                        <select
                          name="port"
                          id="port"
                          value={port}
                          onChange={(port) => setPort(port.target.value)}
                        >
                          <option value="" disabled selected>
                            Selecione
                          </option>
                          <option value="Pequeno">Pequeno</option>
                          <option value="Médio">Médio</option>
                          <option value="Grande">Grande</option>
                        </select>
                      </div>
                    </div>

                    <div className="Group-Inputs">
                      <div className="input">
                        <label htmlFor="category">Categoria:</label>
                        <select
                          name="category"
                          id="category"
                          value={category}
                          onChange={(category) =>
                            setCategory(category.target.value)
                          }
                        >
                          <option value="" disabled selected>
                            Selecione
                          </option>
                          <option value="Animais UFC">Animais UFC</option>
                          <option value="Lar temporário">Lar Temporário</option>
                          <option value="Adoção">Adoção</option>
                        </select>
                      </div>

                      <div className="input">
                        <label htmlFor="breed">Raça:</label>
                        <input
                          type="text"
                          name="breed"
                          id="breed"
                          value={breed}
                          required
                          onChange={(breed) => setBreed(breed.target.value)}
                        />
                      </div>
                    </div>

                    <div className="Group-Inputs">
                      <div className="input">
                        <label htmlFor="telephone">
                          Contato do responsável:
                        </label>
                        <input
                          type="text"
                          name="telephone"
                          id="telephone"
                          value={telephone}
                          required
                          onChange={(tel) => setTelephone(tel.target.value)}
                        />
                      </div>

                      <div className="input">
                        <label htmlFor="age">Idade:</label>
                        <input
                          type="number"
                          max={100}
                          maxLength={3}
                          name="age"
                          id="age"
                          value={age}
                          required
                          onChange={(age) => setAge(age.target.value)}
                        />
                      </div>
                    </div>

                    <div className="input-desc">
                      <label htmlFor="desc">Descricao:</label>
                      <textarea
                        type="text"
                        name="description"
                        id="desc"
                        value={desc}
                        required
                        onChange={(desc) => setDesc(desc.target.value)}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-confirm primary">
                      {id ? "Atualizar" : "Confirmar"}
                    </button>
                  </fieldset>
                </div>
              </form>
            </div>
          )}

          {!modaVisible && (
            <div className="content-form">
              <div className="header-Container">
                <table className="MyOrders-Table">
                  <thead>
                    <tr className="Container-row">
                      <th id="th-id">ID</th>
                      <th id="img-th">Foto</th>
                      <th>Nome</th>
                      <th>Catálogo</th>
                      <th className="Container-Addd-New">
                        <button
                          className="btn-add"
                          onClick={() => OpenModal({})}
                        >
                          <AddCircleIcon />
                          <span>Adicionar</span>
                        </button>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {animals.length === 0 && !loading ? (
                      <div className="No-Found-Container">
                        Não há animais cadastrados
                      </div>
                    ) : (
                      animals.map((animal) => (
                        <tr key={animal._id}>
                          <td className="Container-td">
                            <span>{animal._id}</span>
                          </td>
                          <td className="Container-td-img">
                            <div>
                              <img src={animal.image} alt="" />
                            </div>
                          </td>
                          <td className="Container-td">
                            {animal.name.split(" ")[0]}
                          </td>
                          <td className="Container-td">{animal.category}</td>
                          <td className="Container-buttons-td Container-td">
                            <button
                              onClick={() => OpenModal(animal)}
                              className="buttonF edit"
                            >
                              <CreateIcon fontSize="large" />
                            </button>
                            {"  "}
                            <button
                              onClick={() => HandleDelete(animal)}
                              className="buttonF delete"
                            >
                              <DeleteForeverIcon fontSize="large" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
