import axios from 'axios';
import { API_URL } from '../utils/url';
import { setLoader } from './loader.action';

export const SET_USERS = 'SET_USERS'
export const ADD_USER = 'ADD_USER'
export const GET_USERBYID = 'GET_USERBYID'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'
export const ERROR = 'ERROR'


export const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: {
            users: users
        }
    }
}

export const addUser = (user) => {
    return {
        type: ADD_USER,
        payload: {
            user: user
        }
    }
}

export function error(error) {
    return {
        type: ERROR,
        payload: {
            error: error
        }
    }
}

export const setUpdatedUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: {
            user: user
        }
    }
}


export const setUserById = (user) => {
    return {
        type: GET_USERBYID,
        payload: {
            user: user
        }
    }
}

export const deleteUserById = (userId) => {
    return {
        type: DELETE_USER,
        payload: {
            userId: userId
        }
    }
}

export const fetchUsers = () => {
    // fetch data from api
    return dispatch => {
        dispatch(setLoader(true));

        return axios.get(`${API_URL}/api/v1/user/get`)
            .then(res => {
                dispatch(setLoader(false));
                dispatch(setUsers(res.data.Data));
            });
    }
}




// Save departmenty
export function saveUser(data) {
    console.log('user data: ', data)
    return dispatch => {
        return axios.post(`${API_URL}/api/v1/user/register`, JSON.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => dispatch(addUser(res.data.Data)))
            .catch((err) => {
                console.log('errror', err)
            });
    }
}

export function fetchUserById(id) {
    return dispatch => {
        return axios.get(`${API_URL}/api/v1/user/get/${id}`)
            .then(res => dispatch(setUserById(res.data.Data)));
    }
}


export function updateUser(data) {
    return dispatch => {
        return axios.post(`${API_URL}/api/v1/user/update`, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(res => dispatch(setUpdatedUser(res.data.Data)))

    }
}


export function deleteUser(id) {
    return dispatch => {
        return axios({
            method: 'PUT',
            url: `${API_URL}/api/v1/user/delete/${id}`,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(res => dispatch(deleteUserById(id)))
            .catch((err) => {
                dispatch(error(err))
            });
    }
}

