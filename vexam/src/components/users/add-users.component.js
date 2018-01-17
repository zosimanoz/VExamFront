import React from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';

import { Redirect, match, matchPath,NavLink } from 'react-router-dom';

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';

import { saveUser, fetchUserById, updateUser } from '../../actions/users.action';
import { fetchDepartments } from '../../actions/departments.action';

class AddUser extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            UserId: this.props.user ? this.props.user.UserId : null,
            EmailAddress: this.props.user ? this.props.user.EmailAddress : '',
            FirstName: this.props.user ? this.props.user.FirstName : '',
            MiddleName: this.props.user ? this.props.user.MiddleName : '',
            LastName: this.props.user ? this.props.user.LastName : '',
            DepartmentId: this.props.user ? this.props.user.DepartmentId : '',
            DepartmentName: this.props.user ? this.props.user.DepartmentName : '',
            RoleId: this.props.user ? this.props.user.RoleId : 1,
            RoleName: this.props.user ? this.props.user.RoleName : '',
            Password: '',
            RePassword: '',
            errors: {},
            loading: false,
            done: false,
            roles: [{
                RoleId: 1,
                RoleName: 'Admin'
            }]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }


    // after new props are received from store, the ui must be aware of the new props 
    // and show the data into the form using this lifecycle event

    // componentWillReceiveProps = (new_props) => {
    //     this.setState({
    //         DepartmentId: new_props.department.DepartmentId,
    //         DepartmentCode: new_props.department.DepartmentCode,
    //         DepartmentName: new_props.department.DepartmentName
    //     });
    // }



    // this lifecycle event works when we first load component
    componentDidMount = (props) => {
        this.props.fetchDepartments();
        if (this.props.match.params.id) {
            this.props.fetchUserById(this.props.match.params.id);
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
        if (this.state.FirstName === '') {
            errors.FirstName = 'First name cannot be empty';
        }
        if (this.state.LastName === '') {
            errors.LastName = 'Last name cannot be left empty.';
        }
        if (this.state.EmailAddress === '') {
            errors.EmailAddress = 'Email cannot be left empty.';
        }
        if (this.state.DepartmentId === '') {
            errors.DepartmentId = 'Department cannot be left empty.';
        }
        if (this.state.RoleId === '') {
            errors.RoleId = 'Role cannot be left empty.';
        }
        if (this.state.Password === '') {
            errors.Password = 'Password cannot be left empty.';
        }
        if (this.state.Password != this.state.RePassword) {
            if (this.state.Password.length > 0 && this.state.RePassword.length == 0) {
                errors.RePassword = 'Please re-enter the password';
            }else {
                errors.RePassword = 'Password did not match.';
            }
        }

        this.setState({
            errors
        });

        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const { FirstName, MiddleName, LastName, RoleId, DepartmentId,EmailAddress, Password } = this.state;


            this.setState({ loading: true });

            if(this.state.UserId) {
                this.props.updateUser({ FirstName, MiddleName, LastName, RoleId, DepartmentId,EmailAddress,Password })
                .then((res)=>{ 
                    this.setState({ loading: false });
                    this.setState({ done: true });
                 },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                 );
            }else {
                this.props.saveUser({ FirstName, MiddleName, LastName, RoleId, DepartmentId,EmailAddress,Password })
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
                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.FirstName })}>
                            <label>Enter First Name </label>
                            <input type="text"
                                name="FirstName"
                                className="form-control"
                                value={this.state.FirstName}
                                onChange={this.handleChange}
                                placeholder="Enter first name"
                            />

                            <span className="form-error">{this.state.errors.FirstName}</span>
                        </div>
                    </div>

                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.MiddleName })}>
                            <label>Enter Middle Name </label>
                            <input type="text"
                                name="MiddleName"
                                className="form-control"
                                value={this.state.MiddleName}
                                onChange={this.handleChange}
                                placeholder="Enter middle name"
                            />

                            <span className="form-error">{this.state.errors.MiddleName}</span>
                        </div>
                    </div>

                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.LastName })}>
                            <label>Enter Last Name </label>
                            <input type="text"
                                name="LastName"
                                className="form-control"
                                value={this.state.LastName}
                                onChange={this.handleChange}
                                placeholder="Enter last name"
                            />

                            <span className="form-error">{this.state.errors.LastName}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.EmailAddress })}>
                            <label>Enter Email </label>
                            <input type="email"
                                name="EmailAddress"
                                className="form-control"
                                value={this.state.EmailAddress}
                                onChange={this.handleChange}
                                placeholder="Enter email address"
                            />

                            <span className="form-error">{this.state.errors.EmailAddress}</span>
                        </div>
                    </div>

                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.DepartmentId })}>
                            <label>Select Department </label>
                            <select name="DepartmentId" title="DepartmentId" className="form-control" onChange={this.handleChange.bind(this)}>
                                <option value="0">--Select Department--</option>
                                {this.props.departments.map((department, idx) => (
                                    <option selected={department.DepartmentId === this.state.DepartmentId ? true : false} value={department.DepartmentId}>{department.DepartmentName}</option>
                                ))}
                            </select>
                            <span className="form-error">{this.state.errors.DepartmentId}</span>
                        </div>
                    </div>

                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.RoleId })}>
                            <label>Select Role </label>
                            <select name="RoleId" title="RoleId" className="form-control" onChange={this.handleChange.bind(this)}>
                                <option value="0">--Select Role--</option>
                                {this.state.roles.map((role, idx) => (
                                    <option selected={role.RoleId === this.state.RoleId ? true : false} value={role.RoleId}>{role.RoleName}</option>
                                ))}
                            </select>
                            <span className="form-error">{this.state.errors.RoleId}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.Password })}>
                            <label>Enter Password </label>
                            <input type="password"
                                name="Password"
                                className="form-control"
                                value={this.state.Password}
                                onChange={this.handleChange}
                                placeholder="Enter password"
                            />

                            <span className="form-error">{this.state.errors.Password}</span>
                        </div>
                    </div>

                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.RePassword })}>
                            <label>Re-enter password </label>
                            <input type="password"
                                name="RePassword"
                                className="form-control"
                                value={this.state.RePassword}
                                onChange={this.handleChange}
                                placeholder="Re enter password"
                            />

                            <span className="form-error">{this.state.errors.RePassword}</span>
                        </div>
                    </div>

                </div>


                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 clearfix">
                    <div className="btn-form-margin-top div-add-question pull-right">
                        <button className="btn btn-success btn-sm">Save</button>
                        <NavLink to={`/admin/users`} className="btn btn-danger btn-sm btn-right-margin"><span>Cancel</span></NavLink>
                    </div>
                </div>
            </form>

        )
    }

    render() {
        console.log(this.props)
        return (
            <Panel header={this.props.heading}>

                {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                {this.state.done ? <Redirect to="/admin/users" /> : this.renderForm()}

            </Panel>
        )

    }

}


function mapStateToProps(state, props) {
    if (props.match.params.id) {
        return {
            user: state.usersReducer.usersList.find(item => item.UserId == props.match.params.id),
            departments : state.departments
        }
    }

    return {
        user: null,
        departments : state.departments
    }
}


export default connect(mapStateToProps, { saveUser, fetchUserById , updateUser, fetchDepartments })(AddUser);