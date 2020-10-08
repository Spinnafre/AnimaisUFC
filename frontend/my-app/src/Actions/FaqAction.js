import api from "../api/api";
import {
  FAQ_SAVE_FAIL,
  FAQ_SAVE_REQUEST,
  FAQ_SAVE_SUCESS,
  FAQ_DELETE_SUCESS,
  FAQ_DELETE_FAIL,
  FAQ_DELETE_REQUEST,
  FAQ_DETAIL_FAIL,
  FAQ_DETAIL_REQUEST,
  FAQ_DETAIL_SUCESS,
  FAQ_LIST_FAIL,
  FAQ_LIST_REQUEST,
  FAQ_LIST_SUCESS,
} from "../constants/FaqConstants";

const Register = (faq) => async (dispatch, getState) => {
  try {
    dispatch({ type: FAQ_SAVE_REQUEST });
    const {
      UserLogin: { userInfo },
    } = getState();

    // Caso
    if (!faq._id) {
      const { data } = await api.post("faq/api/create", faq, {
        headers: {
          Authorization: "Bearer " + userInfo.data.token,
        },
      });
      dispatch({ type: FAQ_SAVE_SUCESS, payload: data });
    } else {
      const { data } = await api.put("faq/api/put/" + faq._id, faq, {
        headers: {
          Authorization: "Bearer " + userInfo.data.token,
        },
      });
      dispatch({ type:FAQ_SAVE_SUCESS, payload: data });
    }
    // Disparo a action que irá carregar as listas
  } catch (error) {
    dispatch({
      type: FAQ_SAVE_FAIL,
      payload: "Falha ao atualizar o FAQ",
    });
  }
};
const Delete = (faq) => async (dispatch, getState) => {
  try {
    const {
      UserLogin: { userInfo },
    } = getState();

    dispatch({ type: FAQ_DELETE_REQUEST, payload: faq });

    const { data } = await api.delete("faq/api/delete/" + faq, {
      headers: {
        Authorization: "Bearer " + userInfo.data.token,
      },
    });
    dispatch({ type: FAQ_DELETE_SUCESS, payload: data, sucess: true });
  } catch (error) {
    dispatch({
      type: FAQ_DELETE_FAIL,
      payload: "Falha ao deletar o FAQ",
    });
  }
};
const listFAQ = (tema="") => async (dispatch) => {
  try {
    dispatch({ type: FAQ_LIST_REQUEST });
    const { data } = await api.get(
      "faq/api/searchFAQ?searchTheme="+tema);
  
    // Disparo a action que irá carregar as listas
    dispatch({ type: FAQ_LIST_SUCESS, payload: data });
  } catch (error) {
    dispatch({ type: FAQ_LIST_FAIL, payload: "FALHA AO LISTAR O FAQ" });
  }
};


const FAQDetail = (FaqID) => async (dispatch) => {
  try {
    dispatch({ type: FAQ_DETAIL_REQUEST, payload: FaqID });
    const faq = await api.get(`faq/api/${FaqID}`);
    dispatch({ type: FAQ_DETAIL_SUCESS, payload: faq.data });
  } catch (error) {
    dispatch({ type: FAQ_DETAIL_FAIL, payload: "Falha ao pegar o FAQ"});
  }
};


export { Register, Delete,listFAQ,FAQDetail };
