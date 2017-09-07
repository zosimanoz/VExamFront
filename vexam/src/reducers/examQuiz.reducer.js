import { FETCH_EXAM_QUESTIONS_START, FETCH_EXAM_QUESTIONS_SUCCESS, FETCH_EXAM_QUESTIONS_FAILURE } from '../actions/examQuiz.action';


const initialState = {
  questions: [],
  errors: {}
};



export default function quizReducer(state = initialState, action = {}) {
    switch (action.type) {
        
        case FETCH_EXAM_QUESTIONS_START:
            return state; 
        case FETCH_EXAM_QUESTIONS_SUCCESS:
            return { ...state, questions: action.payload.questions }; 
        case FETCH_EXAM_QUESTIONS_FAILURE:
            return { ...state, errors: action.payload.errors };
       
        default: return state;
    }
}