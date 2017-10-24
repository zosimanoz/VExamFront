
import { ADD_EXAMSET, DELETE_EXAMSET, GET_EXAMSETBYID, SET_EXAMSETS, SET_QUESTIONID_BY_EXAM_SET,UPDATE_EXAMSET, ADD_QUESTION_TO_SET, DELETE_QUESTION_FROM_SET, SAVE_EXAM_QUESTION, SET_QUESTIONS_BY_EXAM_SET, QUESTION_BANK_ERROR,EMPTY_SET_QUESTION_LIST } from '../actions/examset.action';



const initialState = {
    setQuestions: [], // array of setquestion ids
    examsetList: [],
    examset: {}
};
const setQuestionArray = [];

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
                examset: [...state.examset, action.payload.examset]
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
            console.log('current state', state)
            return state;
        }

        case GET_EXAMSETBYID: {
            return {
                ...state,
                examset: action.payload.examset
            }

            break;
        }
        case DELETE_EXAMSET: {
            return {
                ...state,
                examsetList: state.examsetList.filter(item => item.ExamSetId !== action.payload.examSetId)
            }

            break;
        }

        case ADD_QUESTION_TO_SET: {
            return {
                ...state,
                setQuestions: [...state.setQuestions, action.payload.questionId]
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
        case SET_QUESTIONS_BY_EXAM_SET: {
            return {
                ...state,
                setQuestionList: action.payload.setQuestionList
            };
            break;
        }

        case SET_QUESTIONID_BY_EXAM_SET: {
            (action.payload.setQuestions).map(item => {
                setQuestionArray.push(item.QuestionId);
            });
            return {
                ...state,
                setQuestions: setQuestionArray
            };
            break;
        }
        case QUESTION_BANK_ERROR: {
            return {
                ...state,
                error: action.payload.message
            };
            break;
        }

        case EMPTY_SET_QUESTION_LIST: {
            return {
                ...state,
                setQuestionList: null
            };
            break;
        }
        

        default: return state;
    }
}

