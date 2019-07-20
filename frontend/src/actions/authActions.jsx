import { GET_ERRORS } from './types';
import axios from 'axios';
import { setAuthToken } from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from './types'
 
export const regitserUser = (userData,history) => dispatch =>{
    axios
        .post('http://localhost:5000/api/users/register',userData)
        .then(res => history.push('/login'))
        .catch(err => 
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
};
 
//login -Get user token

export const loginUser =(userData) =>dispatch =>{
  axios
    .post('http://localhost:5000/api/users/login',userData)
    .then( res =>{

      //save to localstorage
      const { token } =res.data;

      //set token to localStorage
      localStorage.setItem('jwt',token);

      //set token to auth header
      setAuthToken(token);

      //decode token to get user data
      const decoded = jwt_decode(token);

      //set current user
      dispatch(setCurrentUser(decoded));
      
    })
    .catch( err =>
      dispatch({
        type:GET_ERRORS,
        payload:err.response.data
      })
    )
};

export const setCurrentUser = decoded =>{
  return{
    type:SET_CURRENT_USER, 
    payload: decoded
  };
};


export const logoutUser =() =>dispatch=>{
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}