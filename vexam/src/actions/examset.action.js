export const SET_EXAMSETS = 'SET_EXAMSETS'
export const ADD_EXAMSET = 'ADD_EXAMSET'
export const GET_EXAMSETBYID = 'GET_EXAMSETBYID'
export const UPDATE_EXAMSET = 'UPDATE_EXAMSET'
export const DELETE_EXAMSET = 'DELETE_EXAMSET'

export const ADD_QUESTION_TO_SET = 'ADD_QUESTION_TO_SET' 
export const DELETE_QUESTION_FROM_SET = 'DELETE_QUESTION_FROM_SET'


const URL = 'http://localhost:5000';



// handle the post response
function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}


// set games action is dispatched when data is received
// this action sets a new state with type and dispatch data 
// to the store. After it recives the new state, we need to implement
// the reducer to respond to the change in data and state
// So, lets jump into the department.reducer

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
            examset
        }
    }
}

export const deleteExamSetById = (examset) => {
    return {
        type: DELETE_EXAMSET,
        examset
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


export const fetchExamSets = () => {
    // fetch data from api
    // dispatch a new state on receiving data data.Data
    // thunk middle ware help in calling actions as funcitons

    return dispatch => {
        fetch(`${URL}/api/v1/examset/get/all/sets`)
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


export function updateExamSet(data){
     return dispatch => {
        return fetch(`${URL}/api/v1/examset/update`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(setUpdatedExamSet(data.Data)));
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


export function isInExamSet(state, props) {
    console.log("state",state.examsets.setQuestions)
    return state.examsets.setQuestions.indexOf(props.QuestionId) !== -1;
}

export function getQuestionFromExamSet(state, props) {
    return state.examsets.setQuestions.map(id => getQuestion(state, { id }));
}

export function getQuestion(state,props) {
    //
}