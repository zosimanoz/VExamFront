import { SET_INTERVIEW_SESSION, ADD_INTERVIEW_SESSION, GET_INTERVIEW_SESSION_BYID, UPDATE_INTERVIEW_SESSION, DELETE_INTERVIEW_SESSION } from '../actions/interviewSession.action';


export default function interviewSessionReducer(state = [], action = {}) {
    switch (action.type) {

        case SET_INTERVIEW_SESSION: {
            return {
                ...state,
                interviewSessions:action.payload.interviewSessions
            }
            break;
        }

        case ADD_INTERVIEW_SESSION: {
            return {
                ...state,
                interviewSessions: state.interviewSessions.concat(action.payload.interviewSession)
            }
            break;
        }

          case UPDATE_INTERVIEW_SESSION: {

            var updatedInterviewSession = state.interviewSessions.filter(item => item.interviewSessionId !== action.payload.InterviewSession.InterviewSessionId)
            updatedInterviewSession = updatedInterviewSession.concat(action.payload.interviewSession)
            return {
                ...state,
                interviewSessions: updatedInterviewSession
            }
            break;
        }


        case DELETE_INTERVIEW_SESSION: {
            console.log('reducer interview session', state.interviewSessions)
             return {
                ...state,
                 interviewSessions: state.interviewSessions.filter(item => item.InterviewSessionId !== action.payload.interviewSessionId)
             }
          
            break;
        }

        case GET_INTERVIEW_SESSION_BYID: {
               console.log('reducer', action.interviewSession);
            return {
                ...state,
                interviewSession: action.payload.interviewSession
            }

            break;
        }

        default: return state;
    }
}