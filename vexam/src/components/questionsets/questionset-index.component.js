import React from 'react';

import { Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import QuestionSetList from './questionset-list.component';

class QuestionSet extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //this.props.fetchQuestionSets();
    }

    render() {
        let questionsets = [{
            QuestionSetId : 1,
            Title : 'Question set one',
            Deleted: false 
        }]
         return (
            <Panel header={this.props.heading}>
                    <div className="pull-right">
                        <NavLink exact to="/admin/questionset/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add Question Set</NavLink>
                    </div>

                    <QuestionSetList questionsets={questionsets} />

            </Panel>
         );
    }
}

export default QuestionSet;