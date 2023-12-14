import React from 'react'
import classes from './Background.module.css'

const Background = ({children}) => {
  return (
    <div className={classes.Background}>
      {children}
    </div>
    )
}

export default Background