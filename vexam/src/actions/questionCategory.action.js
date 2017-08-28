
export const SET_QUESTION_CATEGORY = 'SET_QUESTION_CATEGORY'
export const ADD_QUESTION_CATEGORY = 'ADD_QUESTION_CATEGORY'
export const GET_QUESTION_CATEGORY_BYID = 'GET_QUESTION_CATEGORY_BYID'
export const UPDATE_QUESTION_CATEGORY = 'UPDATE_QUESTION_CATEGORY'
export const DELETE_QUESTION_CATEGORY = 'DELETE_QUESTION_CATEGORY'


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

export const setQuestionCategories = (questionCategories) => {
    return {
        type: SET_QUESTION_CATEGORY,
        questionCategories
    }
}


export const addQuestionCategory = (questionCategory) => {
    return {
        type: ADD_QUESTION_CATEGORY,
        questionCategory
    }
}


export const setUpdateQuestionCategory = (questionCategory) => {
    return {
        type: UPDATE_QUESTION_CATEGORY,
        questionCategory
    }
}


export const setQuestionCategoryById = (questionCategories) => {
    return {
        type: GET_QUESTION_CATEGORY_BYID,
        questionCategories
    }
}

export const deleteQuestionCategoryById = (questionCategory) => {
    return {
        type: DELETE_QUESTION_CATEGORY,
        questionCategory
    }
}


export const fetchQuestionCategoryList = () => {
    // fetch data from api
    // dispatch a new state on receiving data data.Data
    // thunk middle ware help in calling actions as funcitons

    return dispatch => {
        fetch(`${URL}/api/v1/question/category/get/all`)
            .then(res => res.json())
            .then(data => dispatch(setQuestionCategories(data.Data)))
    }
}



// Save department
export function saveQuestionCategory(data) {
    return dispatch => {
        return fetch(`${URL}/api/v1/question/category/new`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(addQuestionCategory(data.Data)));;
    }
}



export function fetchQuestionCategoryById(id){
    return dispatch => {
        fetch(`${URL}/api/v1/question/category/get/${id}`)
            .then(res => res.json())
            .then(data => dispatch(setQuestionCategoryById(data.Data)))
    }
}


export function updateQuestionCategory(data){
     return dispatch => {
        return fetch(`${URL}/api/v1/question/category/update`, {
            method: 'put',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(setUpdateQuestionCategory(data.Data)));
    }
}


export function deleteQuestionCategory(id){

    return dispatch => {
        return fetch(`${URL}/api/v1/question/category/delete/${id}`, {
            method: 'put',
           dataType: 'json',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(deleteQuestionCategoryById(id)));
    }
}
