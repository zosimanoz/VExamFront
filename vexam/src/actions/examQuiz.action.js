import axios from 'axios'
import quizQuestions from './quizQuestions.json'


//Get current questons for the user
export const FETCH_EXAM_QUESTIONS_START = 'FETCH_EXAM_QUESTIONS_START';
export const FETCH_EXAM_QUESTIONS_SUCCESS = 'FETCH_EXAM_QUESTIONS_SUCCESS';
export const FETCH_EXAM_QUESTIONS_FAILURE = 'FETCH_EXAM_QUESTIONS_FAILURE';


export function fetchExamQuestionStart() {
  return {
    type: FETCH_EXAM_QUESTIONS_START
  }
}

export function fetchExamQuestionsSuccess(data) {
  return {
    type: FETCH_EXAM_QUESTIONS_SUCCESS,
    payload: {
        questions : data
    }
  }
}


export function fetchExamQuestionsFailure(data) {
  return {
    type: FETCH_EXAM_QUESTIONS_FAILURE,
    payload: {
        errors : data
    }
  }
}



// export function getExamQuestions() {
//   return dispatch => {
//     dispatch(fetchExamQuestionStart());
//     return axios.get(`quizQuestions.json`)
//           .then((res)=>{ 
//               console.log(res.data.Data)
//               dispatch(fetchExamQuestionsSuccess(res.data.Data));
//           }).catch((err) => {
//               dispatch(fetchExamQuestionsFailure(err.response.data))
//           });
//   }
// }


export function getExamQuestions() {
  return dispatch => {
      dispatch(fetchExamQuestionStart());
      dispatch(fetchExamQuestionsSuccess(quizQuestions));
  }
}