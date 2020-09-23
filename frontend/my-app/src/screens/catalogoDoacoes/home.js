import React, { useState, useEffect } from "react";
import { BoxLoading } from "react-loadingg";
import { Link } from "react-router-dom";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

import { useSelector, useDispatch } from "react-redux";

import Main from "../../components/Title/main";
import Cachorro from "../../assets/cachorro.png";

import {
  ListDonations,
  RegisterBank,
  RegisterProd,
  DeleteDonation,
} from "../../Actions/DonationActions";

import "./styles.css";

function Home() {
  const [modaVisible, setModalVisible] = useState(false);
  const [modaVisibleBank, setModalVisibleBank] = useState(false);

  const [pop, setPop] = useState(false);
  const [popdelete, setPopdelete] = useState(false);

  const [idBank, setIdBank] = useState("");
  const [bank, setBank] = useState("");
  const [agency, setAgency] = useState("");
  const [countNumber, setCountNumber] = useState(0);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [idProd, setIdProd] = useState("");
  const [nameProd, setNameProd] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [telephone, setTelephone] = useState("");
  const [number, setNumber] = useState("");
  const [ref, setRef] = useState("");

  const [searchKeyword, setSearchKeyword] = useState("");

  const UserLogin = useSelector((state) => state.UserLogin);
  const { loading: loadingUser, error: errorUser, userInfo } = UserLogin;

  const DonationList = useSelector((state) => state.DonationList);
  const { loading, error, donations } = DonationList;

  const DonationDelete = useSelector((state) => state.DonationDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: sucessDelete,
  } = DonationDelete;

  const DonationRegister = useSelector((state) => state.DonationRegister);
  const {
    loading: loadingSave,
    error: errorSave,
    success: sucessSave,
  } = DonationRegister;

  const dispatch = useDispatch();
  useEffect(() => {
    if (sucessSave) {
      setModalVisible(false);
      setModalVisibleBank(false);
    }
    dispatch(ListDonations());
  }, [sucessSave, sucessDelete]);

  function OpenPopup(product) {
    if (userInfo.data.isADM) {
      setPop(true);
    } else {
      alert("Você não tem a permissão");
    }
  }

  function OpenBank(donation) {
    setPop(false);
    setIdBank(donation._id);
    setName(donation.receiverName);
    setBank(donation.bank);
    setAgency(donation.agency);
    setCountNumber(donation.countBank);

    setModalVisibleBank(true);
  }

  function HandleDelete(donation) {
    if (userInfo.data.isADM) {
      if (
        window.confirm(
          `Tem certeza que deseja deletar o ${
            donation.name || donation.bank
          } com ID= ${donation._id}?`
        )
      ) {
        dispatch(
          DeleteDonation({ _id: donation._id, type: donation.donationType })
        );
      }
    } else {
      alert("Você não tem permissão");
    }
  }
  function handleSubmitProd(e) {
    e.preventDefault();
    dispatch(
      RegisterProd({
        _id: idProd,
        donationType: "Produto",
        name,
        neighborhood,
        street,
        complement,
        telephone,
        number,
        ref,
      })
    );
  }
  // Criar uma action para o bank

  function handleSubmitBank(e) {
    e.preventDefault();
    dispatch(
      RegisterBank({
        _id: idBank,
        bank,
        receiverName: name,
        agency,
        countBank: countNumber,
        desc,
        donationType: "Bancária",
      })
    );
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(ListDonations(searchKeyword));
    setSearchKeyword("");
  };

  function OpenProduct(donation) {
    if (userInfo.data.isADM) {
      setPop(false);

      setIdProd(donation._id);
      setName(donation.name);
      setNeighborhood(donation.neighborhood);
      setStreet(donation.street);
      setComplement(donation.complement);
      setTelephone(donation.telephone);
      setNumber(donation.number);
      setRef(donation.ref);
      setModalVisible(true);
    } else {
      alert("Você não tem a permissão");
    }
  }
  function edit(t) {
    if (userInfo.data.isADM) {
      setPop(false);
      if (t.donationType === "Bancária") {
        OpenBank(t);
      } else {
        OpenProduct(t);
      }
    } else {
      alert("Você não tem a permissão");
    }

    // setModalVisible(true);
  }
  function closeModel() {
    setModalVisible(false);
    setModalVisibleBank(false);
  }

  function closePopup() {
    setPop(false);
    setPopdelete(false);
  }

  return (
    <div>
      {loading ? (
        <BoxLoading size={30} color="red" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="Container-Header-Top">
            <Main icon="MonetizationOnIcon" title="Doações"></Main>

            {!modaVisible && !modaVisibleBank ? (
              <div className="Search-Bar">
                <form onSubmit={submitHandler}>
                  <input
                    name="searchKeyword"
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Pesquisar por tipo de doação"
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

          {/* Product Form */}
          {modaVisible && (
            <div className="Container-Form-edit">
              <div className="Header-GoBack" onClick={closeModel}>
                <button>
                  <KeyboardReturnIcon />
                </button>
                <span>Voltar</span>
              </div>
              <form onSubmit={handleSubmitProd} className="Form-Container">
                <div className="group-form">
                  {loading && <div>Carregando</div>}
                  {error && <div>{error}</div>}
                  {/* <legend>Cadastre o seu produto</legend> */}

                  <fieldset>
                    <div className="Group-Inputs">
                      <div className="input">
                        <label htmlFor="neighborhood">Bairro:</label>
                        <input
                          type="text"
                          name="neighborhood"
                          id="neighborhood"
                          value={neighborhood}
                          onChange={(neighborhood) =>
                            setNeighborhood(neighborhood.target.value)
                          }
                        />
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
                          onChange={(name) => setName(name.target.value)}
                        />
                      </div>
                      <div className="input">
                        <label htmlFor="street">Rua:</label>
                        <input
                          type="text"
                          name="street"
                          id="street"
                          value={street}
                          onChange={(street) => setStreet(street.target.value)}
                        />
                      </div>
                    </div>

                    <div className="Group-Inputs">
                      <div className="input">
                        <label htmlFor="people">Número:</label>
                        <input
                          type="number"
                          name="number"
                          id="number"
                          value={number}
                          onChange={(number) => setNumber(number.target.value)}
                        />
                      </div>

                      <div className="input">
                        <label htmlFor="ref">Ponto de referência:</label>
                        <input
                          type="text"
                          name="ref"
                          id="ref"
                          value={ref}
                          required
                          onChange={(ref) => setRef(ref.target.value)}
                        />
                      </div>
                    </div>

                    <div className="Group-Inputs">
                      <div className="input">
                        <label htmlFor="tel">Telefone para contato:</label>
                        <input
                          type="text"
                          name="tel"
                          id="tel"
                          value={telephone}
                          required
                          onChange={(telephone) =>
                            setTelephone(telephone.target.value)
                          }
                        />
                      </div>

                      <div className="input">
                        <label htmlFor="complement">Complemento:</label>
                        <input
                          type="text"
                          name="complement"
                          id="complement"
                          value={complement}
                          onChange={(complement) =>
                            setComplement(complement.target.value)
                          }
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn-confirm primary">
                      {idProd ? "Atualizar" : "Criar"}
                    </button>
                  </fieldset>
                </div>
              </form>
            </div>
          )}

          {/* Bank Form */}
          {modaVisibleBank && (
            <div className="Container-Form-edit">
              <div className="Header-GoBack" onClick={closeModel}>
                <button>
                  <KeyboardReturnIcon />
                </button>
                <span>Voltar</span>
              </div>
              <form onSubmit={handleSubmitBank} className="Form-Container">
                <div className="group-form">
                  {loading && <div>Carregando</div>}
                  {error && <div>{error}</div>}

                  <fieldset>
                    <div className="Group-Inputs">
                      <div className="input">
                        <label htmlFor="bank">Banco:</label>
                        <select
                          name="bank"
                          id="bank"
                          value={bank}
                          required
                          onChange={(name) => setBank(name.target.value)}
                        >
                          <option value="" disabled selected>
                            Selecione
                          </option>
                          <option value="Banco do Brasil">
                            Banco do Brasil
                          </option>
                          <option value="Bradesco">Bradesco</option>
                          <option value="Nubank">Nubank</option>
                        </select>
                      </div>
                    </div>

                    <div className="Group-Inputs">
                      <div className="input">
                        <label htmlFor="name">Nome do receptor:</label>
                        <input
                          type="name"
                          name="name"
                          id="name"
                          value={name}
                          required
                          onChange={(name) => setName(name.target.value)}
                        />
                      </div>

                      <div className="input">
                        <label htmlFor="countNumber">Conta:</label>
                        <input
                          type="text"
                          name="countNumber"
                          id="countNumber"
                          value={countNumber}
                          required
                          onChange={(countNumber) =>
                            setCountNumber(countNumber.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="Group-Inputs">
                      <div className="input">
                        <label htmlFor="agency">Agência:</label>
                        <input
                          type="text"
                          name="agency"
                          id="agency"
                          value={agency}
                          required
                          onChange={(agency) => setAgency(agency.target.value)}
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
                        onChange={(desc) => setDesc(desc.target.value)}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-confirm primary">
                      {idBank ? "Atualizar" : "Criar"}
                    </button>
                  </fieldset>
                </div>
              </form>
            </div>
          )}

          {/* Pop-up add */}
          {pop && (
            <div className="Popup-Background">
              <div className="Popup-Container">
                <div className="Popup-Content">
                  <h2>Qual o tipo da doação a ser criada?</h2>
                  <div className="Popup-button-container">
                    <button className="btn-popup primary" onClick={OpenBank}>
                      Bancária
                    </button>
                    <button className="btn-popup primary" onClick={OpenProduct}>
                      Produto
                    </button>
                    <button className="btn-popup seconday" onClick={closePopup}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!modaVisible && !modaVisibleBank && (
            <div className="content-form">
              <div className="header-Container">
                <table className="MyOrders-Table">
                  <thead>
                    <tr className="Container-row">
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Tipo</th>
                      <th className="Container-Addd-New">
                        <button
                          className="btn-add"
                          onClick={() => OpenPopup({})}
                        >
                          <AddCircleIcon />
                          <span>Adicionar</span>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.length === 0 && !loading ? (
                      <div className="No-Found-Container">
                        Não há doações cadastrados
                      </div>
                    ) : (
                      donations.map((donation) => (
                        <tr key={donation._id}>
                          <td className="Container-td">
                            <span>{donation._id}</span>
                          </td>
                          <td className="Container-td">
                            {donation.donationType === "Bancária"
                              ? donation.bank
                              : donation.neighborhood.slice(0, 20)}
                          </td>
                          <td className="Container-td">
                            {donation.donationType}
                          </td>
                          <td className="Container-buttons-td Container-td">
                            <button
                              onClick={() => edit(donation)}
                              className="buttonF edit"
                            >
                              <CreateIcon fontSize="large" />
                            </button>
                            {"  "}
                            <button
                              onClick={() => HandleDelete(donation)}
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
