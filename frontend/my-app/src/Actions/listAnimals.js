import api from "../api/api";
import {
  ANIMAL_LIST_FAIL,
  ANIMAL_LIST_SUCESS,
  ANIMAL_LIST_REQUEST,
  ANIMAL_DETAILS_REQUEST,
  ANIMAL_DETAILS_SUCESS,
  ANIMAL_DETAILS_FAIL,
} from "../constants/AnimalConstants";

const listAnimals = (name="") => async (dispatch) => {
  try {
    // Disparo a action PRODUCT_LIST_REQUEST que irá realizar o loading
    dispatch({ type: ANIMAL_LIST_REQUEST });
    // console.log("LISTPRODUCTS= ",category,searchKeyword,sortOrder)
    const { data } = await api.get(
      "animal/api/search?searchName="+name);
    // Disparo a action que irá carregar as listas
    dispatch({ type: ANIMAL_LIST_SUCESS, payload: data });
  } catch (error) {
    dispatch({ type: ANIMAL_LIST_FAIL, payload: error.message });
  }
};
// animal/api/search?searchName=Mark

const AnimalDetails = (AnimalID) => async (dispatch) => {
  try {
    dispatch({ type: ANIMAL_DETAILS_REQUEST, payload: AnimalID });
    const product = await api.get(`animal/api/${AnimalID}`);
    dispatch({ type: ANIMAL_DETAILS_SUCESS, payload: product.data });
  } catch (error) {
    dispatch({ type: ANIMAL_DETAILS_FAIL, payload: error.message });
  }
};


export { listAnimals,AnimalDetails };
