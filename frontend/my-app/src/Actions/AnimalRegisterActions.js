import api from "../api/api";
import {
  ANIMAL_LIST_FAIL,
  ANIMAL_LIST_SUCESS,
  ANIMAL_LIST_REQUEST,
  ANIMAL_DETAILS_REQUEST,
  ANIMAL_DETAILS_SUCESS,
  ANIMAL_DETAILS_FAIL,
  ANIMAL_REGISTER_FAIL,
  ANIMAL_REGISTER_REQUEST,
  ANIMAL_REGISTER_SUCESS,
  ANIMAL_DELETE_FAIL,
  ANIMAL_DELETE_SUCESS,
  ANIMAL_DELETE_REQUEST,
} from "../constants/AnimalConstants";

const Register = (animal) => async (dispatch, getState) => {
  try {
    dispatch({ type: ANIMAL_REGISTER_REQUEST });
    const {
      UserLogin: { userInfo },
    } = getState();
    // Caso
    if (!animal._id) {
      const { data } = await api.post("animal/api/create", animal, {
        headers: {
          Authorization: "Bearer " + userInfo.data.token,
        },
      });
      dispatch({ type: ANIMAL_REGISTER_SUCESS, payload: data });
    } else {
      const { data } = await api.put(
        'animal/api/put/'+animal._id,
        animal,
        {
          headers: {
            Authorization: "Bearer " + userInfo.data.token,
          },
        }
        );
        dispatch({ type: ANIMAL_REGISTER_SUCESS, payload: data });
      }
    // Disparo a action que irá carregar as listas
  } catch (error) {
    dispatch({ type: ANIMAL_REGISTER_FAIL, payload: "Falha ao atualizar animal" });
  }
};
const Delete = (animal) => async (dispatch, getState) => {
  try {
    const {
      UserLogin: { userInfo },
    } = getState();
    dispatch({ type: ANIMAL_DELETE_REQUEST, payload: animal });

    const {data} = await api.delete('animal/api/delete/'+ animal,{
      headers:{
        Authorization: "Bearer " + userInfo.data.token,
      }
    });
    // console.log("DATA DELETE",product)
    dispatch({ type: ANIMAL_DELETE_SUCESS, payload: data,sucess:true});
  } catch (error) {
    dispatch({ type: ANIMAL_DELETE_FAIL, payload: "Falha ao deletar o animal"});
  }
};



export { Register,Delete};
