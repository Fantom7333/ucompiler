// home

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { clearCourses, getCourses, setCurentCourse } from '../../store/actions/mainPageAction'
import { setMainId } from '../../store/actions/MainQuizControllerAction'
import Course from '../Course/Course'
import LeftSideMenu from '../LeftSideMenu/LeftSideMenu'
import classes from './Quiz.module.css'

class Quiz extends React.Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.props.getCourses(this.props.history.location.search)

    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    this.props.clearCourses()
  }

  onCourseClickHandler = (id) => {
    this.props.setCurentCourse(id)
    this.props.setMainId(0)
  }

  render() {
    document.title = 'Наши курсы'

    const RenderQuizes = () => {
      return this.props.mainPageQuizes.map((item, index) => {
        return (
          <div key={item + index} className={classes.Quiz_item}>
            <Course
              courseName={item.course_name}
              avatar={item.avatar}
              isEditCourse={false}
              itemId={item.id}
              scope={item.scope}
              onCourseClickHandler={(id) => this.onCourseClickHandler(id)}
            />
          </div>
        )
      })
    }

    const content = (
      <React.Fragment>
        <LeftSideMenu />
        <h1 className={classes.h1}>Наши курсы</h1>
        <div className={classes.Quiz_wrapper}>
          <RenderQuizes />
        </div>
      </React.Fragment>
    )

    const renderContent = this.state.loading ? <h1>loading...</h1> : content

    return <div className={classes.Quiz}>{renderContent}</div>
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quizReducer.quiz,
    mainPageQuizes: state.mainPageReducer.mainPageCourses,
    currentCourse: state.mainPageReducer.currentCourse,
    recoverEmail: state.RecoverPasswordReducer.recoverEmail,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCourses: (path) => dispatch(getCourses(path)),
    clearCourses: () => dispatch(clearCourses()),
    setCurentCourse: (course) => dispatch(setCurentCourse(course)),

    setMainId: (id) => dispatch(setMainId(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz))
