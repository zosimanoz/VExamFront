import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import qs from 'qs'

export const SET_SESSION_JOBS = 'SET_SESSION_JOBS'
export const ADD_SESSION_JOBS = 'ADD_SESSION_JOBS'
export const GET_SESSION_JOB_BYID = 'GET_SESSION_JOB_BYID'
export const UPDATE_SESSION_JOB = 'UPDATE_SESSION_JOB'
export const DELETE_SESSION_JOB = 'DELETE_SESSION_JOB'
export const SESSION_ERROR = 'SESSION_ERROR'



const URL = 'http://localhost:5000';


export const setInterviewSessions = (sessionJobs) => {
    return {
        type: SET_SESSION_JOBS,
        payload:{
            sessionJobs:sessionJobs
        }
    }
}

export function sessionError(error) {
    return {
        type: SESSION_ERROR,
        payload: {
            error: error
        }
    }
}

export const addSessionJob = (sessionJob) => {
    return {
        type: ADD_SESSION_JOBS,
         payload: {
            sessionJob: sessionJob
        }
    }
}


export const setUpdatedSessionJob = (sessionJob) => {
    return {
        type: UPDATE_SESSION_JOB,
         payload: {
            sessionJob: sessionJob
        }
    }
}

export const setJobsBySessionId = (sessionJobs) => {
    console.log("action session jobs1",sessionJobs);
    return {
        type: GET_SESSION_JOB_BYID,
        payload: {
            sessionJobList: sessionJobs
        }
    }
}

export const deleteSessionJobById = (sessionJobId) => {
    return {
        type: DELETE_SESSION_JOB,
          payload: {
            sessionJobId: sessionJobId
        }
    }
}




export const fetchSessionJobBySessionId = (id) => {
    return dispatch => {
        axios.get(`${URL}/api/v1/sessionwisejob/session/${id}`)
            .then(res => dispatch(setJobsBySessionId(res.data.Data)))
            .catch((err) => {
                dispatch(sessionError(err.response.message))
            });
    }
}

// Save department
export function saveSessionJob(data) {
    console.log('add session job',data);
    return dispatch => {
        return axios({
            method: 'POST',
            url: `${URL}/api/v1/sessionwisejob/new`,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        })
        .then((res) =>{
            data.SessionwiseJobId = res.data.Data;
            dispatch(addSessionJob(data))
        })
            .catch((err) => {
                dispatch(sessionError(err.response.data))
            });
    }
}


export function updateSessionJob(data) {
    return dispatch => {
        return axios({
            method: 'PUT',
            url: `${URL}/api/v1/sessionwisejob/update`,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(res => dispatch(setUpdatedSessionJob(data)))
            .catch((err) => {
                dispatch(sessionError(err.response.Message))
            });
    }
}

export function deleteSessionJob(id) {
    return dispatch => {
        return axios({
            method: 'PUT',
            url: `${URL}/api/v1/sessionwisejob/delete/${id}`,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(res => dispatch(deleteSessionJobById(id)))
            .catch((err) => {
                dispatch(sessionError(err.response.Message))
            });
    }
}

