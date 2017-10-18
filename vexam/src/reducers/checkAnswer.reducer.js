import { SET_ANSWERSHEET } from '../actions/checkAnswer.action';


export default function answersheetReducer(state = [], action = {}) {
    switch (action.type) {
        
        case SET_ANSWERSHEET:
            return {
                ...state,
                answersheet: action.payload.answersheet
            }; 

        default: return state;
    }
}