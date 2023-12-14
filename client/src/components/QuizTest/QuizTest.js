import React from 'react'

import classes from './QuizTest.module.css'
import { withRouter } from 'react-router-dom'

import QuizTestRounds from '../QuizTestRounds/QuizTestRounds'
import { connect } from 'react-redux'

import QuizBlockOption from '../../components/QuizBlockOption/QuizBlockOption'

import {
  incrementCurrentQuiz,
  decrementCurrentQuiz,
  clearQuizAnswers,
  getTestData,
  changeAccess,
  disableNextButton,
  finishRedirectTest,
  setCurrentTopRound,
} from '../../store/actions/QuizTestRoundsAction'
import { setMainId } from '../../store/actions/MainQuizControllerAction'
import NavBar from '../UI/NavBar/NavBar'
import AceCodeEditor from '../../pages/AceCodeEditor/AceCodeEditor'
import BackButton from '../UI/BackButton/BackButton'
import AppButton from '../AppButton/AppButton'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

class QuizTest extends React.Component {
  state = {
    isTestSuccessAlert: false,
    isTestFaultAlert: false,
  }
  async componentDidMount() {
    await this.props.getTestData(`/class/${this.props.SquareId}?token=${localStorage.getItem('token')}`)
    // if( this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current + 1].access === false ) {
    //     this.props.disableNextButton(true)
    // }
  }

  componentWillUnmount() {
    this.props.clearQuizAnswers()
  }

  // RenderMainContent = () => {
  //     let data = this.props.quizAsnwers.quizAsnwers[ this.props.quizAsnwers.current]
  //     data.map( (item, index ) => {
  //         debugger
  //     })
  // }

