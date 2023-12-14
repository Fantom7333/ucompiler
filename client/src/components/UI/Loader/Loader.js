import React from 'react'
import classes from './Loader.module.css'

const Loader = props => {
    // PARAMS:
    //      color

    return (
        <div className={classes.Loader}>
            <div style={{background: props.color}} ></div> 
            <div style={{background: props.color}} ></div>
            <div style={{background: props.color}} ></div>
            <div style={{background: props.color}} ></div>
        </div>
    )
}

export default Loader