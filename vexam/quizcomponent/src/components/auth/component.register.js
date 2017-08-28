import React, { Component } from 'react';



class Register extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form>
                        <div className="form-group">
                            <label>First Name </label>
                            <input type="text" id="first-name" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>Last Name </label>
                            <input type="text" id="last-name" className="form-control" />
                        </div>


                        <div className="form-group">
                            <label>Email </label>
                            <input type="text" id="last-name" className="form-control" />
                        </div>

                        
                        <div className="form-group">
                            <label>Contact Number </label>
                            <input type="text" id="last-name" className="form-control" />
                        </div>

                        
                        <div className="form-group">
                            <label>Address </label>
                            <input type="text" id="last-name" className="form-control" />
                        </div>

                        <div>
                            <button className="btn btn-success">Save</button>
                            <button className="btn btn-danger">Cancel</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }

}


export default Register;

