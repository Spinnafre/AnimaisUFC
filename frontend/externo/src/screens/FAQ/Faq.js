import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Delete, listFAQ, Register } from "../../Actions/FaqAction";

import "./styles.css";

function Faq() {
  // FAQ list
  const listFaq = useSelector((state) => state.FAQList);
  const { loading, error, faq } = listFaq;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listFAQ());
  }, []);
  console.log("FAQS= ", faq);

  function showQuestions(e) {
    let node = e.parentNode.getElementsByClassName("questions")[0];
    if (node === undefined) {
      return;
    }

    if (node.classList.length === 1) {
      e.classList.add("theme-chosen");
      node.classList.add("visible");
    } else {
      e.classList.remove("theme-chosen");
      node.classList.remove("visible");
    }
  }

  function showAnswer(e) {
    let node = e.parentNode.getElementsByClassName("answer")[0];
    console.log("NODE= ", e);
    if (node === undefined) {
      return;
    }

    if (node.classList.length === 1) {
      e.classList.add("answer-visible");
      node.classList.add("visible");
    } else {
      e.classList.remove("answer-visible");
      node.classList.remove("visible");
    }
  }

  return (
    <>
      <div className="content-headerPage">
        <div className="container-img">
          <h1>FAQ</h1>

          <img src={require("../../images/headerIMG2.png")} alt="" srcset="" />
        </div>
        <header>
          <h3>
            Seja para cuidar, seja para transportar ou mesmo para situações mais
            delicadas, é muito comum ter dúvidas quando se trata de animais.
            Ficou com alguma dúvida? Encontre sua resposta aqui, direcionadas
            desde os mais novos pais de pet até os mais experientes voluntários
            do projeto, um pouco de tudo o que você pode precisar saber para
            diferentes situações do seu dia a dia.
          </h3>
        </header>
      </div>
      <div className="content-section">
        <div className="questions-themes">
          {faq.map((faq) => (
            <div className="theme" key={faq._id}>
              <button
                className="action"
                onClick={(e) => showQuestions(e.target)}
              >
                {faq.theme}
              </button>
              <div className="questions">
                <div className="question" onClick={(e) => showAnswer(e.target)}>
                  <button>
                    {faq.question}
                    <img
                      src={require("../../images/seta.svg")}
                      alt="Drop icon"
                    />
                  </button>
                  <div className="answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Faq;
