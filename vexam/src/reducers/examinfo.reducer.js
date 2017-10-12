import { GET_EXAM_INFO, GET_EXAM_INFO_FAIL } from '../actions/examinfo.action';


const initialState = {
    errors: null,
    examinfo: null
};



export default function examinfoReducer(state = initialState, action = {}) {
    switch (action.type) {

        case GET_EXAM_INFO:
            return { ...state, examinfo: action.payload.examinfo }; 
        case GET_EXAM_INFO_FAIL:
            return { ...state, errors: action.payload.errors }; 
   
        default: return state;
    }
}