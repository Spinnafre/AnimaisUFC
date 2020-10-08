import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {
  AnimalsListReducer,
  AnimalDeleteReducer,
  AnimalRegisterReducer,
  AnimalDetailsReducer,
} from "../Reducers/AnimalReducer";

import {
  FAQDetailsReducer,
  FAQListReducer,
}from '../Reducers/FAQReducer'

import {
  DONATIONListReducer,
  DetailDONATIONReducer
} from '../Reducers/DonationReducer'

const initialState = {};

// Aqui irá ficar combinado todas as minhas reducers
const reducer = combineReducers({
  AnimalList: AnimalsListReducer,
  AnimalDetail:AnimalDetailsReducer,
  FAQList: FAQListReducer,
  FAQDetail:FAQDetailsReducer,
  DonationList: DONATIONListReducer,
  DonationDetail:DetailDONATIONReducer,

});

const composeEnnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnnhancer(applyMiddleware(thunk))
);

export default store;
