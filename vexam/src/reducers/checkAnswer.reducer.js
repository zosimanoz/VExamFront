import { SET_ANSWERSHEET, ASSIGN_MARKS } from '../actions/checkAnswer.action';


export default function answersheetReducer(state = [], action = {}) {

    switch (action.type) {

        case SET_ANSWERSHEET:
            return {
                ...state,
                answersheet: action.payload.answersheet
            };
        case ASSIGN_MARKS:
            debugger;
            console.log('answersheet reducer', state);
            const marksAssignedAnswerSheet = state.answersheet.map((item, qid) => {
                if (action.payload.SetQuestionId !== item.Question.SetQuestionId) {
                    return item;
                } else {
                    item.Question.MarksObtained = action.payload.Marks
                    return {
                        ...item
                    }
                }

            });

            return {
                ...state,
                answersheet: marksAssignedAnswerSheet
            };


        default: return state;
    }
}