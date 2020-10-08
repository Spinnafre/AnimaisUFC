import api from "../api/api";
import Cookie from "js-cookie";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCESS,
  REGISTER_REQUEST,
  REGISTER_REQUEST_ERROR,
  REGISTER_REQUEST_SUCESS,
  LOGOUT_SUCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCESS,
  RESET_USER_ERROR,
  RESET_USER_REQUEST,
  RESET_USER_SUCESS
} from "../constants/UserConstants";


const UpdateUser=({userID,email,password,confirmPassword})=>async(dispatch,getState)=>{
  try {
    dispatch({type:UPDATE_USER_REQUEST})
    // Estou pegando do meu estado a informação do usuário (email, senha,token,...)
    const {
      UserLogin: { userInfo },
    } = getState();
    const {data}=await api.put(`user/api/createUserAdm/updateUser/${userID}`,{email,password,confirmPassword},{
      // Estou definindo que para acesssar essa rota eu preciso dos dados do usuário no header
      headers:{
        'Authorization':'Bearer '+userInfo.data.token
      }
    })

    dispatch({type:UPDATE_USER_SUCESS,payload:data})
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({type:UPDATE_USER_ERROR,error:"Error ao tentar atualizar o usuário"})
  }
}

const ResetUser=({email,password,confirmPassword,token})=>async(dispatch)=>{
  try {
    dispatch({type:RESET_USER_REQUEST})
    const data=await api.post(`user/api/createUserAdm/reset_password`,{email,password,confirmPassword,token})
    dispatch({type:RESET_USER_SUCESS,payload:data})
  } catch (error) {
    dispatch({type:RESET_USER_ERROR,payload:"Error ao tentar atualizar o usuário"})
  }
}

const Login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST, payload: { email, password } });
    const data = await api.post("user/api/createUserAdm/login", { email, password });
    dispatch({ type: LOGIN_REQUEST_SUCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
    
  } catch (error) {
    dispatch({ type: LOGIN_REQUEST_ERROR, payload: "Usuário ou senha digitado errado ou não existe" });
  }
};
const Logout = () => async (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: LOGOUT_SUCESS });
};

const Register = (email, password, confirmPassword) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST, payload: { email, password, confirmPassword } });
    const data = await api.post("/user/api/createUserAdm/create", {
      email,
      password,
      confirmPassword
      
    });
    dispatch({ type: REGISTER_REQUEST_SUCESS, payload: data });
    Cookie.set('userInfo',JSON.stringify(data))
  } catch (error) {
    dispatch({ type: REGISTER_REQUEST_ERROR, payload: error.message });
  }
};


export { Login, Register,Logout,UpdateUser,ResetUser };
