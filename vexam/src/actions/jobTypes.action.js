import { API_URL } from '../utils/url';


export const SET_JOBTYPES = 'SET_JOBTYPES'
export const ADD_JOBTYPE = 'ADD_JOBTYPE'
export const GET_JOBTYPEBYID = 'GET_JOBTYPEBYID'
export const UPDATE_JOBTYPE = 'UPDATE_JOBTYPE'
export const DELETE_JOBTYPE = 'DELETE_JOBTYPE'




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

export const setJobTypes = (jobtypes) => {
    return {
        type: SET_JOBTYPES,
        jobtypes
    }
}


export const addJobType = (jobtype) => {
    console.log(jobtype);
    return {
        type: ADD_JOBTYPE,
        jobtype
    }
}


export const setUpdatedJobType = (jobtype) => {
    return {
        type: UPDATE_JOBTYPE,
        jobtype
    }
}


export const setJobTypeById = (jobtype) => {
    return {
        type: GET_JOBTYPEBYID,
        jobtype
    }
}

export const deleteJobTypeById = (jobTypeId) => {
    return {
        type: DELETE_JOBTYPE,
        jobTypeId
    }
}


export const fetchJobTypes = () => {
    // fetch data from api
    // dispatch a new state on receiving data data.Data
    // thunk middle ware help in calling actions as funcitons

    return dispatch => {
        fetch(`${API_URL}/api/v1/jobs/get/all`)
            .then(res => res.json())
            .then(data => dispatch(setJobTypes(data.Data)))
    }
}



// Save department
export function saveJobType(data) {
    return dispatch => {
        return fetch(`${API_URL}/api/v1/jobs/new`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(addJobType(data.Data)));;
    }
}



export function fetchJobTypeById(id){
    return dispatch => {
        fetch(`${API_URL}/api/v1/jobs/get/${id}`)
            .then(res => res.json())
            .then(data => dispatch(setJobTypeById(data.Data)))
    }
}


export function updateJobType(data){
     return dispatch => {
        return fetch(`${API_URL}/api/v1/jobs/update`, {
            method: 'put',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(setUpdatedJobType(data.Data)));
    }
}


export function deleteJobType(id){

    return dispatch => {
        return fetch(`${API_URL}/api/v1/jobs/delete/${id}`, {
            method: 'put',
           dataType: 'json',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(deleteJobTypeById(id)));
    }
}
