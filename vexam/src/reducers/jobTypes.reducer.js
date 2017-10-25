import { SET_JOBTYPES, ADD_JOBTYPE, GET_JOBTYPEBYID, UPDATE_JOBTYPE, DELETE_JOBTYPE } from '../actions/jobTypes.action';


export default function jobTypes(state = [], action = {}) {
    switch (action.type) {

        case SET_JOBTYPES: {
            return action.jobtypes;
            break;
        }

        case ADD_JOBTYPE: {
            return [
                ...state,
                action.jobtype
            ]
            break;
        }

         case UPDATE_JOBTYPE: {
            return [
                ...state,
                action.jobtype
            ]
            break;
        }


        case DELETE_JOBTYPE: {
            return state.filter(item => item.JobTitleId != action.jobTypeId)
            break;
        }

        case GET_JOBTYPEBYID: {
            const index = state.findIndex(item => item.JobTitleId === action.jobtype.JobTitleId);
            if (index > -1) {
                return state.map(item => {
                    if (item.JobTitleId === action.jobtype.JobTitleId) {
                        return action.jobtype;
                    } else {
                        return item;
                    }
                })
            } else {
                return [
                    ...state,
                    action.jobtype
                ]
            }
            break;
        }

        default: return state;
    }
}