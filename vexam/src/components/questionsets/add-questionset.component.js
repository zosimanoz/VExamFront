import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath } from 'react-router-dom';

import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';



class AddQuestionSet extends React.Component {
    constructor(props) {
        super(props);

    }


    state = {
        QuestionSetId: this.props.questionSet ? this.props.questionSet.QuestionSetId : null,
        Title: this.props.questionSet ? this.props.questionSet.Title : '',
        Description: this.props.questionSet ? this.props.questionSet.Description : '',
        errors: {},
        loading: false,
        done: false
    }


    handleChange = (e) => {

        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];

            this.setState({
                [e.target.name]: e.target.value,
                errors
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }

    }


    
    handleChangeForEditor = (value) => {
        this.setState({
            Question: value
        })
    }


    handleFormSubmit = (e) => {
        e.preventDefault();




        // validate the form here

        let errors = {};
        if (this.state.Title === '') {
            errors.Title = 'Title cannot be empty';
        }
        if (this.state.Description === '') {
            errors.Description = 'Description cannot be left empty.';
        }

        this.setState({
            errors
        });


        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            this.setState({ loading: true });
        }

    }




    renderForm() {
        return (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleFormSubmit}>

                <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className={classnames('field', { errors: !!this.state.errors.QuestionComplexityId })}>
                        <label>Question set name</label>
                        <input
                            type="text"
                            value={this.state.Title}
                            placeholder="Enter question set title."
                            className="form-control" />
                        <span className="form-error">{this.state.errors.Title}</span>
                    </div>
                </div>

                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className={classnames('field', { errors: !!this.state.errors.Description })}>
                        <label>Description</label>

                        <ReactQuill name="Question" value={this.state.Description}
                            onChange={this.handleChangeForEditor} />

                        <span className="form-error">{this.state.errors.Description}</span>
                    </div>
                </div>

                
                <div className="clearfix"></div>

                <div className="btn-form-margin-top div-add-question">
                    <button className="btn btn-success btn-sm">Save</button>
                    <button className="btn btn-danger btn-sm btn-right-margin" type="button">Cancel</button>
                </div>
            </form>
        )
    }

    render() {
        return (
            <Panel header={this.props.heading}>
                {this.renderForm()}
            </Panel>
        )
    }
}


export default AddQuestionSet;