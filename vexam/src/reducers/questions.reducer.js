import { SET_QUESTIONS, ADD_QUESTIONS, GET_QUESTIONBYID, UPDATE_QUESTION, DELETE_QUESTION, SET_FILTERED_QUESTION } from '../actions/questions.action';

const initialState = {

    QuestionWithOptions: {},
    QuestionList: [],
    Question: null

}

export default function questions(state = initialState, action = {}) {
    switch (action.type) {

        case SET_QUESTIONS: {
            return {
                ...state,
                QuestionList: action.payload.questions
            }
            break;
        }

        case ADD_QUESTIONS: {
            return {
                ...state,
                Question: action.payload.question
            }
            break;
        }

        case UPDATE_QUESTION: {
            return {
                ...state,
                Question: action.payload.question
            }
            break;
        }

        case SET_FILTERED_QUESTION: {
            return {
                ...state,
                QuestionList: action.payload.questions
            }
            break;
        }

        case DELETE_QUESTION: {
           
            return {
                ...state,
                QuestionList: state.QuestionList.filter(item => item.QuestionId !== action.payload.questionId)
            }

            break;
        }

        case GET_QUESTIONBYID: {
            console.log('get question by id', state)
            return {
               ...state,
                QuestionWithOptions: action.payload.question
            }
            break;
        }

        default: return state;
    }
}