import axios from 'axios'

import { API_URL } from '../utils/url';

export function uploadSuccess({ filepath }) {
  return {
    type: 'UPLOAD_DOCUMENT_SUCCESS',
    payload: {
      filepath: filepath
    }
  };
}

export function uploadFail(error) {
  return {
    type: 'UPLOAD_DOCUMENT_FAIL',
    payload: {
      error: error
    }
  };
}

export function uploadDocumentRequest(file) {
  let data = new FormData();
  data.append('files', file);
  return dispatch => {
    return axios({
      method: 'POST',
      url: `${API_URL}/api/v1/file/upload`,
      data: data
    })
      // .then(res => dispatch(uploadSuccess(res.data.relativeFilePath)))
      // .catch((err) => {
      //   dispatch(uploadFail(err.response))
      // });
  }

}