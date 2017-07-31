export const SET_DEPARTMENTS = 'SET_DEPARTMENTS'


const URL = 'http://localhost:5000';




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

export const fetchDepartments = () => {
    // fetch data from api
    // dispatch a new state on receiving data data.Data
    // thunk middle ware help in calling actions as funcitons

    return dispatch => {
        fetch(`${URL}/api/v1/department/get/all`)
            .then(res => res.json())
            .then(data => dispatch(setDepartments(data.Data)))
    }
}



// Save department
export function saveDepartment(data) {
    console.log(JSON.stringify(data))
    return dispatch => {
        return fetch(`${URL}/api/v1/department/new`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then(handleResponse);
    }
}


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