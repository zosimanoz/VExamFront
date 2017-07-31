import { SET_DEPARTMENTS } from '../actions/departments.action';


export default function games(state = [], action = {}) {
    switch (action.type) {

        case SET_DEPARTMENTS: {
            return action.departments;
            break;
        }

        default: return state;
    }
}