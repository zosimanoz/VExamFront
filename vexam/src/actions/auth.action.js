import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
//import jwt from 'jsonwebtoken';

import qs from 'qs'


export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const SET_CURRENT_USER = 'SET_CURRENT_USER'


const URL = 'http://localhost:5000';


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('access_token');
    setAuthorizationToken(false);
   // dispatch(setCurrentUser({}));
  }
}

export function login(creds) {
  var data = qs.stringify({ 'emailAddress': creds.Email, 'password': creds.Password });

  return dispatch => {
    return axios.post(`${URL}/api/v1/token/interviewee`,data)
          .then((res)=>{ 
              const token = res.data.access_token;
              localStorage.setItem('access_token', token);
              setAuthorizationToken(token);
             // console.log(jwt.decode(token));
          });
  }
}

export const loadUserFromToken = () => {
    let token = localStorage.getItem('access_token');
    if(!token || token === ''){
        return;
    }

   // dispatch(meFromToken(token));
}