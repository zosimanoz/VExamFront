import { combineReducers } from 'redux';

import departments from './departments.reducer';
import questions from './questions.reducer';
import examsets from './examset.reducer';
import questionCategories from './questionCategory.reducer'
import questionComplexities from './questionComplexity.reducer'
import jobTypes from './jobTypes.reducer'
import interviewSessions from './interviewSessions.reducer'
import interviewees from './interviewee.reducer'
import authReducer from './auth.reducer'

export default combineReducers({
    departments,
    questions,
    examsets,
    questionCategories,
    questionComplexities,
    jobTypes,
    interviewSessions,
    interviewees,
    authReducer
});