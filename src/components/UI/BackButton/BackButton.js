import React from 'react'
import classes from './BackButton.module.css'

const BackButton = props => {
    return (
        <div className={classes.BackButton} onClick={props.onClick}>
            <i className="fa fa-chevron-left" /> {/* ariaHidden={true} */}
        </div>
        )
}

export default BackButton