import React from 'react'
import classes from './AdminPage.module.sass'
import NavBar from '../../components/UI/NavBar/NavBar'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

// typse
import { TinitialState as ReducerTypes } from '../../store/reduceres/AdminPageReducer'
import { AppStateType } from '../../store/reduceres/rootReducer'

// courses
import { TgetCourses } from '../../types/AdminPageTypes'

// actions
import {
  setAdminName,
  postNewAdminUser,
  viewCourse,
  acceptCourse,
  rejectCourse,
  getCourses,
  getCanceledCourses,
} from '../../store/actions/AdminPageAction'

import MaterialSelect from '../../components/UI/MaterialSelect/MaterialSelect'
import AppButtonLite from '../../components/AppButton/AppButtonLite'

interface TDispatchAdminPage {
  getCourses: () => void
  getCanceledCourses: () => void

  setAdminName: (adminName: string) => void
  postNewAdminUser: (adminName: string) => void
  viewCourse: (props: any, courseId: number) => void

  acceptCourse: (courseId: number) => void
  rejectCourse: (courseId: number) => void
}

class AdminPage extends React.Component<ReducerTypes & TDispatchAdminPage> {
  componentDidMount() {
    this.props.getCourses()
  }

  onSelectChange = (e: string) => {
    const value = e
    if (value === '1') {
      this.props.getCourses()
    } else if (value === '2') {
      this.props.getCanceledCourses()
    }
  }

  render() {
    const RenderCourses = (): JSX.Element[] => {
      return this.props.courses.map((item: TgetCourses) => {
        return (
          <React.Fragment key={item.id}>
            <div className={classes.AdminPage_course}>
              <div className={classes.AdminPage_course_mainContent}>
                <img src={item.avatar} alt="" />
                <div className={classes.AdminPage_course_mainContent_courseNameAndButton}>
                  <p>{item.course_name}</p>
                  <AppButtonLite
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.viewCourse(this.props, item.id)}
                  >
                    Посмотреть курс
                  </AppButtonLite>
                </div>
              </div>

              <div className={classes.AdminPage_course_buttons}>
                <button
                  className={classes.AdminPage_course_buttons_accept}
                  onClick={() => this.props.acceptCourse(item.id)}
                >
                  Принять
                </button>
                <button
                  className={classes.AdminPage_course_buttons_refuse}
                  onClick={() => this.props.rejectCourse(item.id)}
                >
                  Отклонить
                </button>
              </div>
            </div>
          </React.Fragment>
        )
      })
    }

    return (
      <div>
        <NavBar />
        <div className={classes.AdminPage_wrapper}>
          <h1 style={{ textAlign: 'center', color: 'white' }}>Администрирование</h1>

          <div className={classes.AdminPage_wrapper_selectModerationMode}>
            <MaterialSelect
              items={[
                ['1', 'На модерации'],
                ['2', 'Отклонённые'],
              ]}
              defaultItemValue={'1'}
              onChange={this.onSelectChange}
            />
            {/* <select onChange={e => this.onSelectChange(e)} >
                            <option value={1}>На модерации</option>
                            <option value={2}>Отклонённеые</option>
                        </select> */}
          </div>

          <div className={classes.AdminPage_wrapper_addNewAdminUser}>
            <input
              value={this.props.newAdminUserName}
              type="text"
              placeholder="Ник пользователя"
              onChange={(e) => this.props.setAdminName(e.target.value)}
            />
            <AppButtonLite
              onClick={() => this.props.postNewAdminUser(this.props.newAdminUserName)}
              variant="contained"
              color="primary"
              disabled={this.props.disableSendNewAdminButton}
            >
              Добавить админа
            </AppButtonLite>
          </div>
        </div>

        <div className={classes.AdminPage_wrapper_courses} style={{ minHeight: '35vh', marginTop: '5vh' }}>
          {RenderCourses()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: AppStateType) {
  return {
    courses: state.AdminPageReducer.courses,
    newAdminUserName: state.AdminPageReducer.newAdminUserName,

    // buttons
    disableSendNewAdminButton: state.AdminPageReducer.disableSendNewAdminButton,
  }
}

export default compose(
  withRouter,
  connect<ReducerTypes, TDispatchAdminPage, {}, AppStateType>(mapStateToProps, {
    setAdminName,
    postNewAdminUser,
    viewCourse,
    acceptCourse,
    rejectCourse,
    getCourses,
    getCanceledCourses,
  })
)(AdminPage)
