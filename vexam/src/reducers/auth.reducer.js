import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_REQUEST,LOGOUT_FAILURE, LOGOUT_SUCCESS } from '../actions/auth.action';


export default function authReducer(state = [], action = {}) {
    switch (action.type) {

        case LOGIN_REQUEST: {
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