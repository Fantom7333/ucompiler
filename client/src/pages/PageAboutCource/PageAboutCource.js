import React from 'react'
import classes from './PageAboutCource.module.sass'
import { Navbar } from 'react-bootstrap'
import AboutCourse from '../../components/AboutCourse/AboutCourse'
import BackButton from '../../components/UI/BackButton/BackButton'
import { withRouter } from 'react-router'


function PageAboutCourse({ history }) {
  return (
    <div className={classes.PageAboutCourse}>
      <Navbar />
      <BackButton onClick={history.goBack} />
      <AboutCourse />
    </div>
  )
}

export default withRouter(PageAboutCourse)
