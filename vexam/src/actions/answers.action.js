import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import qs from 'qs'

import { SET_QUESTIONS_WITH_ANSWER } from './examQuiz.action'

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


export function setAnsSuccess(question_state) {
  return {
    type: SET_ANSWERS_SUCCESS,
    payload: {
      question_state: question_state
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


export function setUpdatedQuestionsWithAnswers(question_state) {
  return {
    type: SET_QUESTIONS_WITH_ANSWER,
    payload: {
      question_state : question_state
    }
  }
}


export function setAnswersToStore(question_state) {
  return dispatch => {
    dispatch(setAnsStart());
    dispatch(setUpdatedQuestionsWithAnswers(question_state));
    dispatch(setAnsSuccess(question_state));    
  }
}

export function setSubjectiveAnswerToStore(question_state){
  console.log('anser ', question_state)
  return dispatch => {
    dispatch(setSubjectiveAnswerStart());
    dispatch(setUpdatedQuestionsWithAnswers(question_state));
    dispatch(setSubjectiveAnswerSuccess(question_state));   
  }
}

