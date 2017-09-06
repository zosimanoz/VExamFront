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
            console.log('categories ',action.questionCategories)
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
            return state.filter(item => item.QuestionCategoryId != action.questionCategory.QuestionCategoryId)
            break;
        }

        case GET_QUESTION_CATEGORY_BYID: {
            const index = state.findIndex(item => item.QuestionCategoryId === action.questionCategory.QuestionCategoryId);
            if (index > -1) {
                return state.map(item => {
                    if (item.QuestionCategoryId === action.questionCategory.QuestionCategoryId) {
                        return action.questionCategory;
                    } else {
                        return item;
                    }
                })
            } else {
                return [
                    ...state,
                    action.questionCategory
                ]
            }
            break;
        }

        default: return state;
    }
}