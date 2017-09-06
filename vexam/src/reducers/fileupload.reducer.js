import { UPLOAD_DOCUMENT_SUCCESS, UPLOAD_DOCUMENT_FAIL } from '../actions/fileupload.action';

const initialState = {
    response: null,
    data: {},
    errors: null,
    filepath: null
};


export default function fileUploadReducer(state = initialState, action = {}) {
    switch (action.type) {

        case UPLOAD_DOCUMENT_SUCCESS:
            return {
                ...state,
                filepath: action.payload.filepath
            };
        case UPLOAD_DOCUMENT_FAIL:
            return {
                ...state,
                errors: action.payload.error,
            };
        default: return state;
    }
}