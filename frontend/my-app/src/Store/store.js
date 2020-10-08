import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {
  UserReducerSignin,
  UserReducerRegister,
  UserReducerUpdate,
} from "../Reducers/UserReducer";

import {
  AnimalsListReducer,
  AnimalDeleteReducer,
  AnimalRegisterReducer,
  AnimalDetailsReducer,
} from "../Reducers/AnimalReducer";

import {
  FAQDeleteReducer,
  FAQDetailsReducer,
  FAQListReducer,
  FAQRegisterReducer
}from '../Reducers/FAQReducer'

import {
  DONATIONDeleteReducer,
  DONATIONListReducer,
  DONATIONRegisterReducer,
  DetailDONATIONReducer
} from '../Reducers/DonationReducer'

import Cookie from "js-cookie";

const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = {
  UserLogin: { userInfo },
};

// Aqui irá ficar combinado todas as minhas reducers
const reducer = combineReducers({
  UserLogin: UserReducerSignin,
  UserRegister: UserReducerRegister,
  UserUpdate: UserReducerUpdate,

  AnimalList: AnimalsListReducer,
  AnimalDetail:AnimalDetailsReducer,
  AnimalRegister:AnimalRegisterReducer,
  AnimalDelete:AnimalDeleteReducer,

  FAQList: FAQListReducer,
  FAQDetail:FAQDetailsReducer,
  FAQRegister:FAQRegisterReducer,
  FAQDelete:FAQDeleteReducer,

  DonationList: DONATIONListReducer,
  DonationDetail:DetailDONATIONReducer,
  DonationRegister:DONATIONRegisterReducer,
  DonationDelete:DONATIONDeleteReducer
});
const composeEnnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnnhancer(applyMiddleware(thunk))
);

export default store;
