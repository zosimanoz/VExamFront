import React from 'react';

import { Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import ExamSetList from './examset-list.component';
import Loader from '../loader/loader.component';
import { fetchExamSets, deleteExamSet } from '../../actions/examset.action';
import { connect } from 'react-redux';


class ExamSet extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchExamSets();
    }

    render() {


        if (this.props.loader.loading) {
            return (
                <Loader loading={this.props.loader.loading} />
            );
        }
        return (
            <Panel header={this.props.heading}>
                <div className="pull-right">
                    <NavLink exact to="/admin/examsets/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add Question Set</NavLink>
                </div>

                <ExamSetList examsets={this.props.examsets} deleteExamSet={this.props.deleteExamSet} />

            </Panel>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        examsets: state.examsets.examsetList,
        loader: state.loaderReducer
    }
}

export default connect(mapStateToProps, { fetchExamSets, deleteExamSet })(ExamSet);