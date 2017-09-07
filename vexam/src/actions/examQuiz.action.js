import axios from 'axios'
import quizQuestions from './quizQuestions.json'


//Get current questons for the user
export const FETCH_EXAM_QUESTIONS_START = 'FETCH_EXAM_QUESTIONS_START';
export const FETCH_EXAM_QUESTIONS_SUCCESS = 'FETCH_EXAM_QUESTIONS_SUCCESS';
export const FETCH_EXAM_QUESTIONS_FAILURE = 'FETCH_EXAM_QUESTIONS_FAILURE';


const URL = 'http://localhost:5000';

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



export function getExamQuestions() {
  return dispatch => {
    dispatch(fetchExamQuestionStart());
    axios.get(`${URL}/api/v1/interviewee/interview/questions/3`)
          .then((res)=>{ 
              console.log(res.data.Data)
              dispatch(fetchExamQuestionsSuccess(res.data.Data));
          }).catch((err) => {
              console.log(err)
              dispatch(fetchExamQuestionsFailure(err.response.data))
          });
  }
}


// export function getExamQuestions() {
//   return dispatch => {
//       dispatch(fetchExamQuestionStart());
//       dispatch(fetchExamQuestionsSuccess(quizQuestions));
//   }
// }