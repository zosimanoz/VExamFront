import axios from 'axios'
import { API_URL } from '../utils/url';
import { setLoader } from './loader.action';

export const SET_QUESTION_CATEGORY = 'SET_QUESTION_CATEGORY'
export const ADD_QUESTION_CATEGORY = 'ADD_QUESTION_CATEGORY'
export const GET_QUESTION_CATEGORY_BYID = 'GET_QUESTION_CATEGORY_BYID'
export const UPDATE_QUESTION_CATEGORY = 'UPDATE_QUESTION_CATEGORY'
export const DELETE_QUESTION_CATEGORY = 'DELETE_QUESTION_CATEGORY'



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


export const setQuestionCategoryById = (questionCategory) => {
    return {
        type: GET_QUESTION_CATEGORY_BYID,
        payload: {
            questionCategory: questionCategory
        }
    }
}

export const deleteQuestionCategoryById = (questionCategoryId) => {
    return {
        type: DELETE_QUESTION_CATEGORY,
        questionCategoryId
    }
}


export const fetchQuestionCategoryList = () => {
    // fetch data from api
    // dispatch a new state on receiving data data.Data
    // thunk middle ware help in calling actions as funcitons

    return dispatch => {
        dispatch(setLoader(true));
        axios.get(`${API_URL}/api/v1/question/category/get/all`)
            .then(res => {
                dispatch(setLoader(false));
                dispatch(setQuestionCategories(res.data.Data))
            })
    }
}



// Save department
export function saveQuestionCategory(data) {
    return dispatch => {
        return axios({
            url: `${API_URL}/api/v1/question/category/new`,
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        })
            .then(res => dispatch(addQuestionCategory(res.data.Data)));;
    }
}



export function fetchQuestionCategoryById(id) {
    return dispatch => {
        axios.get(`${API_URL}/api/v1/question/category/get/${id}`)
            .then(res => {
                console.log(res.data.Data)
                dispatch(setQuestionCategoryById(res.data.Data))
            })
    }
}


export function updateQuestionCategory(data) {
    return dispatch => {
        return axios({
            url: `${API_URL}/api/v1/question/category/update`,
            method: 'put',
            dataType: 'json',
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        })
            .then(res => dispatch(setUpdateQuestionCategory(res.data.Data)));
    }
}


export function deleteQuestionCategory(id) {

    return dispatch => {
        return axios({
            url: `${API_URL}/api/v1/question/category/delete/${id}`,
            method: 'put',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        })
            .then(res => dispatch(deleteQuestionCategoryById(id)));
    }
}
