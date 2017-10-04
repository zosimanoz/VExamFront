import { SET_ANSWERS, SET_ANSWERS_SUCCESS, SET_SUBJECTIVE_ANSWERS_START, SET_SUBJECTIVE_ANSWER_SUCCESS } from '../actions/answers.action';


const initialState = {
    objectiveAnswers: [],
    subjectiveAnswers: [],
    questionsList: null
};



export default function answerReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_ANSWERS:
            return { ...state };
        case SET_ANSWERS_SUCCESS:
            return { ...state, objectiveAnswers: action.payload.question_state, questionsList: action.payload.question_state };
        case SET_SUBJECTIVE_ANSWERS_START:
            return { ...state };
        case SET_SUBJECTIVE_ANSWER_SUCCESS:
            return { ...state,questionsList: action.payload.question_state };

        default: return state;
    }
}