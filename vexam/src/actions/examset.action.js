import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import qs from 'qs'


export const SET_EXAMSETS = 'SET_EXAMSETS'
export const ADD_EXAMSET = 'ADD_EXAMSET'
export const GET_EXAMSETBYID = 'GET_EXAMSETBYID'
export const UPDATE_EXAMSET = 'UPDATE_EXAMSET'
export const DELETE_EXAMSET = 'DELETE_EXAMSET'

export const ADD_QUESTION_TO_SET = 'ADD_QUESTION_TO_SET' 
export const DELETE_QUESTION_FROM_SET = 'DELETE_QUESTION_FROM_SET'
export const SAVE_EXAM_QUESTION = 'SAVE_EXAM_QUESTION'
export const SET_QUESTIONS_BY_EXAM_SET ='SET_QUESTIONS_BY_EXAM_SET'
export const QUESTION_BANK_ERROR ='QUESTION_BANK_ERROR'
export const SET_QUESTIONID_BY_EXAM_SET ='SET_QUESTIONID_BY_EXAM_SET'

const URL = 'http://localhost:5000';



// handle the post response
function handleResponse(response) {
  if (response.ok) {
      console.log('success')
    return response.json();
  } else {
    let error = new Error(response.statusText);
      console.log(error)
    
    error.response = response;
    throw error;
  }
}



export const setExamSets = (examsets) => {
    return {
        type: SET_EXAMSETS,
        payload: {
            examsets
        }
    }
}


export const addExamSet = (examset) => {
    return {
        type: ADD_EXAMSET,
        payload: {
            examset
        }
    }
}


export const setQuestionIdByExamSet = (setQuestions) => {
     console.log("fetchSetQuestionIdByExamSet ",setQuestions);
    return {
        type: SET_QUESTIONID_BY_EXAM_SET,
         payload: {
            setQuestions:setQuestions
        }
    }
}


export const setQuestionsByExamSet = (setQuestions) => {
     console.log("fetchSetQuestionsByExamSet ",setQuestions);
    return {
        type: SET_QUESTIONS_BY_EXAM_SET,
         payload: {
            setQuestionList:setQuestions
        }
    }
}


export const questionBankError = (message) => {
    return {
        type: QUESTION_BANK_ERROR,
       payload: {
            message:message
        }
    }
}
export const setUpdatedExamSet = (examset) => {
    return {
        type: UPDATE_EXAMSET,
        examset
    }
}


export const setExamSetById = (examset) => {
    return {
        type: GET_EXAMSETBYID,
        payload: {
            examset:examset
        }
    }
}

export const deleteExamSetById = (examSetId) => {
    
    return {
        type: DELETE_EXAMSET,
      payload: {
            examSetId:examSetId
        }
    }
}


export function addQuestionToExamSet(questionId) {
    return {
        type: ADD_QUESTION_TO_SET,
        payload: {
            questionId
        }
    }
}

export function deleteQuestionFromExamSet(questionId) {
    return {
        type: DELETE_QUESTION_FROM_SET,
        payload: {
            questionId
        }
    }
}


export function saveExamQuestionForSet(data){
    console.log('data',data)
    return {
        type: SAVE_EXAM_QUESTION,
        payload: {
            data
        }
    }
}


export const fetchExamSets = () => {
    // fetch data from api
    // dispatch a new state on receiving data data.Data
    // thunk middle ware help in calling actions as funcitons

    return dispatch => {
        fetch(`${URL}/api/v1/examset/get/all`)
            .then(res => res.json())
            .then(data => dispatch(setExamSets(data.Data)))
    }
}



// Save department
export function saveExamSet(data) {
    console.log(data)
    return dispatch => {
        return fetch(`${URL}/api/v1/examset/new/set`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(addExamSet(data.Data)));
    }
}



export function fetchExamSetById(id){
    return dispatch => {
        fetch(`${URL}/api/v1/examset/get/${id}`)
            .then(res => res.json())
            .then(data => dispatch(setExamSetById(data.Data)))
    }
}

export function fetchSetQuestionsByExamSet(id) {
   
    return dispatch => {
        axios.get(`${URL}/api/v1/examset/question/get/${id}`)
            .then(res => dispatch(setQuestionsByExamSet(res.data.Data)))
            .catch((err) => {
                dispatch(questionBankError(err.response.message))
            });
    }
}


export function updateExamSet(data) {
    return dispatch => {
        return axios({
            method: 'PUT',
            url: `${URL}/api/v1/examset/update`,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        })
            .then()
            .catch((err) => {
                dispatch(questionBankError(err.response.data))
            });
    }
}


export function deleteExamSet(id){
    return dispatch => {
        return fetch(`${URL}/api/v1/examset/delete/${id}`, {
            method: 'put',
           dataType: 'json',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(deleteExamSetById(id)));
    }
}

export function saveExamSetQuestions(data){
    return dispatch => {
        return fetch(`${URL}/api/v1/examset/question/add`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        })
        .then(handleResponse)
        .then(data=> dispatch(saveExamQuestionForSet(data.Data)))
    }
}


export function isInExamSet(state, props) {

   return state.examsets.setQuestions.indexOf(props.QuestionId) !== -1;
}

// export function allAddedInExamSet(state,props){
//      var result = state.questions.filter(function(fs) {
//         return state.examsets.setQuestions.some(function(ff) { 
//             let setQuestionArray = [];
//             setQuestionArray.push(fs.QuestionId)
//             return setQuestionArray.indexOf(ff) > -1 });
//      });
   
// }



export function getQuestionFromExamSet(state, props) {
    return state.examsets.setQuestions.map(id => getQuestion(state, { id }));
}

export function getQuestion(state,props) {
    //
}

