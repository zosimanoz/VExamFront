import React from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';

import { saveDepartment } from '../../actions/departments.action';


class AddDepartment extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        DepartmentCode: '',
        DepartmentName: '',
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

    handleFormSubmit = (e) => {
        e.preventDefault();

        // validate the form here

        let errors = {};
        if (this.state.DepartmentCode === '') {
            errors.DepartmentCode = 'Title cannot be empty';
        }
        if (this.state.DepartmentName === '') {
            errors.DepartmentName = 'Description cannot be left empty.';
        }

        this.setState({
            errors
        });


        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const { DepartmentCode, DepartmentName } = this.state;

            this.setState({ loading: true });

            this.props.saveDepartment({ DepartmentCode, DepartmentName })
            .then(() => { this.setState({ done: true }) },
                (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            );
        }
    }


    renderForm() {
        return (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleFormSubmit}>
                <div className={classnames('field', { errors: !!this.state.errors.DepartmentCode })}>
                    <label>Enter Department Code </label>
                    <input type="text"
                        name="DepartmentCode"
                        className="form-control"
                        value={this.state.DepartmentCode}
                        onChange={this.handleChange}
                        placeholder="Enter department code"
                    />

                    <span className="form-error">{this.state.errors.DepartmentCode}</span>
                </div>

                <div className={classnames('field', { errors: !!this.state.errors.DepartmentName })}>
                    <label>Enter Department Name </label>
                    <input type="text"
                        name="DepartmentName"
                        className="form-control"
                        value={this.state.DepartmentName}
                        onChange={this.handleChange}
                        placeholder="Enter department name"
                    />

                    <span className="form-error">{this.state.errors.DepartmentName}</span>
                </div>

                <div className="btn-form-margin-top">
                    <button className="btn btn-success btn-sm">Save</button>
                    <button className="btn btn-danger btn-sm btn-right-margin" type="button">Cancel</button>
                </div>
            </form>

        )
    }

    render() {

        return (
            <Panel header={this.props.heading}>
                {/*<form>
                    <div className="form-group">
                        <label htmlFor="DepartmentCode" className="sr-only">Department Code</label>
                        <input type="text" name="DepartmentCode" className="form-control" placeholder="Enter department code" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="DepartmentName" className="sr-only">Name</label>
                        <input type="text" name="DepartmentName" className="form-control" placeholder="Enter department name" />
                    </div>
                    
                    <button className="btn btn-success btn-sm" type="button">Save</button>
                    <button className="btn btn-danger btn-sm btn-right-margin" type="button">Cancel</button>
                </form>*/}

                {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                {this.state.done ? <Redirect to="/admin/departments" /> : this.renderForm()}


            </Panel>
        )

    }

}



export default connect(null, { saveDepartment })(AddDepartment);