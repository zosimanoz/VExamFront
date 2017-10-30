import axios from 'axios';
import { setLoader } from './loader.action';
export const GET_EXAM_INFO = 'GET_EXAM_INFO';
export const GET_EXAM_INFO_FAIL = 'GET_EXAM_INFO_FAIL';



let examinfo = {
    info : 'This is test exam. You are required to understand and read it thoroughly before giving exam'
}

export function fetchExamInfoSuccess(data) {
    return {
        type: GET_EXAM_INFO,
        payload: {
            examinfo : data.info
        }
    }
}


export function fetchExamInfoFailure(errors) {
    return {
        type: GET_EXAM_INFO_FAIL,
        payload: {
            errors : errors
        }
    }
}



export function getExamInfo() {
  return dispatch => {
      dispatch(fetchExamInfoSuccess(examinfo));
    // axios.get(`${URL}/api/v1/examinfo/get`)
    //   .then((res) => {
    //     dispatch(fetchExamInfoSuccess(res.data.Data));
    //   }).catch((err) => {
    //     dispatch(fetchExamInfoFailure(err.response.data))
    //   });
  }
}