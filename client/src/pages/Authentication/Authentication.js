import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import NavBar from '../../components/UI/NavBar/NavBar'
import { authDataPost, toggleBlockSendButton } from '../../store/actions/AuthAction'
import classes from './Authentication.module.css'

function Authentication(props) {
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    const name = InputName.current.value
    const password = InputNaPassword.current.value

    if (name.trim().length > 0 && password.trim().length > 0) {
      props.toggleBlockSendButton(true)
      await props.authDataPost(
        {
          login: name,
          password: password,
        },
        props
      )
      props.toggleBlockSendButton(false)
    }
  }

  const InputName = React.createRef()
  const InputNaPassword = React.createRef()

  return (
    <div className={classes.Authentication}>
      <NavBar />
      <h1>Авторизация</h1>

      <div className={classes.Authentication_wrapper}>
        <form className={classes.Authentication_form} onSubmit={(event) => onSubmitHandler(event)}>
          <p style={{ color: 'red' }}>{props.errorAuthMassage}</p>

          <input
            id="authName"
            placeholder="Логин"
            type="text"
            className={classes.Authentication_input}
            ref={InputName}
            required
            minLength="6"
            maxLength="15"
          />
          <label className={classes.inputLabel} htmlFor="authName">
            Логин
          </label>
          <input
            id="authPassword"
            placeholder="Пароль"
            type="password"
            className={classes.Authentication_input}
            ref={InputNaPassword}
            required
            minLength="6"
            maxLength="20"
          />
          <label className={classes.inputLabel} htmlFor="authPassword">
            Пароль
          </label>

          <input type="submit" className={classes.Authentication_input} value="Войти" disabled={props.blockButton} />

          <NavLink className={classes.Authentication_form_register} to="/authorization/sign_up">
            Регистрация
          </NavLink>
          <NavLink className={classes.Authentication_form_register} to="/authorization/forgot">
            Забыл пароль
          </NavLink>
        </form>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isAuth: state.AuthReducer.isAuth,
    authError: state.AuthReducer.authError,
    blockButton: state.AuthReducer.blockButton,
    errorAuthMassage: state.AuthReducer.errorAuthMassage,
    quiz: state.quizReducer.quiz,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    authDataPost: (data, props) => dispatch(authDataPost(data, props)),
    toggleBlockSendButton: (mode) => dispatch(toggleBlockSendButton(mode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Authentication))
