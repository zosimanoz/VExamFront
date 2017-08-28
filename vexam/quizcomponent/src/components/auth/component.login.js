import React, { Component } from 'react';



class Login extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form>
                        <div className="form-group">
                            <label>User Name </label>
                            <input type="text" id="user-name" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>User Name </label>
                            <input type="password" id="user-name" className="form-control" />
                        </div>

                                                <div>
                            <button className="btn btn-success">Login</button>
                            <button className="btn btn-danger">Cancel</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }

}


export default Login;

