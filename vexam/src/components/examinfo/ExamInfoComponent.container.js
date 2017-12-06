import React, { Component } from 'react';

import { connect } from 'react-redux';

import './examinfo.css'

import ExamWrapper from '../exam/ExamWrapper.container'


import { getExamInfo } from '../../actions/examinfo.action'



class ExamInfoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showExamPage: false
        }
    }

    componentDidMount() {
        this.props.getExamInfo();
    }

    onShowExamPage = () => {
        this.setState({
            showExamPage: true
        })
    }

    renderExamPage = () => {
        return (
            <ExamWrapper />
        )
    }

    renderExamInfoPage = () => {
        return (
            <div className="examInfoPage">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    {this.props.examInfo.examinfo}

                                    <hr />
                                    <button type="button" onClick={this.onShowExamPage} className="btn btn-primary showExamFormButton">Proceed</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.state.showExamPage ? this.renderExamPage() : this.renderExamInfoPage()}
            </div>
        );
    }
}



function mapStateToProps(state, props) {
    return {
        authReducer: state.authReducer,
        examInfo: state.examinfoReducer
    }
}


export default connect(mapStateToProps, { getExamInfo })(ExamInfoComponent);