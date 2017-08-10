import { 
    SET_QUESTION_COMPLEXITY, ADD_QUESTION_COMPLEXITY
    , GET_QUESTION_COMPLEXITY_BYID, UPDATE_QUESTION_COMPLEXITY, DELETE_QUESTION_COMPLEXITY 
} from '../actions/questionComplexity.action';


export default function questionComplexities(state = [], action = {}) {
    switch (action.type) {

        case SET_QUESTION_COMPLEXITY: {
            return action.questionComplexities;
            break;
        }

        case ADD_QUESTION_COMPLEXITY: {
            return [
                ...state,
                action.questionComplexity
            ]
            break;
        }

         case UPDATE_QUESTION_COMPLEXITY: {
            return [
                ...state,
                action.questionComplexity
            ]
            break;
        }


        case DELETE_QUESTION_COMPLEXITY: {
            return state.filter(item => item.QuestionComplexityId != action.questionComplexity.QuestionComplexityId)
            break;
        }

        case GET_QUESTION_COMPLEXITY_BYID: {
            const index = state.findIndex(item => item.QuestionComplexityId === action.questionComplexity.QuestionComplexityId);
            if (index > -1) {
                return state.map(item => {
                    if (item.QuestionComplexityId === action.questionComplexity.QuestionComplexityId) {
                        return action.questionComplexity;
                    } else {
                        return item;
                    }
                })
            } else {
                return [
                    ...state,
                    action.questionComplexity
                ]
            }
            break;
        }

        default: return state;
    }
}