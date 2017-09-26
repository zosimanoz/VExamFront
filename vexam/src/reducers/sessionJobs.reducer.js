import { GET_SESSION_JOB_BYID, ADD_SESSION_JOBS, UPDATE_SESSION_JOB,DELETE_SESSION_JOB } from '../actions/sessionJobs.action';

export default function sessionJobReducer(state = [], action = {}) {
    switch (action.type) {

        case GET_SESSION_JOB_BYID: {
            console.log("get session jobs ", action.payload.sessionJobList);
            return {
                ...state,
                sessionJobList: action.payload.sessionJobList
            }
            break;
        }

        case ADD_SESSION_JOBS: {
            console.log("added ", action.payload.sessionJob);
            return {
                ...state,
                sessionJobList: state.sessionJobList.concat(action.payload.sessionJob)
            }
            break;
        }

        case UPDATE_SESSION_JOB: {

            var updatedSession = state.sessionJobList.filter(item => item.SessionwiseJobId !== action.payload.sessionJob.SessionwiseJobId)
            updatedSession = updatedSession.concat(action.payload.sessionJob)
            return {
                ...state,
                sessionJobList: updatedSession
            }
            break;
        }


        case DELETE_SESSION_JOB: {
            return {
                ...state,
                sessionJobList: state.sessionJobList.filter(item => item.SessionwiseJobId !== action.payload.sessionJobId)
            }
            break;
        }

        // case GET_INTERVIEW_SESSION_BYID: {
        //        console.log('reducer', action.interviewSession);
        //     return {
        //         ...state,
        //         interviewSession: action.interviewSession
        //     }

        //     break;
        // }

        default: return state;
    }
}