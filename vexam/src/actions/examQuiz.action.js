import axios from 'axios'

import { API_URL } from '../utils/url';
import { setLoader } from './loader.action';

//Get current questons for the user
export const FETCH_EXAM_QUESTIONS_START = 'FETCH_EXAM_QUESTIONS_START';
export const FETCH_EXAM_QUESTIONS_SUCCESS = 'FETCH_EXAM_QUESTIONS_SUCCESS';
export const FETCH_EXAM_QUESTIONS_FAILURE = 'FETCH_EXAM_QUESTIONS_FAILURE';

export const SET_QUESTIONS_WITH_ANSWER = 'SET_QUESTIONS_WITH_ANSWER'

export const SUBMIT_ASWERS_START = 'SUBMIT_ASWERS_START'
export const SUBMIT_ASWERS_START_FAIL = 'SUBMIT_ASWERS_START_FAIL'
export const SUBMIT_ASWERS_START_SUCCESS = 'SUBMIT_ASWERS_START_SUCCESS'


export function fetchExamQuestionStart() {
  return {
    type: FETCH_EXAM_QUESTIONS_START
  }
}

export function fetchExamQuestionsSuccess(data) {
  return {
    type: FETCH_EXAM_QUESTIONS_SUCCESS,
    payload: {
      questions: data
    }
  }
}


export function fetchExamQuestionsFailure(data) {
  return {
    type: FETCH_EXAM_QUESTIONS_FAILURE,
    payload: {
      errors: data
    }
  }
}


export function saveAnswersStart() {
  return {
    type: SUBMIT_ASWERS_START
  }
}

export function saveAnswerSuccess(data) {
  return {
    type: SUBMIT_ASWERS_START_SUCCESS,
    payload: {
      data: data
    }
  }
}



export function getExamQuestions(intervieweeId) {
  return dispatch => {
    dispatch(fetchExamQuestionStart());
    dispatch(setLoader(true));
    axios.get(`${API_URL}/api/v1/interviewee/interview/questions/${intervieweeId}`)
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(fetchExamQuestionsSuccess(res.data.Data));
      }).catch((err) => {
        dispatch(fetchExamQuestionsFailure(err.response.data))
      });
  }
}

// export function autoCheckObjectiveQuestions(intervieweeId) {
//    alert(intervieweeId);
//   return dispatch => {
//     axios.get(`${API_URL}/api/v1/checkanswer/check/objectiveanswer/${intervieweeId}`)
//       .then((res) => {
//        alert('checked objective answers');
//       }).catch((err) => {
//         alert('error');
//         dispatch(fetchExamQuestionsFailure(err.response.data))
//       });
//   }
// }

export function submitFinalAnswers(questions,intervieweeId) {
  return dispatch => {
    dispatch(saveAnswersStart());
    return axios.post(`${API_URL}/api/v1/answer/save`, JSON.stringify(questions), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      dispatch(saveAnswerSuccess(res.data.Data));
    });
  }
}




// export function getExamQuestions() {
//   return dispatch => {
//       dispatch(fetchExamQuestionStart());
//       dispatch(fetchExamQuestionsSuccess(quizQuestions));
//   }
// }