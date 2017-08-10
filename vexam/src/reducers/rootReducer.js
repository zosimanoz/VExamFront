import { combineReducers } from 'redux';

import departments from './departments.reducer';
import questions from './questions.reducer';
import examsets from './examset.reducer';

export default combineReducers({
    departments,
    questions,
    examsets
});