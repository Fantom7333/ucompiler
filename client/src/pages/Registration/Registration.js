import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import NavBar from '../../components/UI/NavBar/NavBar'

import classes from './Registration.module.css'
import { connect } from 'react-redux'

import {
  postRegisterData,
  registerError,
  blockRegBnt,
  logRegisterMassage,
} from '../../store/actions/RegistrationAction'

function Registration(props) {
  const inputName = React.createRef()
  const inputEmail = React.createRef()
  const inputFIO = React.createRef()
  const inputPassword = React.createRef()
  const inputRepeatPassword = React.createRef()

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (inputPassword.current.value.trim() === inputRepeatPassword.current.value.trim()) {
      props.blockRegBnt(true)
      await props.postRegisterData(
        {
          login: inputName.current.value,
          email: inputEmail.current.value,
          fio: inputFIO.current.value,
          password: inputPassword.current.value,
        },
        props
      )
      props.blockRegBnt(false)
    } else {
      props.logRegisterMassage('Пароли не совпадают')
    }
  }

  // "Такой пользователь или email уже есть в системе"
  return (
    <div className={classes.Registration}>
      <NavBar />
      <h1>Регистрация</h1>

      <div className={classes.Registration_wrapper}>
        <form onSubmit={(event) => onSubmitHandler(event)} className={classes.Registration_wrapper_form}>
          <p style={{ color: 'red' }}>{props.registerErrorMassage} </p>

          <input id="name" type="name" placeholder="Имя" ref={inputName} required minLength="6" maxLength="15" />
          <label htmlFor="name">Имя</label>

          <input id="email" type="email" placeholder="email" ref={inputEmail} required minLength="6" maxLength="25" />
          <label htmlFor="email">email</label>

          <input id="fio" type="fio" placeholder="ФИО" ref={inputFIO} required minLength="5" maxLength="64" />
          <label htmlFor="fio">ФИО</label>

          <input
            id="password"
            type="password"
            placeholder="Пароль"
            ref={inputPassword}
            required
            minLength="6"
            maxLength="20"
          />
          <label htmlFor="password">Пароль</label>

          <input
            id="passwordAgain"
            type="password"
            placeholder="И еще раз пароль"
            ref={inputRepeatPassword}
            required
            minLength="6"
            maxLength="20"
          />
          <label htmlFor="passwordAgain">И еще раз пароль</label>

          <input type="submit" value="Зарегистрироваться" disabled={props.isBlockedButton} />

          <NavLink to="/authorization/log_in">Войти</NavLink>
        </form>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isError: state.RegistrationReducer.isError,
    registerErrorMassage: state.RegistrationReducer.registerErrorMassage,
    isBlockedButton: state.RegistrationReducer.isBlockedButton,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    postRegisterData: (data, props) => dispatch(postRegisterData(data, props)),
    registerError: (typeError) => dispatch(registerError(typeError)),
    logRegisterMassage: (massage) => dispatch(logRegisterMassage(massage)),
    blockRegBnt: (mode) => dispatch(blockRegBnt(mode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Registration))
