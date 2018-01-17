import axios from 'axios';

import { API_URL } from '../utils/url';

import { setLoader } from './loader.action';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import qs from 'qs'

//Get current user(me) from token in localStorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';


//Sign In User
export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';


export const SIGN_IN_ADMIN_START = 'SIGN_IN_ADMIN_START';
export const SIGN_IN_ADMIN_SUCCESS = 'SIGN_IN_ADMIN_SUCCESS';
export const SIGN_IN_ADMIN_FAIL = 'SIGN_IN_ADMIN_FAIL';

//log out user
export const LOGOUT_USER = 'LOGOUT_USER';

export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';



export function signInStart() {
  return {
    type: SIGNIN_USER
  }
}

export function signInSuccess(user) {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: {
      user: user
    }
  }
}

export function signInFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: {
      error: error
    }
  }
}

export function removeCurrentUser(user) {
  console.log('user', user)
  return {
    type: REMOVE_CURRENT_USER,
    payload: {
      user: null
    }
  };
}


export function signInAdminStart() {
  return {
    type: SIGN_IN_ADMIN_START
  }
}

export function signInAdminSuccess(user) {
  return {
    type: SIGN_IN_ADMIN_SUCCESS,
    payload: {
      user: user
    }
  }
}

export function signInAdminFailure(error) {
  return {
    type: SIGN_IN_ADMIN_FAIL,
    payload: {
      error: error
    }
  }
}



export function clearErrors() {
  return {
    type: CLEAR_ERRORS
  }
}

export function clearErrorMessages() {
  return dispatch => {
    dispatch(clearErrors());
  }
}

export function login(creds) {
  var data = qs.stringify({ 'emailAddress': creds.Email, 'password': creds.Password });

  return dispatch => {
    dispatch(signInStart());
    dispatch(setLoader(true));
    return axios.post(`${API_URL}/api/v1/token/interviewee`, data)
      .then((res) => {
        dispatch(setLoader(false));
        const token = res.data.access_token;
        localStorage.setItem('access_token', token);
        setAuthorizationToken(token);
        dispatch(loadUserFromToken());
      }).catch((err) => {
        dispatch(signInFailure(err.response.data))
      });
  }
}




export function logout() {
  let token = localStorage.getItem('access_token');

  if (!token || token === '') {
    return;
  } else {
    return dispatch => {
      dispatch(setLoader(true));
      var data = qs.stringify({ 'accessToken': token });
      return axios.post(`${API_URL}/api/v1/logout`, data)
        .then((res) => {
          dispatch(setLoader(false));
          localStorage.removeItem('access_token');
          setAuthorizationToken(false);
          dispatch(removeCurrentUser({}));
        }).catch((err) => {
        });
    }
  }
}

export function meFromTokenStart() {
  return {
    type: ME_FROM_TOKEN,
    payload: {
      loading: true
    }
  }
}

export function meFromTokenSuccess(user) {
  console.log('user token bala', user)
  return {
    type: ME_FROM_TOKEN_SUCCESS,
    payload: {
      user: user,
      loading: false
    }
  }
}



export const loadUserFromToken = () => {

  let token = localStorage.getItem('access_token');

  if (!token || token === '') {
    return;
  } else {
    return (dispatch) => {
      dispatch(meFromTokenStart());
      var data = qs.stringify({ 'accessToken': token });
      return axios({
        method: 'post',
        url: `${API_URL}/api/v1/token/decode`,
        data: data
      })
        .then((res) => {
          dispatch(meFromTokenSuccess(res.data.Data));
        }).catch(error => {
          console.log(error);
        })
    }
  }
}





export function adminLogin(creds) {
  var data = qs.stringify({ 'emailAddress': creds.Email, 'password': creds.Password });

  return dispatch => {
    dispatch(signInAdminStart());
    dispatch(setLoader(true));
    return axios.post(`${API_URL}/api/v1/token/user`, data)
      .then((res) => {
        dispatch(setLoader(false));

        const token = res.data.access_token;
        localStorage.setItem('access_token', token);
        setAuthorizationToken(token);
        dispatch(loadUserFromToken());
      }).catch((err) => {
        console.log('errr object----->', err)
        dispatch(signInAdminFailure(err.response.data))
      });
  }
}











// export function setValidateEmail(user){
//    return {
//     type: VALIDATE_EMAIL,
//     payload: user
//   };
// }


// export function validateEmail(validateEmailToken) {
//   //check if token from welcome email is valid, if so, update email as verified and login the user from response
//   return dispatch => {
//     return axios.get(`${URL}/validateEmail/${validateEmailToken}`)
//            .then((res)=> {
//               dispatch(setValidateEmail(res.data.Data));
//            });
//   }
// }