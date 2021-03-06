import {
    SET_QUESTION_CATEGORY,
    ADD_QUESTION_CATEGORY,
    GET_QUESTION_CATEGORY_BYID,
    UPDATE_QUESTION_CATEGORY,
    DELETE_QUESTION_CATEGORY
} from '../actions/questionCategory.action';


export default function questionCategories(state = [], action = {}) {
    switch (action.type) {

        case SET_QUESTION_CATEGORY: {
            return action.questionCategories;
            break;
        }

        case ADD_QUESTION_CATEGORY: {
            return [
                ...state,
                action.questionCategory
            ]
            break;
        }

        case UPDATE_QUESTION_CATEGORY: {
            return [
                ...state,
                action.questionCategory
            ]
            break;
        }


        case DELETE_QUESTION_CATEGORY: {
            return state.filter(item => item.QuestionCategoryId !== action.questionCategoryId);
            break;
        }

        case GET_QUESTION_CATEGORY_BYID: {
            const index = state.findIndex(item => item.QuestionCategoryId === action.payload.questionCategory.QuestionCategoryId);
            
            if (index > -1) {
                return state.map(item => {
                    if (item.QuestionCategoryId === action.payload.questionCategory.QuestionCategoryId) {
                        return action.payload.questionCategory;
                    } else {
                        return item;
                    }
                })
            } else {
                return [
                    ...state,
                    action.payload.questionCategory
                ]
            }
            break;
        }

        default: return state;
    }
}