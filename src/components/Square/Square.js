import React from 'react'
import classes from "./Square.module.css"

function Square( props ) {
    return (
        <div className = { `${classes.Square} ${ props.NotAllowed && classes.NotAllowedSquares}` }>
            <div className = { classes.Square_wrapper }>
                <h4>{ props.squareName }</h4>
            </div>
            
        </div>
    )
}

export default Square
