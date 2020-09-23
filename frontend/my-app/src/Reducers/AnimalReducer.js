// Constantes usadas para evitar erros de digitações
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
} from "../constants/AnimalConstants.js";

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
function AnimalRegisterReducer(state = { animals: {} }, action) {
  switch (action.type) {
    case ANIMAL_REGISTER_REQUEST:
      return { loading: true };
    case ANIMAL_REGISTER_SUCESS:
      return { loading: false, sucess: true, animals: action.payload };
    case ANIMAL_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function AnimalDeleteReducer(state = { animals: {} }, action) {
  switch (action.type) {
    case ANIMAL_DELETE_REQUEST:
      return { loading: true };
    case ANIMAL_DELETE_SUCESS:
      return { loading: false, sucess: true, animals: action.payload };
    case ANIMAL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function AnimalDetailsReducer(state = { animal: {} }, action) {
  switch (action.type) {
    case ANIMAL_DETAILS_REQUEST:
      return { loading: true };
    case ANIMAL_DETAILS_SUCESS:
      return { loading: false, animal: action.payload };
    case ANIMAL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  AnimalsListReducer,
  AnimalDeleteReducer,
  AnimalRegisterReducer,
  AnimalDetailsReducer,
};
