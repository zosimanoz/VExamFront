import React from 'react';
import classnames from 'classnames';

import { saveGame } from '../../actions/games.action';

import { connect } from 'react-redux';



class AddGame extends React.Component {

    state = {
        title: '',
        description: '',
        errors: {},
        loading: false
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
        if (this.state.title === '') {
            errors.title = 'Title cannot be empty';
        }
        if (this.state.description === '') {
            errors.description = 'Description cannot be left empty.';
        }

        this.setState({
            errors
        });


        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const { title, description } = this.state;
            this.setState({ loading: true });

            this.props.saveGame({ title, description }).then(
                () => { },
                (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            );
        }
    }

    renderForm() {
        return (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleFormSubmit}>
                <div className={classnames('field', { errors: !!this.state.errors.title })}>
                    <label>Enter Game Title </label>
                    <input type="text"
                        name="title"
                        className="form-control"
                        value={this.state.title}
                        onChange={this.handleChange} />

                    <span>{this.state.errors.title}</span>
                </div>

                <div className={classnames('field', { errors: !!this.state.errors.description })}>
                    <label>Enter Game Title </label>
                    <input type="text"
                        name="description"
                        className="form-control"
                        value={this.state.description}
                        onChange={this.handleChange} />

                    <span>{this.state.errors.description}</span>
                </div>

                <div>
                    <button className="btn btn-success">Login</button>
                    <button className="btn btn-danger">Cancel</button>
                </div>
            </form>
        )
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1>Add game form</h1>
                    <hr />
                    {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}
                   
                    {this.renderForm()}
                </div>
            </div>
        )
    }
}



export default connect(null, { saveGame })(AddGame);