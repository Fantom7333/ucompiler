import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import classes from './FourthStageComponent.module.sass'
import classNames from 'classnames'

import QuizTestRounds from '../../../components/QuizTestRounds/QuizTestRounds'
import QuizBlockOption from '../../../components/QuizBlockOption/QuizBlockOption'

import {
  setCurrentTestData,
  changeCurrentTestObj,
  setCurrentTestPage,
  setTypeOfTest,
  setTestText,
  setOptionsData,
  changeOptionsData,
  saveTest,
  addTestOrTheory,
  changeCurrentRightAnswer,
} from '../../../store/actions/CreateCourseAction'
import AppButton from '../../../components/AppButton/AppButton'

const cx = classNames.bind(classes)
class FourthStageComponent extends React.Component {
  state = {
    isEditTestText: false,
    inputTest: this.props.testText,

    newOptionValue: null,

    rightAnswer: 1,
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //     if ( nextState.currentTestPage !== this.props.currentTestPage ) {
  //         this.props.data.map( ( item, index ) => {
  //             console.log( "new item", item)
  //             if ( item.answer && index === nextState.currentTestPage ) {
  //                 this.setState({
  //                     answerTestTest: item.answer
  //                 })
  //             }
  //         })
  //     }
  // }

  componentDidMount() {
    console.log(this.props.currentTestPage)
    // this.props.data.map( ( item, index ) => {
    //     console.log( "new item", item)
    //     if ( item.answer && index === this.props.currentTestPage ) {
    //         this.setState({
    //             answerTestTest: item.answer
    //         })
    //     }
    // })

    if (!this.props.data.length) {
      console.log('AAAAAAAA', this.props.data)
      this.props.setOptionsData(['A', 'B', 'C'])
      const templateData = [
        {
          access: true,
          test: true,
          answer: 'Вопрос...',
          testId: Date.now(),
          rightAnswer: 1,
          info_text: ['А', 'B', 'C'],
        },
      ]
      this.props.setCurrentTestData(templateData)
    } else if (this.props.data.length) {
      // debugger
      if (this.props.data[this.props.currentTestPage].info_text)
        this.props.setOptionsData(this.props.data[this.props.currentTestPage].info_text)
      this.props.setCurrentTestData(this.props.data)
      console.log('AAAAAAAA', this.props.currentTestData)
    }

    // this.setOptionsData( this.props.currentTestPage )
  }

  componentWillUnmount() {
    this.props.setCurrentTestPage(0)
    // this.props.setOptionsData()
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     options data become empti FIX IT !!!
  }

  propsData = () => {
    let array = []

    if (this.props.forMyCourses) {
      array = this.props.data
    } else {
      array = this.props.currentTestData
    }

    return array
  }

  changeAnswerTextInMyCourses = () => {
    this.props.changeAnswerText()
  }

  setOptionsData = (page) => {
    let optionsData = []
    this.props.currentTestData.forEach((item, index) => {
      if (index === page) {
        if (item.test) {
          optionsData = item.info_text
        }
      }
    })
    return this.props.setOptionsData(optionsData)
    // debugger
    // return console.log( "NEW options ", optionsData)
  }

  chooseTypeOfTestHanlder = (event) => {
    const value = event.target.value

    // console.log( "Type of test", value )
    this.props.setTypeOfTest(value === 'task' ? true : false)
    this.props.changeCurrentTestObj()
  }

  currentTestPageHandler = (num) => {
    this.props.setCurrentTestPage(num + this.props.currentTestPage)
    // this.setOptionsData( num + this.props.currentTestPage )
  }

  turnOnEditInputMode = () => {
    this.setState({
      isEditTestText: !this.state.isEditTestText,
      inputTest: this.props.testText,
    })

    // this.props.forMyCourses ? this.props.changeAnswerText( testId , this.props.data[this.props.currentTestPage].answer ) :
    this.props.setTestText(this.state.inputTest)

    this.props.changeCurrentTestObj()

    console.log('NEW DATAAAAAAAAAA', this.props.currentTestData)
  }

  onChangeTestTextInputHandler = (event) => {
    const value = event.target.value
    this.setState({
      inputTest: value,
    })
    this.props.setTestText(value)
    // this.setState({
    //     inputTest: this.props.testText
    // })
  }

  // onChangeOptionValue = () => {

  // }
  onChangeRightAnswerInput = (event) => {
    const value = event.target.value

    // if ( parseInt(value, 10) > 3 ) {
    //     // this.setState({
    //     //     rightAnswer: 3
    //     // })
    //     this.props.changeCurrentRightAnswer( 3 )
    // } else if ( parseInt(value, 10) < 1 ) {
    //     // this.setState({
    //     //     rightAnswer: 1
    //     // })
    //     this.props.changeCurrentRightAnswer( 1 )
    // } else {
    //     // this.setState({
    //     //     rightAnswer: parseInt(value, 10)
    // })
    this.props.changeCurrentRightAnswer(parseInt(value, 10))
    this.props.changeCurrentTestObj()

    // }
  }

  // changeTypeOfTest = () => {

  // }
  addNewTestOrTheory = () => {
    this.props.addTestOrTheory()
    // this.props.setCurrentTestPage( this.props.currentTestPage + 1 )
    this.saveDataHelper()
  }

  saveDataHelper = () => {
    this.props.saveTest(this.props.currentRoundId, this.props.currentSquareId)
  }

  render() {
    console.log('Round id and square', this.props.currentRoundId, this.props.currentSquareId)
    console.log('Data', this.props.currentTestData)
    console.log(this.props.currentTestPage)
    console.log('Text', this.props.testText)
    console.log('Type of test ', this.props.typeOfTest)
    console.log('NEW options data', this.props.currentOptions)

    const RenderSelect = () => {
      return this.propsData().map((item, index) => {
        if (index === this.props.currentTestPage) {
          this.props.setTypeOfTest(item.test)
          return (
            <select
              key={index}
              value={this.props.typeOfTest ? 'task' : 'theory'}
              onChange={(event) => this.chooseTypeOfTestHanlder(event)}
            >
              <option value="theory">Теория</option>
              <option value="task">Тест</option>
            </select>
          )
        }
        return true
      })
    }

    const RenderOptionsHandler = () => {
      // debugger
      let options = []
      let isonChangeRightAnswer = false

      this.propsData().map((item, index) => {
        if (item.test && index === this.props.currentTestPage) {
          isonChangeRightAnswer = true
          return item.info_text.forEach((option, optionIndex) => {
            options.push(
              <React.Fragment key={optionIndex + Date.now()}>
                <div className={classes.Test}>
                  <QuizBlockOption
                    optionsArray={this.props.currentOptions}
                    id={optionIndex}
                    changeOptions={(id, newData) => this.props.changeOptionsData(id, newData)}
                    setInputValue={''}
                    isEdit={true}
                    option={option}
                  />
                  <h6>{optionIndex + 1}</h6>
                </div>
              </React.Fragment>
            )
          })
        }
        return true
      })
      return (
        <>
          {options}
          {isonChangeRightAnswer && (
            <div className={classes.FourthStage_optionsWrapper_rightAnswer}>
              <label htmlFor="optionAnswer">Правильный ответ:</label>
              <input
                onChange={this.onChangeRightAnswerInput}
                value={
                  this.props.forMyCourses
                    ? this.props.data[this.props.currentTestPage].rightAnswer
                    : this.props.currentRightAnswer
                }
                type="number"
                name="optionAnswer"
                min="1"
                max="3"
              />
            </div>
          )}
        </>
      )
    }
    console.log('RA', this.props.currentTestPage)
    const TopRoundsSpawner = () => {
      return this.propsData().map((item, index) => {
        // if ( index === this.props.currentTestPage ) {
        //     setTypeOfTest( item.test ? "task" : "theory" )
        // }
        //
        // this.setState({
        //     typeOfTest: item.test ? "test" : "theory"
        // })
        return (
          <QuizTestRounds
            currentRound={index === this.props.currentTestPage ? true : false}
            key={index}
            symbol={item.test === true ? '?' : '=>'}
            access={true}
          />
        )
      })
    }

    const TestAnswerRender = () => {
      const className = cx('fas', 'fa-pencil-alt')


      return this.propsData().map((item, index) => {
        if (item.answer && index === this.props.currentTestPage) {
          this.props.setTestText(item.answer)

          let renderInputOrP = this.state.isEditTestText ? (
            <input
              className={classes.changeTestText}
              autoFocus
              onChange={(event) => this.onChangeTestTextInputHandler(event)}
              onBlur={this.turnOnEditInputMode}
              value={this.state.inputTest}
            />
          ) : (
            <p key={index} className={classes.FourthStage_answerText}>
              {item.answer}
              <i onClick={this.turnOnEditInputMode} className={className}></i>
            </p>
          )

          return (
            // <i onClick = { () => alert(1) } className = { className }></i>
            renderInputOrP
          )
        } else if (item.info && index === this.props.currentTestPage) {
          this.props.setTestText(item.info)

          let renderInputOrP = this.state.isEditTestText ? (
            <input
              className={classes.changeTestText}
              autoFocus
              onChange={(event) => this.onChangeTestTextInputHandler(event)}
              onBlur={this.turnOnEditInputMode}
              value={this.state.inputTest}
            />
          ) : (
            <p key={index} className={classes.FourthStage_answerText}>
              {item.info}
              <i onClick={this.turnOnEditInputMode} className={className}></i>
            </p>
          )
          return renderInputOrP
        }
        return true
      })
    }
    console.log('Current roudn ID', this.props.currentRoundId)
    // defaultValue = { this.props.data[this.props.currentTestPage].test ? "task" : "theory" }
    return (
      <div className={classes.FourthStage}>
        <h1>Third Stage</h1>

        <div className={classes.FourthStage_wrapper}>
          <div>
            <RenderSelect />
          </div>

          <div className={classes.QuizTest_rounds}>
            <TopRoundsSpawner />
          </div>

          <div className={classes.FourthStage_testTest}>
            <TestAnswerRender />
          </div>

          <div className={classes.FourthStage_optionsWrapper}>
            <RenderOptionsHandler />
          </div>

          <div className={classes.QuizTest_controls}>
            <AppButton
              style={{ visibility: this.props.currentTestPage === 0 ? 'hidden' : 'visible' }}
              onClick={() => this.currentTestPageHandler(-1)}
              variant="contained"
              color="primary"
              className={classes.margin}
            >
              Pre
            </AppButton>
            <AppButton
              onClick={() => this.currentTestPageHandler(1)}
              style={{
                visibility:
                  this.props.currentTestPage === this.props.data.length - 1 || !this.props.data.length
                    ? 'hidden'
                    : 'visible',
              }}
              variant="contained"
              color="primary"
            >
              next
            </AppButton>
          </div>

          <div className={classes.createNewTestOfTheoryButton}>
            <AppButton variant="contained" color="primary" onClick={this.addNewTestOrTheory}>
              Добавить еще тест или теорию
            </AppButton>
          </div>
          <div>
            <AppButton onClick={() => this.saveDataHelper()} variant="contained" color="primary">
              Сохранить
            </AppButton>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateTothisProps(state) {
  return {
    currentTestData: state.CreateCourseReducer.currentTestData,

    currentTestPage: state.CreateCourseReducer.currentTestPage,
    typeOfTest: state.CreateCourseReducer.typeOfTest,
    testText: state.CreateCourseReducer.testText,

    currentOptions: state.CreateCourseReducer.currentOptions,

    currentRightAnswer: state.CreateCourseReducer.currentRightAnswer,
  }
}

function mapDispathTothisProps(dispath) {
  return {
    setCurrentTestData: (data) => dispath(setCurrentTestData(data)),
    changeCurrentTestObj: () => dispath(changeCurrentTestObj()),
    setCurrentTestPage: (page) => dispath(setCurrentTestPage(page)),
    setTypeOfTest: (type) => dispath(setTypeOfTest(type)),
    setTestText: (text) => dispath(setTestText(text)),

    setOptionsData: (data) => dispath(setOptionsData(data)),
    changeOptionsData: (id, newData) => dispath(changeOptionsData(id, newData)),

    saveTest: (roundId, squareId) => dispath(saveTest(roundId, squareId)),
    addTestOrTheory: () => dispath(addTestOrTheory()),

    changeCurrentRightAnswer: (rightAnswer) => dispath(changeCurrentRightAnswer(rightAnswer)),
  }
}

export default compose(connect(mapStateTothisProps, mapDispathTothisProps), withRouter)(FourthStageComponent)
