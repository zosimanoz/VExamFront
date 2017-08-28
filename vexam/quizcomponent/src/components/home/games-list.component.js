import React from 'react'

const GamesList = (props) => {

    const emptyMessage = (
        <p>There are no games in the store</p>
    );

    const list = (
        <div>
        <p>Games list 1</p>
        <p>Games list 1</p>
        <p>Games list 1</p>
        </div>
    )   


    return (
        <div>
            {props.games.length === 0 ? emptyMessage : list}
        </div>
    )
}


export default GamesList;