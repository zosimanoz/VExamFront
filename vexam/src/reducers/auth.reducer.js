import { REMOVE_CURRENT_USER, SIGNIN_USER, SIGNIN_USER_SUCCESS,
SIGNIN_USER_FAILURE,LOGOUT_USER,ME_FROM_TOKEN,ME_FROM_TOKEN_SUCCESS,ME_FROM_TOKEN_FAILURE,
 RESET_TOKEN, SIGN_IN_ADMIN_START, SIGN_IN_ADMIN_SUCCESS, SIGN_IN_ADMIN_FAIL} from '../actions/auth.action';


const initialState = {
    authenticated: false,
    status: null,
    user: {},
    errors: null,
    role: null
};



export default function authReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SIGNIN_USER:// sign in user,  set loading = true and status = signin
            return { ...state, user: null, authenticated: false, status:'signin', errors:null, role: null }; 
        case SIGNIN_USER_SUCCESS://return authenticated user,  make loading = false and status = authenticated
            return { ...state, user: action.payload.user, authenticated: true, status:'authenticated', errors:null, role: null }; //<-- authenticated
        case SIGNIN_USER_FAILURE:// return error and make loading = false
            return { ...state, user: null, status:'signin', authenticated: false, errors:action.payload.error, role: null };


        case SIGN_IN_ADMIN_START:// sign in user,  set loading = true and status = signin
            return { ...state, user: null, authenticated: false, status:'signin', errors:null, role: null }; 
        case SIGN_IN_ADMIN_SUCCESS://return authenticated user,  make loading = false and status = authenticated
            return { ...state, user: action.payload.user, authenticated: true, status:'authenticated', errors:null, role: null }; //<-- authenticated
        case SIGN_IN_ADMIN_FAIL:// return error and make loading = false
            return { ...state, user: null, status:'signin', authenticated: false, errors:action.payload.error, role: null };


        case ME_FROM_TOKEN:// loading currentUser("me") from jwttoken in local/session storage storage,
            return { ...state, user: null, status:'storage', errors:null, authenticated: false, role: null }; 
        case ME_FROM_TOKEN_SUCCESS://return user, status = authenticated and make loading = false
            return { ...state, user: action.payload.user, status:'authenticated', authenticated: true, errors:null, role: null }; //<-- authenticated
        case ME_FROM_TOKEN_FAILURE:// return error and make loading = false
            return { ...state, user: null, status:'storage', authenticated: false, errors:action.payload.error, role: null };
        case RESET_TOKEN:// remove token from storage make loading = false
            return { ...state, user: null, status:'storage', errors:null, authenticated: false, role: null };


        case REMOVE_CURRENT_USER:
            return { ...state, user: action.payload.user, authenticated: false }

        default: return state;
    }
}