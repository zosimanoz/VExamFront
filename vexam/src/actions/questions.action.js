export const SET_QUESTIONS = 'SET_QUESTIONS'
export const ADD_QUESTIONS = 'ADD_QUESTIONS'
export const GET_QUESTIONBYID = 'GET_QUESTIONBYID'
export const UPDATE_QUESTION = 'UPDATE_QUESTION'
export const DELETE_QUESTION = 'DELETE_QUESTION'
export const SET_FILTERED_QUESTION = 'SET_FILTERED_QUESTION'


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

export const setQuestions = (questions) => {
    return {
        type: SET_QUESTIONS,
        questions
    }
}


export const addQuestion = (question) => {
    return {
        type: ADD_QUESTIONS,
        question
    }
}


export const setUpdatedQuestion = (question) => {
    return {
        type: UPDATE_QUESTION,
        question
    }
}


export const setQuestionById = (question) => {
    return {
        type: GET_QUESTIONBYID,
        question
    }
}

export const deleteQuestionById = (question) => {
    console.log(question)
    return {
        type: DELETE_QUESTION,
        question
    }
}


export const filteredQuestion = (questions) => {
    return {
        type: SET_FILTERED_QUESTION,
        questions
    }
}


export const fetchQuestions = () => {
    // fetch data from api
    // dispatch a new state on receiving data data.Data
    // thunk middle ware help in calling actions as funcitons

    return dispatch => {
        fetch(`${URL}/api/v1/questionbank/get/all`)
            .then(res => res.json())
            .then(data => dispatch(setQuestions(data.Data)))
    }
}



// Save department
export function saveQuestion(data) {
    return dispatch => {
        return fetch(`${URL}/api/v1/questionbank/new`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(addQuestion(data.Data)));
    }
}



export function fetchQuestionById(id){
    return dispatch => {
        fetch(`${URL}/api/v1/questionbank/get/${id}`)
            .then(res => res.json())
            .then(data => dispatch(setQuestionById(data.Data)))
    }
}


export function updateQuestion(data){
     return dispatch => {
        return fetch(`${URL}/api/v1/questions/update`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(setUpdatedQuestion(data.Data)));
    }
}


export function deleteQuestion(id){

    return dispatch => {
        return fetch(`${URL}/api/v1/questionbank/delete/${id}`, {
            method: 'put',
           dataType: 'json',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(deleteQuestionById(id)));
    }
}


export function filterQuestionForExamSet(data){
    console.log(data)
    return dispatch => {
         return fetch(`${URL}/api/v1/questionbank/search?QuestionTypeId=${data.QuestionTypeId}&QuestionCategoryId=${data.QuestionCategoryId}&JobTitleId=${data.JobTitleId}&QuestionComplexityId=${data.QuestionComplexityId}&Question=${data.Question}`)
         .then(res=>res.json())
         .then(data => dispatch(filteredQuestion(data.Data)));
    }
}