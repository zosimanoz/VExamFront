import React from 'react';

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import UsersList from './users-list.component';
import Loader from '../loader/loader.component';

import { fetchUsers, deleteUser } from '../../actions/users.action';


class UsersIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteSuccess : false
        }
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    deleteUserById = (id) => {
        this.props.deleteUser(id)
            .then((res) => {
                this.setState({ loading: false });
                this.setState({ deleteSuccess: true });
            },
            (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            );
    }

    render() {
        if (this.state.deleteSuccess) {
            alert('User deleted successfully.');
        }
        if (this.props.loader.loading) {
            return (
                <Loader loading={this.props.loader.loading} />
            );
        }
        return (
            <Panel header={this.props.heading}>
                <form id="form-list-client">
                    <div className="pull-right">
                        <NavLink exact to="/admin/users/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add New User</NavLink>
                    </div>

                     <UsersList users={this.props.usersList} deleteUserById={this.deleteUserById} />
                </form>
            </Panel>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        usersList: state.usersReducer.usersList,
        loader: state.loaderReducer
    }
}

export default connect(mapStateToProps, { fetchUsers, deleteUser })(UsersIndex);