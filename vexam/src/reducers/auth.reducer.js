import { SET_CURRENT_USER } from '../actions/auth.action';


const initialState = {
    isAuthenticated: false,
    user: {}
};



export default function authReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_CURRENT_USER: {
            return {
                isAuthenticated: true,
                user: action.user
            };
            break;
        }

        default: return state;
    }
}