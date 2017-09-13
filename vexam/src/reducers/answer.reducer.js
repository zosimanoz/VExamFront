import { SET_ANSWERS,SET_ANSWERS_SUCCESS } from '../actions/answers.action';


const initialState = {
   answers : []
};



export default function answerReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_ANSWERS:
            return { ...state }; 
        case SET_ANSWERS_SUCCESS:
            return { answers : action.payload.answerList }; 
        
        default: return state;
    }
}