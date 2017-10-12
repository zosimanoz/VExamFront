import React from 'react'

import RawHtml from "react-raw-html"

// we didn't use class because this is a presentational stateless component

// React has a popular pattern to divide the component into two: presentational and container
// Container component are responsible for how things work and presentational component are 
// mainly used for how things look in the application


const Question = (props) => {
    return (
        <div>
            <span className="span-question-index">1. </span><RawHtml.span>{props.content}</RawHtml.span>
        </div>
    )
}


export default Question;