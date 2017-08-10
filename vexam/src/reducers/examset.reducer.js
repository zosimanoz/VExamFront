
import { ADD_EXAMSET, DELETE_EXAMSET, GET_EXAMSETBYID, SET_EXAMSETS, UPDATE_EXAMSET } from '../actions/examset.action';


export default function examsets(state = [], action = {}) {
    switch (action.type) {

        case SET_EXAMSETS: {
            return action.examsets;
            break;
        }

        case ADD_EXAMSET: {
            return [
                ...state,
                action.examset
            ]
            break;
        }

         case UPDATE_EXAMSET: {
            return [
                ...state,
                action.examset
            ]
            break;
        }

        case GET_EXAMSETBYID: {
            const index = state.findIndex(item => item.ExamSetId === action.examset.ExamSetId);
            if (index > -1) {
                return state.map(item => {
                    if (item.ExamSetId === action.examset.ExamSetId) {
                        return action.examset;
                    } else {
                        return item;
                    }
                })
            } else {
                return [
                    ...state,
                    action.examset
                ]
            }
            break;
        }

        default: return state;
    }
}