import axios from 'axios'

import { API_URL } from '../utils/url';

export const SET_DEPARTMENTS = 'SET_DEPARTMENTS'
export const ADD_DEPARTMENT = 'ADD_DEPARTMENT'
export const GET_DEPARTMENTBYID = 'GET_DEPARTMENTBYID'
export const UPDATE_DEPARTMENT = 'UPDATE_DEPARTMENT'


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

export const setDepartments = (departments) => {
    return {
        type: SET_DEPARTMENTS,
        departments
    }
}


export const addDepartment = (department) => {
    return {
        type: ADD_DEPARTMENT,
        department
    }
}


export const setUpdatedDepartment = (department) => {
    return {
        type: UPDATE_DEPARTMENT,
        department
    }
}


export const setDepartmentById = (department) => {
    return {
        type: GET_DEPARTMENTBYID,
        department
    }
}


export const fetchDepartments = () => {
    // fetch data from api
    // dispatch a new state on receiving data data.Data
    // thunk middle ware help in calling actions as funcitons
    return dispatch => {
        return axios.get(`${API_URL}/api/v1/department/get/all`)
                    .then(res => dispatch(setDepartments(res.data.Data)))
    }
}




// Save departmenty
export function saveDepartment(data) {
      return dispatch => {
        return axios.post(`${API_URL}/api/v1/department/new`,JSON.stringify(data),{
             headers: {
              'Accept': 'application/json',
               'Content-Type': 'application/json'
            }
         }).then(res => dispatch(addDepartment(res.data.Data)));;
    }
}

export function fetchDepartmentById(id){
    return dispatch => {
        return axios.get(`${API_URL}/api/v1/department/get/${id}`)
                .then(res => dispatch(setDepartmentById(res.data.Data)));
    }
}


export function updateDepartment(data){
     return dispatch => {
         return axios.post(`${API_URL}/api/v1/department/update`,JSON.stringify(data),{
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            } 
         }).then(res => dispatch(setUpdatedDepartment(res.data.Data)))

    }
}

