export const SET_INTERVIEW_SESSION = 'SET_INTERVIEW_SESSION'
export const ADD_INTERVIEW_SESSION = 'ADD_INTERVIEW_SESSION'
export const GET_INTERVIEW_SESSION_BYID = 'GET_INTERVIEW_SESSION_BYID'
export const UPDATE_INTERVIEW_SESSION = 'UPDATE_INTERVIEW_SESSION'
export const DELETE_INTERVIEW_SESSION = 'DELETE_INTERVIEW_SESSION'


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

export const setInterviewSessions = (interviewSessions) => {
    return {
        type: SET_INTERVIEW_SESSION,
        interviewSessions
    }
}


export const addInterviewSession = (interviewSession) => {
    return {
        type: ADD_INTERVIEW_SESSION,
        interviewSession
    }
}


export const setUpdatedInterviewSession = (interviewSessions) => {
    return {
        type: UPDATE_INTERVIEW_SESSION,
        interviewSessions
    }
}


export const setInterviewSessionById = (interviewSessions) => {
    return {
        type: GET_INTERVIEW_SESSION_BYID,
        interviewSessions
    }
}

export const deleteInterviewSessionById = (interviewSessions) => {
    return {
        type: DELETE_INTERVIEW_SESSION,
        interviewSessions
    }
}


export const fetchInterviewSessions = () => {
    // fetch data from api
    // dispatch a new state on receiving data data.Data
    // thunk middle ware help in calling actions as funcitons

    return dispatch => {
        fetch(`${URL}/api/v1/interviewsession/active`)
            .then(res => res.json())
            .then(data => dispatch(setInterviewSessions(data.Data)))
    }
}



// Save department
export function saveInterviewSession(data) {
    return dispatch => {
        return fetch(`${URL}/api/v1/interviewsession/new`, {
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



export function fetchInterviewSessionById(id){
    return dispatch => {
        fetch(`${URL}/api/v1/interviewsession/get/${id}`)
            .then(res => res.json())
            .then(data => dispatch(setInterviewSessionById(data.Data)))
    }
}


export function updateInterviewSession(data){
     return dispatch => {
        return fetch(`${URL}/api/v1/interviewsession/update`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(setUpdatedInterviewSession(data.Data)));
    }
}


export function deleteInterviewSession(id){

    return dispatch => {
        return fetch(`${URL}/api/v1/interviewsession/delete/${id}`, {
            method: 'put',
           dataType: 'json',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(deleteInterviewSessionById(id)));
    }
}
