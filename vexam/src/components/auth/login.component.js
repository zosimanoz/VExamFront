import React, { Component } from 'react';

import '../../css/Auth.css';



class Login extends Component {

    render() {
        return (
            <div>
                <section id="login">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-wrap">
                                    <h1>Log in with your username and password</h1>
                                    <form>
                                        <div className="form-group">
                                            <label for="email" className="sr-only">Email</label>
                                            <input type="email" name="email" id="email" className="form-control" placeholder="somebody@example.com" />
                                        </div>
                                        <div className="form-group">
                                            <label for="key" className="sr-only">Password</label>
                                            <input type="password" name="key" id="key" className="form-control" placeholder="Password" />
                                        </div>
                                        <div className="checkbox">
                                            <span className="character-checkbox"></span>
                                            <span className="label">Show password</span>
                                        </div>
                                        <input type="submit" id="btn-login" className="btn btn-custom btn-lg btn-block" value="Log in" />
                                    </form>
                                    <a href="javascript:;" className="forget">Register new user</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

}


export default Login;

