import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavBar.module.css'

import { makeStyles } from '@material-ui/core/styles'

import Layout from '../../../hoc/Layout/Layout'

import logo from '../../../images/logotip.png'
import { connect } from 'react-redux'

import { logoutUser } from '../../../store/actions/AuthAction'
import AppButton from '../../AppButton/AppButton'

const useStyles = makeStyles({
  root: {
    margin: '0 10px',
  },
})

function NavBar(props) {
  const materClasses = useStyles()

  const NavButtonsHandler = () => {
    if (props.isAuth) {
      return (
        <>
          {!localStorage.getItem('userAvatar') && !props.userAvatar ? (
            <i style={{ fontSize: '50px', marginRight: '15vh' }} className="fas fa-user"></i>
          ) : (
            <NavLink to="/profile">
              <img
                className={classes.userAvatar}
                src={props.avatar ? props.avatar : localStorage.getItem('userAvatar') || props.userAvatar}
                alt=""
              />
            </NavLink>
          )}
          <Layout />
        </>
      )
    } else {
      return (
        <>
          <NavLink to="/authorization/log_in">
            <AppButton className={materClasses.root} variant="contained" color="default">
              вход
            </AppButton>
          </NavLink>

          <NavLink to="/authorization/sign_up">
            <AppButton className={materClasses.root} variant="contained" color="default">
              регистрация
            </AppButton>
          </NavLink>
        </>
      )
    }
  }

  return (
    <div className={classes.NavBar}>
      <NavLink to="/">
        {' '}
        <img src={logo} alt="логотип компании" />{' '}
      </NavLink>

      <div className={classes.NavBar_LogIn_And_Register}>
        <NavButtonsHandler />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isAuth: state.AuthReducer.isAuth,
    userAvatar: state.AuthReducer.userAvatar,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(logoutUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
