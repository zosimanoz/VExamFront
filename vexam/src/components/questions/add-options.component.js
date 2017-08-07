import React from 'react'

class OptionInputs extends React.Component {

    constructor(props){
        super(props);
    }



    render() {
        return (
            <tr key={this.props.index}>
                <td>
                    <input type="text" name={`option-${this.props.index}`} />
                </td>
                <td>
                    <input type="checkbox" name="IsAnswer" /> Is Answer
                </td>
                <td>
                    <button type="button" data-id={this.props.index} className="btn btn-danger btn-sm" onClick={this.props.removeOption.bind(this, this.props.index)}>Remove</button>
                </td>
            </tr>
        );
    }
}


export default OptionInputs;
