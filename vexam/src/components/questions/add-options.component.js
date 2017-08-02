import React from 'react'

class OptionInputs extends React.Component {
  render() {
    return <div>
        <input 
            type="text"
            className="form-control" 
            name={ `option-${ this.props.index }` } 
        />

        <select name="IsAnswer">
            <option>--Make Answer--</option>
            <option>Is Answer</option>
        </select>
    </div>
  }
}


export default OptionInputs;
