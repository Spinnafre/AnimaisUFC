// Constantes usadas para evitar erros de digitações
import {
  ANIMAL_DETAIL_FAIL,
  ANIMAL_DETAIL_REQUEST,
  ANIMAL_DETAIL_SUCESS,
  ANIMAL_LIST_FAIL,
  ANIMAL_LIST_REQUEST,
  ANIMAL_LIST_SUCESS
} from "../constants/AnimalConstants";

// Reducar irá possuir um estado inicial e recebe action
function AnimalsListReducer(state = { animals: [] }, action) {
  switch (action.type) {
    case ANIMAL_LIST_REQUEST:
      return { loading: true, animals: [] };
    case ANIMAL_LIST_SUCESS:
      return { loading: false, animals: action.payload };
    case ANIMAL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function AnimalDetailsReducer(state = { animal: {} }, action) {
  switch (action.type) {
    case ANIMAL_DETAIL_REQUEST:
      return { loading: true };
    case ANIMAL_DETAIL_SUCESS:
      return { loading: false, animal: action.payload };
    case ANIMAL_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  AnimalsListReducer,
  AnimalDetailsReducer,
};
