import React from 'react';

import { Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import ExamSetList from './examset-list.component';

import { fetchExamSets, deleteExamSetById} from '../../actions/examset.action';
import { connect } from 'react-redux';


class ExamSet extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchExamSets();
    }

    render() {
        // let questionsets = [{
        //     QuestionSetId : 1,
        //     Title : 'Question set one',
        //     Deleted: false 
        // }]

        console.log(this.props)
        
         return (
            <Panel header={this.props.heading}>
                    <div className="pull-right">
                        <NavLink exact to="/admin/examsets/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add Question Set</NavLink>
                    </div>

                    <ExamSetList examsets={this.props.examsets} deleteExamSetById={this.props.deleteExamSetById}/>

            </Panel>
         );
    }
}


const mapStateToProps = (state) => {
    return {
        examsets: state.examsets.examsetList
    }
}

export default connect(mapStateToProps,{fetchExamSets, deleteExamSetById})(ExamSet);