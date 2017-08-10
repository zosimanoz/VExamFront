export const SET_INTERVIEWEE = 'SET_INTERVIEWEE'
export const ADD_INTERVIEWEE = 'ADD_INTERVIEWEE'
export const GET_INTERVIEWEE_BYID = 'GET_INTERVIEWEE_BYID'
export const UPDATE_INTERVIEWEE = 'UPDATE_INTERVIEWEE'
export const DELETE_INTERVIEWEE = 'DELETE_INTERVIEWEE'


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

export const setInterviewees = (interviewees) => {
    return {
        type: SET_INTERVIEWEE,
        interviewees
    }
}


export const addInterviewee = (interviewee) => {
    return {
        type: ADD_INTERVIEWEE,
        interviewee
    }
}


export const setUpdatedInterviewee = (interviewee) => {
    return {
        type: UPDATE_INTERVIEWEE,
        interviewee
    }
}


export const setIntervieweeById = (interviewee) => {
    return {
        type: GET_INTERVIEWEE_BYID,
        interviewee
    }
}

export const deleteIntervieweeById = (interviewee) => {
    return {
        type: DELETE_INTERVIEWEE,
        interviewee
    }
}


export const fetchInterviewees = () => {
    // fetch data from api
    // dispatch a new state on receiving data data.Data
    // thunk middle ware help in calling actions as funcitons

    return dispatch => {
        fetch(`${URL}/api/v1/interviewee/get/all`)
            .then(res => res.json())
            .then(data => dispatch(setInterviewees(data.Data)))
    }
}



// Save department
export function saveInterviewee(data) {
    return dispatch => {
        return fetch(`${URL}/api/v1/interviewee/new`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(addInterviewee(data.Data)));;
    }
}



export function fetchIntervieweeById(id){
    return dispatch => {
        fetch(`${URL}/api/v1/interviewee/get/${id}`)
            .then(res => res.json())
            .then(data => dispatch(setIntervieweeById(data.Data)))
    }
}


export function updateInterviewee(data){
     return dispatch => {
        return fetch(`${URL}/api/v1/interviewee/update`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(setUpdatedInterviewee(data.Data)));
    }
}


export function deleteInterviewee(id){

    return dispatch => {
        return fetch(`${URL}/api/v1/interviewee/delete/${id}`, {
            method: 'put',
           dataType: 'json',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(deleteIntervieweeById(id)));
    }
}
