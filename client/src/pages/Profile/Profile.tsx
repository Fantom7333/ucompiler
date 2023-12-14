import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

//  Types
import { AppStateType } from '../../store/reduceres/rootReducer'

// actions
import {
  getProfileData,
  changeEditMode,
  setAvatar,
  changeUserName,
  sendChangedProfileData,
} from '../../store/actions/ProfileAction'

import classes from './Profile.module.sass'
import NavBar from '../../components/UI/NavBar/NavBar'

import { TinitialState as ReducerPropsType } from '../../store/reduceres/ProfileReducer'
import { TgetProfileDataCourses } from '../../types/ProfileTypes'
import AppButtonLite from '../../components/AppButton/AppButtonLite'


// import {
//   tAbout,
//   tExp,
//   tFIO
// } from './data.js'
// import { NavLink } from 'react-router-dom'

interface TDispatchProfile {
  // REST
  sendChangedProfileData: (userName: string, avatar: any) => void
  getProfileData: () => void
  ///////////////////////////
  changeEditMode: () => void
  setAvatar: (image: any) => void
  changeUserName: (userName: string) => void
}

class Profile extends Component<ReducerPropsType & TDispatchProfile> {
  state = {
    isEditUserName: false,

    sendingImage: null,
  }

  componentDidMount() {
    this.props.getProfileData()
  }

  setAvatar(event: any) {
    this.props.setAvatar(URL.createObjectURL(event.target.files[0]))
    localStorage.setItem('userAvatar', URL.createObjectURL(event.target.files[0]))
    this.setState({
      sendingImage: event.target.files[0],
    })
  }

  onChangeEditUserName() {
    this.setState({
      isEditUserName: !this.state.isEditUserName,
    })
  }

  onChangeUserName(event: any) {
    this.props.changeUserName(event.target.value)
  }

  sendChangedProfileDataHandler() {
    this.props.sendChangedProfileData(this.props.userName, this.state.sendingImage ? this.state.sendingImage : 'old')
    this.props.changeEditMode()
    this.forceUpdate()
  }

  render() {
    const RenderProfileInfo = (): JSX.Element => {
      if (this.props.isProfileEditMode) {
        return (
          <>
            <div className={classes.Profile_wrapper_editModeUserName}>
              {this.state.isEditUserName ? (
                <input
                  autoFocus
                  onBlur={() => this.onChangeEditUserName()}
                  value={this.props.userName}
                  onChange={(event) => this.onChangeUserName(event)}
                />
              ) : (
                <h1>{`Профиль ${this.props.userName}`}</h1>
              )}
              <i onClick={() => this.onChangeEditUserName()} className="fas fa-pencil-alt"></i>
            </div>

            <div className={classes.Profile_wrapper_editModeUserAvatar}>
              <div className={classes.Profile_wrapper_editModeUserAvatar_wrapper}>
                <img src={this.props.avatar} alt="" />
                <div className={classes.Profile_wrapper_editModeUserAvatar_imageInput}>
                  <input
                    id={classes.Profile_wrapper_editModeUserAvatar_ImageInput}
                    onChange={(event) => this.setAvatar(event)}
                    type="file"
                    accept="image/x-png,image/jpeg"
                  />
                </div>
              </div>
            </div>
          </>
        )
      } else {
        return (
          <>
            <h1>{`Профиль ${this.props.userName}`}</h1>
            <img className={classes.Profile_wrapper_image} src={this.props.avatar} alt="" />
          </>
        )
      }
    }

    const RenderCoursesProgresses = (): JSX.Element => {
      return (
        <>
          {this.props.courses.map((item: TgetProfileDataCourses) => {
            return (
              <div className={classes.Profile_wrapper_renderCoursesProgresses}>
                <img src={`http://127.0.0.1:5000/${item.avatar} `} alt="" />
                <p>{item.course_name} </p>
                <div className={classes.Profile_wrapper_renderCoursesProgresses_progressBar}>
                  {item.progress >= 100 ? (
                    <div style={{ height: '100%', width: `${item.progress}%`, backgroundColor: '#70c452' }}></div>
                  ) : (
                    <div style={{ height: '100%', width: `${item.progress}%`, backgroundColor: 'blue' }}></div>
                  )}
                  <p>{item.progress}%</p>
                </div>
              </div>
            )
          })}
        </>
      )
    }

    return (
      <div className={classes.mainClass}>
        <NavBar avatar={this.props.avatar} />
        <div className={classes.Profile_wrapper}>
          <RenderProfileInfo />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <RenderCoursesProgresses />
          </div>
        </div>
        <div className={classes.mainClass_editButton}>
          <AppButtonLite
            onClick={
              this.props.isProfileEditMode
                ? () => this.sendChangedProfileDataHandler()
                : () => this.props.changeEditMode()
            }
            className={classes.editProfileButton}
            variant="contained"
            color="primary"
          >
            {this.props.isProfileEditMode ? 'Сохранить' : 'Редактировать'}
          </AppButtonLite>
          {/* <div className={classes.about}>
            <h4>ФИО:</h4>
            <h4>{tFIO}</h4>
            <NavLink to={`/course/1`}>
              <AppButtonLite>Редактировать</AppButtonLite>
            </NavLink>
          </div>
          <div className={classes.about}>
            <h4>ФИО:</h4>
            <h4>{tAbout}</h4>
            <NavLink to={`/course/1`}>
              <AppButtonLite>Редактировать</AppButtonLite>
            </NavLink>
          </div>
          <div className={classes.about}>
            <h4>ФИО:</h4>
            <h4>{tExp}</h4>
            <NavLink to={`/course/1`}>
              <AppButtonLite>Редактировать</AppButtonLite>
            </NavLink>
          </div> */}
        </div>
      </div>
    )
  }
}

// let lisAfter = AfterList.map((note) => <li key={note.id}>{note.text}</li>)

function mapStateToProps(state: AppStateType) {
  return {
    Owner: state.ProfileReducer.Owner,
    userName: state.ProfileReducer.userName,
    avatar: state.ProfileReducer.avatar,
    courses: state.ProfileReducer.courses,
    isProfileEditMode: state.ProfileReducer.isProfileEditMode,
  }
}

export default compose(
  connect<ReducerPropsType, TDispatchProfile, {}, AppStateType>(mapStateToProps, {
    getProfileData,
    changeEditMode,
    setAvatar,
    changeUserName,
    sendChangedProfileData,
  }),
  withRouter
)(Profile)
