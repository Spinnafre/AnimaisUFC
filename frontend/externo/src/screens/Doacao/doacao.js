import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import "./styles.css";

import { ListDonations } from "../../Actions/DonationActions";

function Donation() {
  const [visible, setVisible] = useState(false);

  

  function dropdown(e) {
    const nextSibling = e.nextSibling;
    if (e.nextSibling === null) {
      return;
    }
    nextSibling.classList.toggle("show-option");
    e.classList.toggle("btn-drop");
  }

  const DonationList = useSelector((state) => state.DonationList);
  const { loading, error, donations } = DonationList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ListDonations());
  }, []);
  // console.log(DonationList);
  return (
    <>
      <div className="content-headerPage">
        <div className="container-img">
          <h1>Doações</h1>

          <img src={require("../../images/headerIMG2.png")} alt="" srcset="" />
        </div>
        <header>
          <h3>
          O Animais Universitários é um grupo independente sem fins lucrativos.
          Com isso, para que possamos continuar ajudando os animais com rações,
          remédios, castração, entre outros serviços, precisamos da sua doação.
          Você pode ajudar os animais doando tanto dinheiro quanto produtos
          (como rações, remédios) para algum de nossos voluntários disponíveis
          perto de você.
          </h3>
          <h3>
          Aceitamos diversos bancos e estamos presentes em várias partes da
          cidade para receber doações. Agradecemos suas contribuição!
        </h3>
        </header>
      </div>
      <div className="doacao">
        <div className="titulo">
          <h3>Doação de produtos</h3>
        </div>
        <div className="passos">
          <div className="passo">
            <img
              src={require("../../images/donations/mapa.svg")}
              alt="Mapa com pata"
            />
            <div className="info-passo">
              <h4>
                Procure na lista abaixo o melhor lugar para doar pessoalmente.
              </h4>
            </div>
          </div>
          <div className="passo">
            <img
              src={require("../../images/donations/telefoneAu.svg")}
              alt="Celular AU"
            />
            <h4>
              Contate o voluntario que for de mais facil acesso para você
              entregar.
            </h4>
          </div>
          <div className="passo">
            <img
              src={require("../../images/donations/EntregaProduto.svg")}
              alt="Entregador de produto"
            />
            <h4>Encontre o voluntário e ajude nossa causa!</h4>
          </div>
        </div>

        <div className="opcoes">
          {donations.map((e) => {
            if (e.donationType === "Produto") {
              return (
                <div className="opc" key={e._id}>
                  <button className="opcao" onClick={(e) => dropdown(e.target)}>
                    {e.neighborhood}
                    <img
                      src={require("../../images/seta.svg")}
                      alt="Seta"
                      className="botao"
                      disabled={true}
                    />
                  </button>
                  <div id={e.neighborhood}>
                    <h4>
                      Nome: {e.name}
                      <br />
                      Rua: {e.street}, {e.number} <br />
                      Contato:{e.telephone}
                    </h4>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="doacao">
        <div className="titulo">
          <h3>Doação Bancária</h3>
        </div>

        <div className="passos">
          <div className="passo">
            <img
              src={require("../../images/donations/Bandeiras.svg")}
              alt="Bandeiras de banco"
            />
            <h4>
              Procure na lista abaixo a melhor opção de doar para uma de nossas
              contas bancarias.
            </h4>
          </div>
          <div className="passo">
            <img
              src={require("../../images/donations/dadosBanco.svg")}
              alt="Imagem de dados de banco aleatórios"
            />
            <h4>Verifique as informações corretamente.</h4>
          </div>
          <div className="passo">
            <img
              src={require("../../images/donations/cartaoAU.svg")}
              alt="Cartão AU"
            />
            <h4>Deposite na conta bancaria de sua escolha e pronto!</h4>
          </div>
        </div>

        <div className="opcoes">
          {donations.map((e) => {
            if (e.donationType === "Bancária") {
              return (
                <div className="opc" key={e._id}>
                  <button className="opcao" onClick={(e) => dropdown(e.target)}>
                    {e.bank}
                    <img
                      src={require("../../images/seta.svg")}
                      alt="Seta"
                      className="botao"
                      disabled={true}
                    />
                  </button>
                  <div id={e.bank}>
                    <h4>
                      Banco: {e.bank}
                      <br />
                      Agência: {e.agency}
                      <br />
                      Conta bancário: {e.countBank}<br />
                      Correntista:{e.receiverName}
                    </h4>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default Donation;
