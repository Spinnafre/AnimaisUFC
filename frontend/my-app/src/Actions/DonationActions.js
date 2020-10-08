import api from "../api/api";
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

const RegisterBank = (donation) => async (dispatch, getState) => {
  try {
    dispatch({ type: DONATION_SAVE_REQUEST });
    const {
      UserLogin: { userInfo },
    } = getState();
    // Caso
    if (!donation._id) {
      const { data } = await api.post("donation/api/create", donation, {
        headers: {
          Authorization: "Bearer " + userInfo.data.token,
        },
      });
      dispatch({ type: DONATION_SAVE_SUCESS, payload: data });
    } else {
      const { data } = await api.put(
        'donation/api/put/'+donation._id,
        donation,
        {
          headers: {
            Authorization: "Bearer " + userInfo.data.token,
          },
        }
        );
        dispatch({ type: DONATION_SAVE_SUCESS, payload: data });
      }
    // Disparo a action que irá carregar as listas
  } catch (error) {
    dispatch({ type: DONATION_SAVE_FAIL, payload: "Falha ao atualizar a doação bancária" });
  }
};

const RegisterProd = (donation) => async (dispatch, getState) => {
  try {
    dispatch({ type: DONATION_SAVE_REQUEST });
    const {
      UserLogin: { userInfo },
    } = getState();
    // Caso
    if (!donation._id) {
      const { data } = await api.post("donationProduct/api/create", donation, {
        headers: {
          Authorization: "Bearer " + userInfo.data.token,
        },
      });
      dispatch({ type: DONATION_SAVE_SUCESS, payload: data });
    } else {
      const { data } = await api.put(
        'donationProduct/api/put/'+donation._id,
        donation,
        {
          headers: {
            Authorization: "Bearer " + userInfo.data.token,
          },
        }
        );
        dispatch({ type: DONATION_SAVE_SUCESS, payload: data });
      }
    // Disparo a action que irá carregar as listas
  } catch (error) {
    dispatch({ type: DONATION_SAVE_FAIL, payload: "Falha ao atualizar a doação produto" });
  }
};

const DeleteDonation = (donation) => async (dispatch, getState) => {
  try {
    const {
      UserLogin: { userInfo },
    } = getState();

    dispatch({ type: DONATION_DELETE_REQUEST });
    if (donation.type === "Bancária") {
      const { data } = await api.delete(`donation/api/delete/${donation._id}`, {
        headers: {
          Authorization: "Bearer " + userInfo.data.token,
        },
      });
      dispatch({ type: DONATION_DELETE_SUCESS, payload: data, sucess: true });
    } else {
      const { data } = await api.delete(`donationProduct/api/delete/${donation._id}`, {
        headers: {
          Authorization: "Bearer " + userInfo.data.token,
        },
      });
      dispatch({ type: DONATION_DELETE_SUCESS, payload: data, sucess: true });
    }

  } catch (error) {
    dispatch({ type: DONATION_DELETE_FAIL, payload: "Problema ao deletar a donation" });
  }
};

const ListDonations = (name="") => async (dispatch, getState) => {
  try {
    const {
      UserLogin: { userInfo },
    } = getState();

    dispatch({ type: DONATION_LIST_REQUEST });

    const { data } = await api.get(`donationsAll/api/search?searchName=${name}`, {
      headers: {
        Authorization: "Bearer " + userInfo.data.token,
      },
    });
    dispatch({ type: DONATION_LIST_SUCESS, payload: data, sucess: true });
  } catch (error) {
    dispatch({ type: DONATION_LIST_FAIL, payload: error.message });
  }
};

const DetailOrder = (orderId) => async (dispatch, getState) => {
  try {
    const {
      UserLogin: { userInfo },
    } = getState();

    dispatch({ type: DONATION_DETAIL_REQUEST });

    const { data } = await api.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({
      type: DONATION_DETAIL_SUCESS,
      payload: data.data,
      sucess: true,
    });
  } catch (error) {
    dispatch({ type: DONATION_DETAIL_FAIL, payload: error.message });
  }
};

export { RegisterBank,RegisterProd, DeleteDonation, ListDonations, DetailOrder };
