import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';


class AddDepartment extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        return (
            <Panel header={this.props.heading}>
                <form>
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
                </form>
            </Panel>
        )

    } 

}


export default AddDepartment;