  renderContent = () => {
    if (this.props.quizAsnwers.quizAsnwers && this.props.quizAsnwers.quizAsnwers.length > 0) {
      let data = this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current]

      if (data.test) {
        return (
          <React.Fragment>
            <h1>{data.info_title}</h1>
          </React.Fragment>
        )
      } else {
        return data.info.map((item, index) => {
          console.log('item', item)
          if (item.type === 'text') {
            return <p key={index}>{item.info}</p>
          } else if (item.type === 'img') {
            return <img key={index} src={item.info} alt="" />
          } else if (item.type === 'video') {
            return (
              <video key={index} width="600px" controls>
                <source src={item.info} />
              </video>
            )
          } else if (item.type === 'code') {
            return (
              <AceCodeEditor
                key={index}
                callBackValueAndSetMode={() => {}}
                defaultMode="python"
                mode={item.pr_ln}
                readOnly={false}
                theme="mono_industrial"
                relativeSize={2}
                fontSize="13pt"
                defaultInputValue={item.info}
              />
            )
          }
          return <></>
        })
      }
    }
    return null
  }

  onIncreaseHandler = () => {
    if (this.props.quizAsnwers.current < this.props.quizAsnwers.quizAsnwers.length - 1) {
      this.props.setCurrentTopRound(this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current + 1].id)

      if (
        !this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current].test &&
        this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current + 1].test &&
        !this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current + 1].access
      ) {
        const url = `${this.props.SquareId}/${this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current].id}`
        this.props.changeAccess(url, localStorage.getItem('token'))
        this.props.disableNextButton(true)
      } else if (
        this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current].test &&
        this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current + 1].test &&
        !this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current + 1].access
      ) {
        const url = `${this.props.SquareId}/${this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current].id}`
        this.props.changeAccess(url, localStorage.getItem('token'))
        this.props.disableNextButton(true)
      } else if (this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current + 1].access === false) {
        this.props.changeAccess(
          `${this.props.SquareId}/${this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current].id}`,
          localStorage.getItem('token')
        )
      } else if (
        this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current].access &&
        !this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current + 1].test &&
        !this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current + 1].access
      ) {
        this.props.disableNextButton(true)
      }
      this.props.incrementCurrentQuiz()
    }
  }

  onDecreaseHandler = () => {
    if (this.props.quizAsnwers.current > 0) {
      this.props.decrementCurrentQuiz()
    }
  }

  squareAccessHelper = () => {
    let countAccess = 0
    let currentAccess = 'class'
    this.props.squaresData.forEach((item) => {
      if (item.access) {
        countAccess += 1
      }
    })
    if (countAccess === this.props.squaresData.length) {
      currentAccess = 'section'
    }
    debugger
    return currentAccess
  }

  optionClickHandler = async (id, rightAnswer) => {
    if (Number(id) + 1 === Number(rightAnswer)) {
      // if ( this.props.quizAsnwers.current === id &&  ( this.props.squaresCount - 1 ) == path.test ) {

      //     // this.props.history.push(`/${path.course}`)
      // } else
      if (this.props.quizAsnwers.current + 1 === this.props.quizAsnwers.quizAsnwers.length) {
        // const postPath = this.props.match.url + "/" + this.props.quizAsnwers.current
        this.props.finishRedirectTest(
          `${this.props.currentRound}/${this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current].id}`,
          localStorage.getItem('token'),
          this.props
        )
        // this.props.history.push(`/${path.course}/${path.squares}`)
      }
      // alert("It's right")
      this.setState({ isTestSuccessAlert: true })
      console.log('ALERT', this.state.isTestSuccessAlert)
      this.props.disableNextButton(false)
      setTimeout(this.onIncreaseHandler, 3000)
    } else {
      // alert('fault')
      this.setState({ isTestFaultAlert: true })
      console.log('ALERT', this.state.isTestFaultAlert)
      console.log(this.props.quizAsnwers.quizAsnwers)
    }
  }

  renderOptions() {
    if (this.props.quizAsnwers.quizAsnwers) {
      let data = this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current]
      // const rightAnswer = this.props.quizAsnwers.quizAsnwers[ this.props.quizAsnwers.current].rightOption
      if (
        this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current] !== undefined &&
        this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current].test
      ) {
        return data.info_text.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className={classes.options} onClick={() => this.optionClickHandler(index, data.answer[0])}>
                <QuizBlockOption option={item} isTest={data.test} />

                <Snackbar
                  open={this.state.isTestSuccessAlert}
                  autoHideDuration={3000}
                  onClose={() => this.setState({ isTestSuccessAlert: false })}
                >
                  <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={() => this.setState({ isTestSuccessAlert: false })}
                    severity="success"
                  >
                    Правильно!
                  </MuiAlert>
                </Snackbar>
                <Snackbar
                  open={this.state.isTestFaultAlert}
                  autoHideDuration={3000}
                  onClose={() => this.setState({ isTestFaultAlert: false })}
                >
                  <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={() => this.setState({ isTestFaultAlert: false })}
                    severity="error"
                  >
                    Ошибка :(
                  </MuiAlert>
                </Snackbar>
              </div>
            </React.Fragment>
          )
        })
      }
    }
  }

  render() {
    console.log('Curent round', this.props.roundId)
    console.log('Current square', this.props.SquareId)
    const way = this.props.quizAsnwers.quizAsnwers
    const currentRound = this.props.quizAsnwers.current
    console.log('CURREND', currentRound)
    console.log('All data', this.props.quizAsnwers.quizAsnwers)

    let rounds = []

    function quizRoundsRender() {
      if (way) {
        for (let i = 0; i < way.length; i++) {
          rounds.push(
            <React.Fragment key={i}>
              <QuizTestRounds
                symbol={way[i].test ? '?' : '=>'}
                access={way[i].access}
                currentRound={i === currentRound ? true : false}
              />
            </React.Fragment>
          )
        }
      } else {
        rounds.push(<h2 key={1}>Информации в уроке пока нет...</h2>)
      }
    }
    quizRoundsRender()

    console.log('WAY', way)
    if (!way || way.length === 0) {
      console.log('WAY NONE')
    }
    return (
      <div className={classes.QuizTest}>
        <NavBar />
        <div className={classes.newWrap}>
          <div className={classes.QuizTest_wrapper}>
            <BackButton
              onClick={() => {
                this.props.setMainId(1)
              }}
            />

            <div className={classes.QuizTest_rounds}>{rounds}</div>
            <div className={[classes.flex__space_between, classes.column].join(' ')}>
              {this.renderContent()}
              {this.renderOptions()}
            </div>

            <div className={classes.flex__space_between}>
              <AppButton
                style={{
                  visibility: this.props.quizAsnwers.current === 0 ? 'hidden' : 'visible',
                }}
                onClick={() => this.onDecreaseHandler()}
                variant="contained"
                color="primary"
                className={classes.margin}
              >
                Назад
              </AppButton>
              <div style={{ display: 'flex' }}>
                <AppButton
                  style={{
                    visibility:
                      this.props.quizAsnwers.quizAsnwers &&
                      this.props.quizAsnwers.current !== this.props.quizAsnwers.quizAsnwers.length - 1
                        ? 'visible'
                        : 'hidden',
                  }}
                  onClick={() => this.onIncreaseHandler()}
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                  disabled={this.props.disableTestButton}
                >
                  Далее
                </AppButton>
                <AppButton
                  style={{
                    visibility:
                      this.props.quizAsnwers.quizAsnwers &&
                      this.props.quizAsnwers.current === this.props.quizAsnwers.quizAsnwers.length - 1
                        ? 'visible'
                        : 'hidden',
                    width: '13vh',
                  }}
                  onClick={() =>
                    this.props.finishRedirectTest(
                      `${this.props.SquareId}/${this.props.quizAsnwers.quizAsnwers[this.props.quizAsnwers.current].id}`,
                      localStorage.getItem('token'),
                      this.props
                    )
                  }
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                  disabled={this.props.disableTestButton}
                >
                  Завершить урок
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateTothisProps(state) {
  return {
    quiz: state.quizReducer.quiz,
    quizAsnwers: state.QuizTestRoundsReducer,
    squaresCount: state.CouresSquaresReducer.squaresCount,
    disableTestButton: state.QuizTestRoundsReducer.disableTestButton,

    currentRound: state.quizReducer.currentRound,
    currentSquare: state.CouresSquaresReducer.currentSquare,

    SquareId: state.MainQuizControllerReducer.SquareId,
    roundId: state.MainQuizControllerReducer.roundId,

    squaresData: state.CouresSquaresReducer.squaresData,
  }
}

function mapDispatchTothisProps(dispatch) {
  return {
    getTestData: (path, token) => dispatch(getTestData(path, token)),
    incrementCurrentQuiz: () => dispatch(incrementCurrentQuiz()),
    decrementCurrentQuiz: () => dispatch(decrementCurrentQuiz()),
    clearQuizAnswers: () => dispatch(clearQuizAnswers()),
    changeAccess: (path, token) => dispatch(changeAccess(path, token)),
    disableNextButton: (mode) => dispatch(disableNextButton(mode)),
    finishRedirectTest: (path, token, props) => dispatch(finishRedirectTest(path, token, props)),

    setMainId: (id) => dispatch(setMainId(id)),
    setCurrentTopRound: (currentTopRound) => dispatch(setCurrentTopRound(currentTopRound)),
  }
}

export default connect(mapStateTothisProps, mapDispatchTothisProps)(withRouter(QuizTest))
