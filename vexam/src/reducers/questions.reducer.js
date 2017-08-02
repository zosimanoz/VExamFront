import { SET_QUESTIONS, ADD_QUESTIONS, GET_QUESTIONBYID, UPDATE_QUESTION } from '../actions/questions.action';


export default function questions(state = [], action = {}) {
    switch (action.type) {

        case SET_QUESTIONS: {
            return action.questions;
            break;
        }

        case ADD_QUESTIONS: {
            return [
                ...state,
                action.question
            ]
            break;
        }

         case UPDATE_QUESTION: {
            return [
                ...state,
                action.question
            ]
            break;
        }

        case GET_QUESTIONBYID: {
            const index = state.findIndex(item => item.QuestionId === action.question.QuestionId);
            if (index > -1) {
                return state.map(item => {
                    if (item.QuestionId === action.question.QuestionId) {
                        return action.question;
                    } else {
                        return item;
                    }
                })
            } else {
                return [
                    ...state,
                    action.question
                ]
            }
            break;
        }

        default: return state;
    }
}