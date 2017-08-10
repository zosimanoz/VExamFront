import { SET_INTERVIEWEE, ADD_INTERVIEWEE, GET_INTERVIEWEE_BYID, UPDATE_INTERVIEWEE, DELETE_INTERVIEWEE } from '../actions/interviewee.action';


export default function interviewees(state = [], action = {}) {
    switch (action.type) {

        case SET_INTERVIEWEE: {
            return action.interviewees;
            break;
        }

        case ADD_INTERVIEWEE: {
            return [
                ...state,
                action.interviewee
            ]
            break;
        }

         case UPDATE_INTERVIEWEE: {
            return [
                ...state,
                action.interviewee
            ]
            break;
        }


        case DELETE_INTERVIEWEE: {
            return state.filter(item => item.IntervieweeId != action.interviewee.IntervieweeId)
            break;
        }

        case GET_INTERVIEWEE_BYID: {
            const index = state.findIndex(item => item.IntervieweeId === action.interviewee.IntervieweeId);
            if (index > -1) {
                return state.map(item => {
                    if (item.IntervieweeId === action.interviewee.IntervieweeId) {
                        return action.interviewee;
                    } else {
                        return item;
                    }
                })
            } else {
                return [
                    ...state,
                    action.interviewee
                ]
            }
            break;
        }

        default: return state;
    }
}