import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import qs from 'qs'

//Get current user(me) from token in localStorage
export const SET_ANSWERS = 'SET_ANSWERS';
export const SET_ANSWERS_SUCCESS = 'SET_ANSWERS_SUCCESS';
export const SET_SUBJECTIVE_ANSWERS_START = 'SET_SUBJECTIVE_ANSWERS_START'
export const SET_SUBJECTIVE_ANSWER_SUCCESS = 'SET_SUBJECTIVE_ANSWER_SUCCESS'


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




export function setSubjectiveAnswerStart(){
  return {
    type: SET_SUBJECTIVE_ANSWERS_START
  }
}


export function setSubjectiveAnswerSuccess(answerList) {
  return {
    type: SET_SUBJECTIVE_ANSWER_SUCCESS,
    payload: {
      answerList : answerList
    }
  }
}


export function setAnswersToStore(answerList) {
  return dispatch => {
    dispatch(setAnsStart());
    dispatch(setAnsSuccess(answerList));    
  }
}

export function setSubjectiveAnswerToStore(answerList){
  console.log('anser ', answerList)
  return dispatch => {
    dispatch(setSubjectiveAnswerStart());
    dispatch(setSubjectiveAnswerSuccess(answerList));   
  }
}
