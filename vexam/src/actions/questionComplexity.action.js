import axios from 'axios';
import { API_URL } from '../utils/url';
import { setLoader } from './loader.action';

export const SET_QUESTION_COMPLEXITY = 'SET_QUESTION_COMPLEXITY'
export const ADD_QUESTION_COMPLEXITY = 'ADD_QUESTION_COMPLEXITY'
export const GET_QUESTION_COMPLEXITY_BYID = 'GET_QUESTION_COMPLEXITY_BYID'
export const UPDATE_QUESTION_COMPLEXITY = 'UPDATE_QUESTION_COMPLEXITY'
export const DELETE_QUESTION_COMPLEXITY = 'DELETE_QUESTION_COMPLEXITY'



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

export const setQuestionComplexity = (questionComplexities) => {
    return {
        type: SET_QUESTION_COMPLEXITY,
        questionComplexities
    }
}


export const addQuestionComplexity = (questionComplexity) => {
    return {
        type: ADD_QUESTION_COMPLEXITY,
        questionComplexity
    }
}


export const setUpdateQuestionComplexity = (questionComplexity) => {
    return {
        type: UPDATE_QUESTION_COMPLEXITY,
        questionComplexity
    }
}


export const setQuestionComplexityById = (questionComplexity) => {
    return {
        type: GET_QUESTION_COMPLEXITY_BYID,
        questionComplexity
    }
}

export const deleteQuestionComplexityById = (questionComplexityId) => {
    return {
        type: DELETE_QUESTION_COMPLEXITY,
        questionComplexityId
    }
}


export const fetchQuestionComplexityList = () => {
    // fetch data from api
    // dispatch a new state on receiving data data.Data
    // thunk middle ware help in calling actions as funcitons

    return dispatch => {
        dispatch(setLoader(true));
        return axios.get(`${API_URL}/api/v1/question/complexity/get/all`)
           // .then(res => res.json())
            .then(res => {
                console.log(res.data.Data)
                dispatch(setLoader(false))
                dispatch(setQuestionComplexity(res.data.Data))
            })
    }
}



// Save department
export function saveQuestionComplexity(data) {
    return dispatch => {
        return fetch(`${API_URL}/api/v1/question/complexity/new`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addQuestionComplexity(data.Data)));;
    }
}



export function fetchQuestionComplexityById(id) {
    return dispatch => {
        fetch(`${API_URL}/api/v1/question/complexity/get/${id}`)
            .then(res => res.json())
            .then(data => dispatch(setQuestionComplexityById(data.Data)))
    }
}


export function updateQuestionComplexity(data) {
    return dispatch => {
        return fetch(`${API_URL}/api/v1/question/complexity/update`, {
            method: 'put',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(setUpdateQuestionComplexity(data.Data)));
    }
}


export function deleteQuestionComplexity(id) {

    return dispatch => {
        return fetch(`${API_URL}/api/v1/question/complexity/delete/${id}`, {
            method: 'put',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(deleteQuestionComplexityById(id)));
    }
}
