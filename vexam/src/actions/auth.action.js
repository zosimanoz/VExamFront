export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'


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

export const requestLogin = (credentials) => {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        credentials
    }
}


export const receiveLogin = (user) => {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        access_token : user.access_token
    }
}


export const loginError = (message) => {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,        
        isAuthenticated: false,
        message        
    }
}


export const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST,
        isAuthenticated: true,
        isFetching: true
    }
}

export const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS,
        isAuthenticated: false,
        isFetching: false
    }
}



// call the api to get the token


export const login = (creds) => {
    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: `username=${creds.username}&password=${creds.password}`
    }

    return dispatch => {
        // dispatch the login request
        dispatch(requestLogin(creds));

        // call api
        return fetch(`${URL}/api/v1/interviewee/new`, config)
               .then(handleResponse)
               .then((data) => {
                   console.log(data);
                   // If login was successful, set the token in local storage
                   localStorage.setItem('access_token', data.Data.access_token)
               })
               .then(data => dispatch(receiveLogin(data.Data)));;
    }
}



export const logout = () => {
    return dispatch => {
        dispatch(requestLogout())

        // have api request over here
        // and if success remove token from browser

        localStorage.removeItem('access_token')
        dispatch(receiveLogout())
    }
}