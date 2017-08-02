import { combineReducers } from 'redux';

import departments from './departments.reducer';
import questions from './questions.reducer';

export default combineReducers({
    departments,
    questions
});