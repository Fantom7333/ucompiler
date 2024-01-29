import React from 'react'
import LinksPage from './components/LinksSocialMedia/LinksSocialMedia'
import { Route, Switch, withRouter } from 'react-router-dom'

import Authentication from './pages/Authentication/Authentication'
import Registration from './pages/Registration/Registration'
import RecoverPassword from './pages/RecoverPassword/RecoverPassword'
import ConfirmChangePassword from './pages/ConfirmChangePassword/ConfirmChangePassword'
import MainPage from './pages/MainPage/MainPage'
import Page404 from './pages/404/404'
import Quiz from './pages/Quiz/Quiz'
import QuizTest from './components/QuizTest/QuizTest'
import Profile from './pages/Profile/Profile.tsx'
import MainQuizController from './pages/MainQuizController/MainQuizController'
import MyCourses from './pages/MyCourses/MyCourses.tsx'

import AdminPage from './pages/AdminPage/AdminPage.tsx'

import { checkUserAdmin } from './store/actions/AuthAction'

import { connect } from 'react-redux'

import { autoLogin } from './store/actions/AuthAction'

import Background from './hoc/Background/Background'
import PageAboutCourse from './pages/PageAboutCource/PageAboutCource.js'
import CreateCourse from './pages/CreateCourse/CreateCourse'
import AceCodeEditor from './pages/AceCodeEditor/AceCodeEditor'

class App extends React.Component {
  // autoLogin
  componentDidMount() {
    this.props.checkUserAdmin()
    this.props.autoLogin(this.props)
  }

  render() {
    const AuthRouterHandler = () => {
      if (this.props.isAuth) {
        return (
          <Switch>
            <Route exact path="/new_course" render={() => <CreateCourse />} />

            <Route path="/my_courses" component={MyCourses} />

            <Route exact path="/profile" component={Profile} />

            <Route exact path="/profile/:author" component={Profile} />

            <Route exact path="/course/:courseId" component={MainQuizController} />

            {/* <Route exact path = "/section/:squaresId" > <CouresSquares /> </Route> */}

            <Route exact path="/class/:testId" component={QuizTest} />

            {this.props.isAdmin && <Route path="/admin" component={AdminPage} />}

            <Route exact path="/" component={AceCodeEditor} />

            <Route exact path="/about_course/:courseId" component={PageAboutCourse} />

            <Route path="*" component={Page404} />
          </Switch>
        )
      } else {
        return (
          <Switch>
            <Route path="/authorization/sign_up">
              {' '}
              <Registration />{' '}
            </Route>
            <Route path="/authorization/log_in">
              {' '}
              <Authentication />{' '}
            </Route>

            <Route path="/authorization/forgot">
              {' '}
              <RecoverPassword />{' '}
            </Route>
            <Route path="/authorization/confirm_new_password">
              {' '}
              <ConfirmChangePassword />{' '}
            </Route>
            <Route exact path="/course/:courseId">
              {' '}
              <Quiz />{' '}
            </Route>
            {/* <Route   path = "/:course/:id" > <QuizBlock /> </Route> */}

            <Route exact path="/">
              {' '}
              <AceCodeEditor height="50vh"/>{' '}
            </Route>
            <Route path="*">
              {' '}
              <Page404 />{' '}
            </Route>
          </Switch>
        )
      }
    }

    return (
      <div className="App">
          <Background>
          <AceCodeEditor></AceCodeEditor>
        </Background>
       </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.AuthReducer.isAuth,
    isAdmin: state.AuthReducer.isAdmin,
    // isAdmin: state.ToggleMenuReducer.isAdmin,
    // isCrossed: state.ToggleMenuReducer.isCrossed,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: (props) => dispatch(autoLogin(props)),
    checkUserAdmin: () => dispatch(checkUserAdmin(checkUserAdmin)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))

