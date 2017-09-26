import { SET_INTERVIEWEE, ADD_INTERVIEWEE, GET_INTERVIEWEE_BYID, UPDATE_INTERVIEWEE, DELETE_INTERVIEWEE } from '../actions/interviewee.action';


export default function intervieweeReducer(state = [], action = {}) {
    switch (action.type) {

        case SET_INTERVIEWEE: {
            console.log("get interviewees ", action.payload.interviewees);
            return {
                ...state,
                intervieweeList: action.payload.interviewees
            }

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

            var updatedInterviewee = state.intervieweeList.filter(item => item.IntervieweeId !== action.payload.interviewee.IntervieweeId)
            updatedInterviewee = updatedInterviewee.concat(action.payload.interviewee)
            return {
                ...state,
                intervieweeList: updatedInterviewee
            }
            break;
        }


        case DELETE_INTERVIEWEE: {
                return {
                ...state,
                intervieweeList: state.intervieweeList.filter(item => item.IntervieweeId !== action.payload.IntervieweeId)
            }
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