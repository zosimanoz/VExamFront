import React, { Component } from 'react';

import '../../css/Auth.css';

import classnames from 'classnames';

import { connect } from 'react-redux';

import { login } from '../../actions/auth.action';



class Login extends Component {

    
    state = {
        Email: '',
        Password: '',
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


            this.props.login({ Email, Password })
                .then(() => { 
                    this.setState({ done: true }); 
                    this.setState({ loading: false });
                },
                (err) => {

                    //err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                }
            );
        }
    }



    render() {
        return (
            <div>
                <section id="login">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-wrap">
                                    <h1>Log in with your email and password</h1>
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
                                                    placeholder="somebody@example.com" />

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



export default connect(mapStateToProps, { login })(Login);

