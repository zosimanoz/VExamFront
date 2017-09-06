import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';

export const SET_QUESTIONS = 'SET_QUESTIONS'
export const ADD_QUESTIONS = 'ADD_QUESTIONS'
export const GET_QUESTIONBYID = 'GET_QUESTIONBYID'
export const UPDATE_QUESTION = 'UPDATE_QUESTION'
export const DELETE_QUESTION = 'DELETE_QUESTION'
export const SET_FILTERED_QUESTION = 'SET_FILTERED_QUESTION'
export const QUESTION_ERROR = 'QUESTION_ERROR'



const URL = 'http://localhost:5000';


export const setQuestions = (questions) => {
    return {
        type: SET_QUESTIONS,
        payload: {
            questions: questions
        }

    }
}
export function questionBankError(error) {
    return {
        type: QUESTION_ERROR,
        payload: {
            error: error
        }
    }
}

export const addQuestion = (question) => {
    return {
        type: ADD_QUESTIONS,
        payload: {
            question: question
        }
    }
}


export const setUpdatedQuestion = (question) => {
    return {
        type: UPDATE_QUESTION,
        payload: {
            question: question
        }
    }
}


export const setQuestionById = (question) => {
    return {
        type: GET_QUESTIONBYID,
        payload: {
            question: question
        }
    }
}

export const deleteQuestionById = (questionId) => {
    return {
        type: DELETE_QUESTION,
        payload: {
            questionId: questionId
        }
    }
}


export const filteredQuestion = (questions) => {
    return {
        type: SET_FILTERED_QUESTION,
        payload: {
            questions: questions
        }
    }
}


export const fetchQuestions = () => {
    return dispatch => {
        axios.get(`${URL}/api/v1/questionbank/select`)
            .then(res => dispatch(setQuestions(res.data.Data)))
            .catch((err) => {
                dispatch(questionBankError(err.response.data))
            });
    }
}



// Save department
export function saveQuestion(data) {
    return dispatch => {
        return axios({
            method: 'POST',
            url: `${URL}/api/v1/questionbank/new`,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(res => dispatch(addQuestion(res.data.Data)))
            .catch((err) => {
                dispatch(questionBankError(err.response.data))
            });
    }
}



export function fetchQuestionById(id) {
    return dispatch => {
        axios.get(`${URL}/api/v1/questionbank/get/${id}`)
            .then(res => dispatch(setQuestionById(res.data.Data)))
            .catch((err) => {
                dispatch(questionBankError(err.response.data))
            });
    }
}


export function updateQuestion(data) {
    return dispatch => {
        return axios({
            method: 'PUT',
            url: `${URL}/api/v1/questionbank/update`,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        })
            .then(res => dispatch(setUpdatedQuestion(res.data.Data)))
            .catch((err) => {
                dispatch(questionBankError(err.response.data))
            });
    }
}


export function deleteQuestion(id) {

    return dispatch => {
                return axios({
            method: 'PUT',
            url: `${URL}/api/v1/questionbank/delete/${id}`,
          
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        })
        .then(res => dispatch(deleteQuestionById(id)))
        .catch((err) => {
                dispatch(questionBankError(err.response.data))
            });
    }
}


export function filterQuestionForExamSet(data) {
    return dispatch => {
        return axios(`${URL}/api/v1/questionbank/search?QuestionTypeId=${data.QuestionTypeId}&QuestionCategoryId=${data.QuestionCategoryId}&JobTitleId=${data.JobTitleId}&QuestionComplexityId=${data.QuestionComplexityId}&Question=${data.Question}`)
            .then(res => dispatch(filteredQuestion(res.data.Data)))
            .catch((err) => {
                dispatch(questionBankError(err.response.data))
            });
    }
}