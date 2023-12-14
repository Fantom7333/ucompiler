import React from 'react'
import classes from './MainPageContent.module.sass'

import Quiz from '../../components/Quiz/Quiz'

function MainPageContent() {
  return (
    <div className={`${classes.mainClass} ${classes.wrapper}`}>
      <Quiz />
    </div>
  )
}

export default MainPageContent
