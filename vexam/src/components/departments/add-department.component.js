import React from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';

import { Redirect, match, matchPath,NavLink } from 'react-router-dom';

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';

import { saveDepartment, fetchDepartmentById, updateDepartment } from '../../actions/departments.action';


class AddDepartment extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            DepartmentId: this.props.department ? this.props.department.DepartmentId : null,
            DepartmentCode: this.props.department ? this.props.department.DepartmentCode : '',
            DepartmentName: this.props.department ? this.props.department.DepartmentName : '',
            errors: {},
            loading: false,
            done: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }


    // after new props are received from store, the ui must be aware of the new props 
    // and show the data into the form using this lifecycle event

    componentWillReceiveProps = (new_props) => {
        this.setState({
            DepartmentId: new_props.department.DepartmentId,
            DepartmentCode: new_props.department.DepartmentCode,
            DepartmentName: new_props.department.DepartmentName
        });
    }

    // this lifecycle event works when we first load component
    componentDidMount = (props) => {
        if (this.props.match.params.id) {
            this.props.fetchDepartmentById(this.props.match.params.id);
        }
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
            const { DepartmentId, DepartmentCode, DepartmentName } = this.state;


            this.setState({ loading: true });

            if(DepartmentId) {
                this.props.updateDepartment({ DepartmentId, DepartmentCode, DepartmentName })
                .then((res)=>{ 
                    this.setState({ loading: false });
                    this.setState({ done: true });
                 },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                 );
            }else {
                this.props.saveDepartment({ DepartmentCode, DepartmentName })
                .then((res) => { 
                    this.setState({ loading: false });                    
                    this.setState({ done: true }); 
                },
                (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            );
            }
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
                     <NavLink to={`/admin/departments`} className="btn btn-danger btn-sm btn-right-margin"><span>Cancel</span></NavLink>
                </div>
            </form>

        )
    }

    render() {

        return (
            <Panel header={this.props.heading}>

                {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                {this.state.done ? <Redirect to="/admin/departments" /> : this.renderForm()}

            </Panel>
        )

    }

}


function mapStateToProps(state, props) {
    if (props.match.params.id) {
        return {
            department: state.departments.find(item => item.DepartmentId == props.match.params.id)
        }
    }

    return {
        department: null
    }
}


export default connect(mapStateToProps, { saveDepartment, fetchDepartmentById , updateDepartment })(AddDepartment);