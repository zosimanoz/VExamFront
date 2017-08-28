import React from 'react'


const Pager = (props) => {

    return (
        <div>
            <button disabled = {(props.disableBtnPrev)? "disabled" : ""} className="btn btn-primary btn-sm pull-left" type="button" onClick={props.onPrevClick}>Prev</button>
            <button className="btn btn-primary btn-sm" type="button" onClick={props.onNextClick}>Next</button>
        </div>
    )

}


export default Pager;