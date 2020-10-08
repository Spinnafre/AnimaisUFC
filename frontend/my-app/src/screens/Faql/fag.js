import React, { useState, useEffect } from "react";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import SearchIcon from "@material-ui/icons/Search";

import { useSelector, useDispatch } from "react-redux";

import Main from "../../components/Title/main";

import { Delete, listFAQ, Register } from "../../Actions/FaqAction";

import "./styles.css";

function Faq() {
  const [modaVisible, setModalVisible] = useState(false);

  const [id, setId] = useState("");
  const [theme, setTheme] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [searchKeyword, setSearchKeyword] = useState("");

  const UserLogin = useSelector((state) => state.UserLogin);
  const { loading: loadingUser, error: errorUser, userInfo } = UserLogin;

  // FAQ list
  const listFaq = useSelector((state) => state.FAQList);
  const { loading, error, faq } = listFaq;

  // FAQ DELETE
  const FaqDel = useSelector((state) => state.FAQDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    sucess: sucessDelete,
  } = FaqDel;

  const FAQregister = useSelector((state) => state.FAQRegister);
  const {
    loading: loadingSave,
    error: errorSave,
    sucess: sucessSave,
  } = FAQregister;

  const dispatch = useDispatch();

  useEffect(() => {
    if (sucessSave) {
      setModalVisible(false);
    }
    dispatch(listFAQ());
  }, [sucessSave, sucessDelete]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      Register({
        _id: id,
        theme,
        question,
        answer,
      })
    );
  }

  function OpenModal(faq) {
    if (userInfo.data.isADM) {
      setId(faq._id);
      setTheme(faq.theme);
      setQuestion(faq.question);
      setAnswer(faq.answer);
      setModalVisible(true);
    } else {
      alert("Você não tem a permissão");
    }
  }
  function closeModel() {
    setModalVisible(false);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listFAQ(searchKeyword));
    setSearchKeyword("")
  };
  function HandleDelete(faq) {
    if (userInfo.data.isADM) {
      if (
        window.confirm(
          `Tem certeza que deseja deletar ${faq.theme} com ID= ${faq._id}?`
        )
      ) {
        dispatch(Delete(faq._id));
      }
    }else{
      alert("Você não tem a permissão")
    }
  }
  return (
    <div>
      <div className="Container-Header-Top">
        <Main icon="ForumIcon" title="FAQ"></Main>
        {!modaVisible ? (
          <div className="Search-Bar">
            <form onSubmit={submitHandler}>
              <input
                name="searchKeyword"
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Pesquisar por tema"
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
        <div className="Container-Form-Faq-edit">
          <div className="Header-GoBack" onClick={closeModel}>
            <button>
              <KeyboardReturnIcon />
            </button>
            <span>Voltar</span>
          </div>
          {loading && <div>Carregando</div>}
          {error && <div>{error}</div>}
          <form onSubmit={handleSubmit} className="Form-Container-Faq">
            <div className="group">
              <fieldset>
                <div className="input">
                  <label htmlFor="theme">Tema:</label>
                  <input
                    type="text"
                    name="theme"
                    id="theme"
                    value={theme}
                    required
                    onChange={(theme) => setTheme(theme.target.value)}
                  />
                </div>

                <div className="input-question">
                  <label htmlFor="question">Pergunta:</label>
                  <textarea
                    type="text"
                    name="question"
                    id="question"
                    value={question}
                    required
                    onChange={(question) => setQuestion(question.target.value)}
                  />
                </div>

                <div className="input-desc-faq">
                  <label htmlFor="desc">Resposta:</label>
                  <textarea
                    type="text"
                    name="answer"
                    id="answer"
                    value={answer}
                    required
                    onChange={(answer) => setAnswer(answer.target.value)}
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
                  <th>ID</th>
                  <th>Pergunta</th>
                  <th>Tema</th>
                  <th className="Container-Addd-New">
                    <button className="btn-add" onClick={() => OpenModal({})}>
                      <AddCircleIcon />
                      <span>Adicionar</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {faq.length === 0 && !loading ? (
                  <div className="No-Found-Container">
                    Não há FAQ cadastrados
                  </div>
                ) : (
                  faq.map((faq) => (
                    <tr key={faq._id}>
                      <td className="Container-td">
                        <span>{faq._id}</span>
                      </td>
                      <td id="question-faq">
                        {faq.question.slice(0, 20) + "..."}
                      </td>
                      <td className="Container-td">{faq.theme}</td>
                      <td className="Container-buttons-td Container-td">
                        <button
                          onClick={() => OpenModal(faq)}
                          className="buttonF edit"
                        >
                          <CreateIcon fontSize="large" />
                        </button>
                        {"  "}
                        <button
                          onClick={() => HandleDelete(faq)}
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
    </div>
  );
}

export default Faq;

{
  /* {popdelete && (
        <div className="Popup-Background-Delete">
          <div className="Popup-Container-Delete">
            <div className="Popup-Content-Delete">
              <h2>Tem certeza que deseja deletar o produto?</h2>
              <div className="Popup-button-container-Delete">
                <div className="group-button">
                  <button className="btn-popup primary" onClick={closePopup}>
                    Excluir
                  </button>
                  <button className="btn-popup seconday" onClick={closePopup}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */
}
