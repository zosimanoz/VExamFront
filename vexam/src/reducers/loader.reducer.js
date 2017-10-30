import { SET_LOADER } from '../actions/loader.action';

const initialState = {
    loading: false
};

export default function loaderReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_LOADER: {
            return {
                ...state, loading: action.payload.loading
            };
            break;
        }

        default: return state;
    }
}