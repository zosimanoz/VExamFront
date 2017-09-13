import { SET_INTERVIEW_SESSION, ADD_INTERVIEW_SESSION, GET_INTERVIEW_SESSION_BYID, UPDATE_INTERVIEW_SESSION, DELETE_INTERVIEW_SESSION } from '../actions/interviewSession.action';


export default function interviewSessions(state = [], action = {}) {
    switch (action.type) {

        case SET_INTERVIEW_SESSION: {
            return action.interviewSessions;
            break;
        }

        case ADD_INTERVIEW_SESSION: {
         
            return [
                ...state,
                action.interviewSession
            ]
            break;
        }

        case UPDATE_INTERVIEW_SESSION: {
            return [
                ...state,
                action.interviewSession
            ]
            break;
        }


        case DELETE_INTERVIEW_SESSION: {
            return state.filter(item => item.InterviewSessionId != action.interviewSession.InterviewSessionId)
            break;
        }

        case GET_INTERVIEW_SESSION_BYID: {
               console.log('reducer', action.interviewSession);
            return {
                ...state,
                interviewSession: action.interviewSession
            }

            break;
        }

        default: return state;
    }
}