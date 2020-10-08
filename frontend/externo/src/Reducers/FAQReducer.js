// Constantes usadas para evitar erros de digitações
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

// Reducar irá possuir um estado inicial e recebe action
function FAQListReducer(state = { faq: [] }, action) {
  switch (action.type) {
    case FAQ_LIST_REQUEST:
      return { loading: true, faq: [] };
    case FAQ_LIST_SUCESS:
      return { loading: false, faq: action.payload };
    case FAQ_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function FAQRegisterReducer(state = { faq: {} }, action) {
  switch (action.type) {
    case FAQ_SAVE_REQUEST:
      return { loading: true };
    case FAQ_SAVE_SUCESS:
      return { loading: false, sucess: true, faq: action.payload };
    case FAQ_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function FAQDeleteReducer(state = { faq: {} }, action) {
  switch (action.type) {
    case FAQ_DELETE_REQUEST:
      return { loading: true };
    case FAQ_DELETE_SUCESS:
      return { loading: false, sucess: true, faq: action.payload };
    case FAQ_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function FAQDetailsReducer(state = { faq: {} }, action) {
  switch (action.type) {
    case FAQ_DETAIL_REQUEST:
      return { loading: true };
    case FAQ_DETAIL_SUCESS:
      return { loading: false, faq: action.payload };
    case FAQ_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  FAQListReducer,
  FAQDeleteReducer,
  FAQRegisterReducer,
  FAQDetailsReducer,
};
