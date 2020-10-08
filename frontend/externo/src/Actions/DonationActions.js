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



const ListDonations = (name="") => async (dispatch, getState) => {
  try {

    dispatch({ type: DONATION_LIST_REQUEST });

    const { data } = await api.get(`donationsAll/api/search?searchName=${name}`);
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

export { ListDonations, DetailOrder };
