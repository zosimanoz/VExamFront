import React from 'react'

// we didn't use class because this is a presentational stateless component

// React has a popular pattern to divide the component into two: presentational and container
// Container component are responsible for how things work and presentational component are 
// mainly used for how things look in the application


const Question = (props) => {
    return (
        <p className="question"> {props.index}.{props.content}</p>
    )
}


export default Question;