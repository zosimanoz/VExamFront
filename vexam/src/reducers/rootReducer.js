import { combineReducers } from 'redux';

import departments from './departments.reducer';
import questions from './questions.reducer';
import examsets from './examset.reducer';
import questionCategories from './questionCategory.reducer'
import questionComplexities from './questionComplexity.reducer'
import jobTypes from './jobTypes.reducer'
import interviewSessionReducer from './interviewSessions.reducer'
import intervieweeReducer from './interviewee.reducer'
import authReducer from './auth.reducer'
import flashMessage from './flashMessage.reducer'
import quizReducer from './examQuiz.reducer'
import answerReducer from './answer.reducer'
import sessionJobReducer from './sessionJobs.reducer'
import examinfoReducer from './examinfo.reducer'
import answersheetReducer from './checkAnswer.reducer'

export default combineReducers({
    departments,
    questions,
    examsets,
    questionCategories,
    questionComplexities,
    jobTypes,
    interviewSessionReducer,
    intervieweeReducer,
    authReducer,
    flashMessage,
    quizReducer,
    answerReducer,
    sessionJobReducer,
    examinfoReducer,
    answersheetReducer
});