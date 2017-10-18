import React, { Component } from 'react';

import {
    BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath, match
} from 'react-router-dom';

import '../../css/Auth.css';

import classnames from 'classnames';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { login } from '../../actions/auth.action';
import { addFlashMessage } from '../../actions/flashMessage.action';



class UserLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Email: '',
            Password: '',
            errors: {},
            loading: false,
            done: false,
            showAlerts: false
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
        if (this.state.Email === '') {
            errors.Email = 'Email cannot be empty';
        }
        if (this.state.Password === '') {
            errors.Password = 'Password cannot be left empty.';
        }

        this.setState({
            errors
        });


        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const { Email, Password } = this.state;


            this.setState({ loading: true });


            this.props.login({ Email, Password }).then(
                () => {

                    this.setState({ done: true });
                    this.setState({ loading: false });

                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You have successfully logged in. Thank you !'
                    });
                }
            );
        }
    }


    render() {
        if(this.props.authReducer.authenticated && this.props.authReducer.user.Actor === 'Interviewee'){
            return(<Redirect to={{pathname: '/exam'}} />)
        }

        return (
            <div>
                <section id="login">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-wrap">

                                          <h1>{this.props.heading}</h1>

                                    {this.props.authReducer.errors ?
                                        <div className="alert alert-danger">
                                            {this.props.authReducer.errors}
                                        </div>
                                        : ''}


                                    <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleFormSubmit}>

                                        <div className={classnames('field', { errors: !!this.state.errors.Email })} >
                                            <div className="form-group">
                                                <label className="sr-only">Email</label>
                                                <input
                                                    type="email"
                                                    name="Email"
                                                    id="Email"
                                                    value={this.state.Email}
                                                    onChange={this.handleChange}
                                                    className="form-control"
                                                    placeholder="user@example.com" />

                                                <span className="form-error">{this.state.errors.Email}</span>

                                            </div>
                                        </div>

                                        <div className={classnames('field', { errors: !!this.state.errors.Password })} >
                                            <div className="form-group">
                                                <label className="sr-only">Password</label>
                                                <input type="password"
                                                    onChange={this.handleChange}
                                                    name="Password"
                                                    id="Password"
                                                    className="form-control"
                                                    placeholder="Password" />

                                                <span className="form-error">{this.state.errors.Password}</span>

                                            </div>
                                        </div>

                                        <input type="submit" id="btn-login" className="btn btn-custom btn-lg btn-block" value="Log in" />
                                    </form>
                                </div>
                                <div className="form-wrap" id="footer">
                                    <Link to='/admin/login'>Admin Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

}


function mapStateToProps(state, props) {
    return {
        authReducer: state.authReducer
    }
}



export default connect(mapStateToProps, { login, addFlashMessage })(UserLogin);

