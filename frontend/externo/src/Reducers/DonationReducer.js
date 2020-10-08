import {
  DONATION_SAVE_FAIL,
  DONATION_SAVE_REQUEST,
  DONATION_SAVE_SUCESS,
  DONATION_DELETE_SUCESS,
  DONATION_DELETE_FAIL,
  DONATION_DELETE_REQUEST,
  DONATION_DETAIL_FAIL,
  DONATION_DETAIL_REQUEST,
  DONATION_DETAIL_SUCESS,
  DONATION_LIST_FAIL,
  DONATION_LIST_REQUEST,
  DONATION_LIST_SUCESS,
} from "../constants/DonationConstants";

// Passando o DONATION (Conteúdo da tabela User + Conteúdo da tabela DONATION)
function DONATIONListReducer(state = { donations: [] }, action) {
  // console.log("STATE= ",state)
  switch (action.type) {
    case DONATION_LIST_REQUEST:
      return { loading: true,donations:[] };
    case DONATION_LIST_SUCESS:
      return { loading: false, donations: action.payload, success: true };
    case DONATION_LIST_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
}
function DetailDONATIONReducer(
  state = { donation: {  } },
  action
) {
  switch (action.type) {
    case DONATION_DETAIL_REQUEST:
      return { loading: true };
    case DONATION_DETAIL_SUCESS:
      return { loading: false, donation: action.payload };
    case DONATION_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}




export {
  DONATIONListReducer,
  DetailDONATIONReducer,
};
