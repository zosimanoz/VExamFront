import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import qs from 'qs'

//Get current user(me) from token in localStorage
export const SET_ANSWERS = 'SET_ANSWERS';
export const SET_ANSWERS_SUCCESS = 'SET_ANSWERS_SUCCESS';


const URL = 'http://localhost:5000';


export function setAnsStart(){
  return {
    type: SET_ANSWERS
  }
}

export function setAnsSuccess(answerList) {
  return {
    type: SET_ANSWERS_SUCCESS,
    payload: {
      answerList: answerList
    }
  }
}


export function setAnswersToStore(answerList) {
  return dispatch => {
    dispatch(setAnsStart());
    dispatch(setAnsSuccess(answerList));    
  }
}