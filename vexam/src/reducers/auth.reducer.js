import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_REQUEST,LOGOUT_FAILURE, LOGOUT_SUCCESS } from '../actions/auth.action';


const initialState = {
    isFetching: false,
    isAuthenticated: false,
    credentials: {},
    access_token: null
};



export default function authReducer(state = initialState, action = {}) {
    switch (action.type) {

        case LOGIN_REQUEST: {
            // console.log('spread state',[...state,state.access_token,state.credentials,state.isAuthenticated,state.isFetching])
            return [
                ...state,
                action.isFetching,
                action.isAuthenticated,
                action.credentials
            ];
            break;
        }

        case LOGIN_SUCCESS: {
            return [
                ...state,
                action.isFetching,
                action.isAuthenticated
            ]
            break;
        }

        case LOGOUT_SUCCESS: {
            return [
                ...state,
                action.isFetching,
                action.isAuthenticated
            ]
            break;
        }


        default: return state;
    }
}