import { SET_QUESTIONS_WITH_ANSWER, FETCH_EXAM_QUESTIONS_START, FETCH_EXAM_QUESTIONS_SUCCESS, 
    FETCH_EXAM_QUESTIONS_FAILURE,SUBMIT_ASWERS_START,SUBMIT_ASWERS_START_SUCCESS,SUBMIT_ASWERS_START_FAIL } from '../actions/examQuiz.action';


const initialState = {
  questions: [],
  errors: {},
  message: ''
};



export default function quizReducer(state = initialState, action = {}) {
    switch (action.type) {
        
        case FETCH_EXAM_QUESTIONS_START:
            return state; 
        case FETCH_EXAM_QUESTIONS_SUCCESS:
            return { ...state, questions: action.payload.questions }; 
        case FETCH_EXAM_QUESTIONS_FAILURE:
            return { ...state, errors: action.payload.errors };
        case SET_QUESTIONS_WITH_ANSWER: 
            return { ...state, questions: action.payload.question_state.questionsList }; 
        case SUBMIT_ASWERS_START:
            return state; 
        case SUBMIT_ASWERS_START_SUCCESS: {
            return {...state,message: action.payload.data}; 
        }

        default: return state;
    }
}