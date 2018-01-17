import { 
    ADD_USER, DELETE_USER, ERROR, GET_USERBYID, SET_USERS, UPDATE_USER, 
} from '../actions/users.action';


const initialState = {
    usersList: []
};



export default function usersReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_USERS:
            return { ...state, usersList: action.payload.users };

        case ADD_USER:
            return { ...state, user: action.payload.user };

        case GET_USERBYID: {
            const index = state.findIndex(item => item.UserId === action.payload.user.UserId);
            if (index > -1) {
                return state.map(item => {1
                    if (item.UserId === action.payload.user.UserId) {
                        return action.payload.user;
                    } else {
                        return item;
                    }
                })
            } else {
                return {
                    ...state,
                    user: action.payload.user
                }
            }
            break;
        }
         
        case DELETE_USER:{
            return {...state, usersList: state.usersList.filter(item => item.UserId !== action.payload.userId) };
            break;
        }

        default: return state;
    }
}