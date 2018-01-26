import axios from 'axios';
import { API_URL } from '../utils/url';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import qs from 'qs';
import { setLoader } from './loader.action';


export const SET_INTERVIEW_SESSION = 'SET_INTERVIEW_SESSION'
export const ADD_INTERVIEW_SESSION = 'ADD_INTERVIEW_SESSION'
export const GET_INTERVIEW_SESSION_BYID = 'GET_INTERVIEW_SESSION_BYID'
export const UPDATE_INTERVIEW_SESSION = 'UPDATE_INTERVIEW_SESSION'
export const DELETE_INTERVIEW_SESSION = 'DELETE_INTERVIEW_SESSION'
export const INTERVIEW_SESSION_ERROR = 'INTERVIEW_SESSION_ERROR'


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

export const setInterviewSessions = (interviewSessions) => {
    return {
        type: SET_INTERVIEW_SESSION,
        payload: {
            interviewSessions: interviewSessions
        }
    }
}
export function interviewSessionError(error) {
    return {
        type: INTERVIEW_SESSION_ERROR,
        payload: {
            error: error
        }
    }
}

export const addInterviewSession = (interviewSession) => {
    console.log('add session', interviewSession)
    return {
        type: ADD_INTERVIEW_SESSION,
        payload: {
            interviewSession: interviewSession
        }

    }
}


export const setUpdatedInterviewSession = (interviewSession) => {
    return {
        type: UPDATE_INTERVIEW_SESSION,
        payload: {
            interviewSession: interviewSession
        }
    }
}


export const setInterviewSessionById = (interviewSession) => {
    return {
        type: GET_INTERVIEW_SESSION_BYID,
        payload: {
            interviewSession: interviewSession
        }
    }
}


export const deleteInterviewSessionById = (interviewSessionId) => {
    return {
        type: DELETE_INTERVIEW_SESSION,
        payload: {
            interviewSessionId: interviewSessionId
        }
    }
}


export const fetchInterviewSessionHistory = () => {
    return dispatch => {
        dispatch(setLoader(true));
        axios.get(`${API_URL}/api/v1/interviewsession/history`)
            .then(res => {
                dispatch(setLoader(false));
                dispatch(setInterviewSessions(res.data.Data));
            })
            .catch((err) => {
                dispatch(interviewSessionError(err.response.message))
            });
    }
}


export const fetchActiveInterviewSessions = () => {
    return dispatch => {
        dispatch(setLoader(true));
        axios.get(`${API_URL}/api/v1/interviewsession/active`)
            .then(res => {
                dispatch(setLoader(false));
                dispatch(setInterviewSessions(res.data.Data));
            })
            .catch((err) => {
                dispatch(interviewSessionError(err.response.message))
            });
    }
}

export const fetchAllInterviewSessions = () => {
    return dispatch => {
        dispatch(setLoader(true));
        axios.get(`${API_URL}/api/v1/interviewsession/get`)
            .then(res => {
                dispatch(setLoader(false));
                dispatch(setInterviewSessions(res.data.Data));
            })
            .catch((err) => {
                dispatch(interviewSessionError(err.response.message))
            });
    }
}





// Save department
export function saveInterviewSession(data) {
    return dispatch => {
        return fetch(`${API_URL}/api/v1/interviewsession/new`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addInterviewSession(data.Data)));;
    }
}




export const fetchInterviewSessionById = (id) => {
    return dispatch => {
        dispatch(setLoader(true));
        axios.get(`${API_URL}/api/v1/interviewsession/get/${id}`)
            .then(res => {
                dispatch(setLoader(false));
                dispatch(setInterviewSessionById(res.data.Data));
            })
            .catch((err) => {
                dispatch(interviewSessionError(err.response.message))
            });
    }
}


export function updateInterviewSession(data) {
    return dispatch => {
        return axios({
            method: 'PUT',
            url: `${API_URL}/api/v1/interviewsession/update`,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then((res) => {
            dispatch(setUpdatedInterviewSession(data))
            alert('Interview session updated');
        })
            .catch((err) => {
                dispatch(interviewSessionError(err.response.Message))
            });


    }
}

export function deleteInterviewSession(id) {
    return dispatch => {
        return axios({
            method: 'PUT',
            url: `${API_URL}/api/v1/interviewsession/delete/${id}`,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        })
            .then((res) => {
                dispatch(deleteInterviewSessionById(id))
                console.log("response here...", res)
            })
        // .catch((err) => {
        //     dispatch(interviewSessionError(err.data.Message))
        // });
    }
}
