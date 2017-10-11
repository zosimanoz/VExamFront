import axios from 'axios';
import { URL } from '../utils/url';

import setAuthorizationToken from '../utils/setAuthorizationToken';



export const SET_INTERVIEWEE = 'SET_INTERVIEWEE'
export const ADD_INTERVIEWEE = 'ADD_INTERVIEWEE'
export const GET_INTERVIEWEE_BYID = 'GET_INTERVIEWEE_BYID'
export const UPDATE_INTERVIEWEE = 'UPDATE_INTERVIEWEE'
export const DELETE_INTERVIEWEE = 'DELETE_INTERVIEWEE'
export const GET_INTERVIEWEE_BY_SSESSIONID = 'GET_INTERVIEWEE_BY_SSESSIONID'
export const INTERVIEWEE_ERROR= 'INTERVIEWEE_ERROR'


export const error = (error) => {
    return {
        type: INTERVIEWEE_ERROR,
        payload: {
            error: error
        }
    }
}

export const setInterviewees = (interviewees) => {
 console.log('121212',interviewees);
    return {
        type: SET_INTERVIEWEE,
        payload: {
            interviewees: interviewees
        }
    }
}


export const addInterviewee = (interviewee) => {
    return {
        type: ADD_INTERVIEWEE,
        payload: {
            interviewee: interviewee
        }
    }
}


export const setUpdatedInterviewee = (interviewee) => {
    return {
        type: UPDATE_INTERVIEWEE,
        payload: {
            interviewee: interviewee
        }
    }
}


export const setIntervieweeById = (interviewee) => {
    return {
        type: GET_INTERVIEWEE_BYID,
        payload: {
            interviewee: interviewee
        }
    }
}

export const deleteIntervieweeById = (IntervieweeId) => {
    return {
        type: DELETE_INTERVIEWEE,
        payload: {
            IntervieweeId: IntervieweeId
        }
    }
}


export const fetchInterviewees = () => {
   return dispatch => {
        axios.get(`${URL}/api/v1/interviewee/get/all`)
            .then(res => dispatch(setInterviewees(res.data.Data)))
            .catch((err) => {
                dispatch(error(err.response.data))
            });
    }
}

export const fetchIntervieweesBySessionId = (id) => {
    console.log('session id to fetch interviewees',id);
   return dispatch => {
        axios.get(`${URL}/api/v1/interviewee/get/session/${id}`)
            .then((res) => {
                dispatch(setInterviewees(res.data.Data))
            })
            .catch((err) => {
                dispatch(error(err.response))
            });
    }
}



// Save department
export function saveInterviewee(data) {
 return dispatch => {
        return axios({
            method: 'POST',
            url: `${URL}/api/v1/interviewee/new`,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(res => dispatch(addInterviewee(res.data.Data)))
            .catch((err) => {
                dispatch(error(err.response.Message))
            });
    }
}



export function fetchIntervieweeById(id) {
 return dispatch => {
        axios.get(`${URL}api/v1/interviewee/get/${id}`)
            .then(res => dispatch(setIntervieweeById(res.data.Data)))
            .catch((err) => {
                dispatch(error(err.response.Message))
            });
    }
}


export function updateInterviewee(data) {

 return dispatch => {
        return axios({
            method: 'PUT',
            url: `${URL}/api/v1/interviewee/update`,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(res => dispatch(setUpdatedInterviewee(data)))
            .catch((err) => {
                dispatch(error(err.response.Message))
            });
    }

}


export function deleteInterviewee(id) {

 return dispatch => {
        return axios({
            method: 'PUT',
            url: `${URL}/api/v1/interviewee/delete/${id}`,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(res => dispatch(deleteIntervieweeById(id)))
            .catch((err) => {
                dispatch(error(err.response.Message))
            });
    }
}
