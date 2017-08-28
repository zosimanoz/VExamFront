
import { ADD_EXAMSET, DELETE_EXAMSET, GET_EXAMSETBYID, SET_EXAMSETS, UPDATE_EXAMSET, ADD_QUESTION_TO_SET, DELETE_QUESTION_FROM_SET, SAVE_EXAM_QUESTION } from '../actions/examset.action';



const initialState = {
    setQuestions: [], // array of product ids
    examsetList: [],
    examset: {}
};


export default function examsets(state = initialState, action = {}) {
    switch (action.type) {

        case SET_EXAMSETS: {
            return {
                ...state,
                examsetList: action.payload.examsets
            }
            break;
        }

        case ADD_EXAMSET: {
            return {
                ...state,
                examset:[...state.examset, action.payload.examset]
            }
            break;
        }

         case UPDATE_EXAMSET: {
            return [
                ...state,
                action.examset
            ]
            break;
        }

        case SAVE_EXAM_QUESTION: {
            // return [
            //     ...state,
            //     action.payload.data
            // ]
            console.log('current state',state)
            return state;
        }

        case GET_EXAMSETBYID: {
            const index = state.examsets.findIndex(item => item.ExamSetId === action.examset.ExamSetId);
            if (index > -1) {
                return state.map(item => {
                    if (item.ExamSetId === action.examset.ExamSetId) {
                        return {
                            examset: [...state.examset,action.payload.examset]
                        }
                    } else {
                        return item;
                    }
                })
            } else {
                return {
                    ...state,
                    examset: [...state.examset,action.payload.examset]
                }
            }
            break;
        }

        case ADD_QUESTION_TO_SET: {
            return {
                ...state,
                setQuestions: [ ...state.setQuestions, action.payload.questionId ]
            };
            break;
        }

         case DELETE_QUESTION_FROM_SET: {
            return {
                ...state,
                setQuestions: state.setQuestions.filter(id => id !== action.payload.questionId)
            };
            break;
        }

        default: return state;
    }
}