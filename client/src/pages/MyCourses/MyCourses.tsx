import * as React from 'react'
import classes from './MyCourses.module.sass'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import NavBar from '../../components/UI/NavBar/NavBar'
import Course from '../../components/Course/Course'

import GreenRound from '../CreateCourse/GreenRound/GreenRound'
import GreenSquare from '../CreateCourse/GreenSquare/GreenSquare'
import QuizTestRounds from '../../components/QuizTestRounds/QuizTestRounds'
import QuizBlockOption from '../../components/QuizBlockOption/QuizBlockOption'
import BackButton from '../../components/UI/BackButton/BackButton'

import { MyCoursesPropsType, TCourseComponent } from '../../types/MyCoursesTypes'
import { AppStateType } from '../../store/reduceres/rootReducer'
import { initialStateType as ReducerPropsType } from '../../store/reduceres/MyCoursesReducer'
import {
  setMyCoursesPage,
  setCureentRound,
  changeCurrentRoundName,
  addNewMyCoursesRound,
  changeMyCoursesisEdit,
  setCureentSquare,
  changeSquareName,
  addNewSquare,
  changeAnswerText,
  changeCurrentTestMyCoursesPage,
  changeMyCoursesOption,
  changeTestType,
  changeRightAnswer,
  onSendCourseClick,
  getMyCourses,
  checkCourse,
  editRoundNameRequest,
  postNewRound,
  editSquareNameRequest,
  sendForVerification,
  getRounds,
  setCurrentCourseId,
  postChangedPartOfTest,
  getSquaresREST,
  postNewSquare,
  getTestData,
  postAddedTestPart,
  sendForChecking,
  viewCourse,
  deleteCourse,
  setNewViewData,
  setTestData,
  deleteRound,
  deletedSquare,
  deleteTest,
  setAddingContentData,
  changeEditCodeValueAndMode,
  setSendingAddingContentData,
  deleteAddingContentData,
  sendContentData,
  setAddingData,
} from '../../store/actions/MyCoursesActions'
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Button } from '@material-ui/core'

import AddingText from '../../components/AddingText/AddingText'
import AceCodeEditor from '../AceCodeEditor/AceCodeEditor'
import MaterialSelect from '../../components/UI/MaterialSelect/MaterialSelect'
import AppButton from '../../components/AppButton/AppButton'
import { NavLink } from 'react-router-dom'

interface TMapDispatchToProps {
  setMyCoursesPage: (page: number) => void
  setCureentRound: (roundId: number) => void
  changeCurrentRoundName: (id: number, roundName: string) => void
  addNewMyCoursesRound: (newRound: any) => void
  changeMyCoursesisEdit: (edit: boolean) => void
  setCureentSquare: (squareId: number) => void
  changeSquareName: (squareId: number, squareName: string) => void
  addNewSquare: (square: any) => void
  changeAnswerText: (id: number, text: string) => void
  changeCurrentTestMyCoursesPage: (page: number) => void
  changeMyCoursesOption: (optionName: string, id: number) => void
  changeTestType: (testType: string) => void
  changeRightAnswer: (rightAnswer: number) => void
  editRoundNameRequest: (roundId: number, newName: string) => void

  // course
  setCurrentCourseId: (courseId: number) => void
  sendForChecking: (courseId: number) => void
  viewCourse: (courseId: number, props: any) => void
  deleteCourse: (courseId: number) => void
  setNewViewData: (
    courseId: number,
    category: string,
    image: File,
    courseName: string,
    about: string,
    exp_before: string[],
    exp_after: string[]
  ) => void

  // test
  setTestData: (testData: any) => void

  // REST

  onSendCourseClick: (courseId: number) => void
  getMyCourses: () => void
  checkCourse: (courseId: number) => void
  sendForVerification: (courseId: number) => void

  sendContentData: (testId: number) => void

  // rounds
  postNewRound: (newRound: any) => void
  getRounds: (courseId: number) => void
  deleteRound: (roundId: number) => void

  // squares
  postNewSquare: (square: any) => void
  getSquaresREST: (roundId: number | null) => void
  editSquareNameRequest: (squareId: number, newName: string) => void
  deletedSquare: (squareId: number) => void

  // test
  getTestData: (squareId: number) => void
  postAddedTestPart: (testObj: any, squareId: number | null) => void
  postChangedPartOfTest: (testData: any) => void
  deleteTest: (testId: number) => void
  // theory
  setAddingContentData: (addingType: string, data: string | any) => void
  changeEditCodeValueAndMode: (mode: string, value: string, codeEditorID: number) => void
  setSendingAddingContentData: (addingType: string, data: string | any) => void
  deleteAddingContentData: () => void

  setAddingData: (partId: number, data: any) => void
}

interface TStata {
  isAnswerTextEdit: boolean
  isContentTextActive: boolean
  isContentCodeActive: boolean
}

class MyCourses extends React.Component<ReducerPropsType & TMapDispatchToProps> {
  state: TStata = {
    isAnswerTextEdit: false,
    isContentTextActive: false,
    isContentCodeActive: false,
  }

  componentDidMount() {
    this.props.getMyCourses()
  }

  componentWillUnmount() {
    this.props.setMyCoursesPage(0)
  }

  setCurrentTestPage(page: number) {
    this.props.changeCurrentTestMyCoursesPage(page)
  }

  onChangeCurrentMyCoursePage = (page: number) => {
    this.props.setMyCoursesPage(this.props.cureentMyCoursesPage + page)
  }

  clickedRound = (id: number) => {
    this.props.setCureentRound(id)
    this.props.getSquaresREST(id)
  }

  clickedSquare = (squareId: number) => {
    this.props.setCureentSquare(squareId)
    this.props.getTestData(squareId)
  }

  changeEditAnswerMode = () => {
    this.setState({
      isAnswerTextEdit: !this.state.isAnswerTextEdit,
    })
    if (this.state.isAnswerTextEdit) {
      // this.props.postChangedPartOfTest( {...this.props.testData[this.props.currentTestPage], part_id: this.props.testData[this.props.currentTestPage].id, info_text: "old", answer: "old" } )
    }
  }

  // course
  viewCourseHendler = (courseId: number) => {
    this.props.viewCourse(courseId, this.props)
  }

  onCourseEditClick = (courseId: number) => {
    this.props.getRounds(courseId)
    this.onChangeCurrentMyCoursePage(1)
  }

  addNewSquareWithREST = () => {
    const newSquare = {
      class_name: 'Урок',
      section_id: this.props.currentRound,
      id: Date.now(),
      isEdit: false,
    }
    this.props.postNewSquare(newSquare)
  }

  addNewRoundWithRESP = () => {
    const newSquare = {
      access: false,
      section_name: 'Раздел',
      course_id: this.props.currnetCourseId,
      isEdit: false,
    }
    this.props.postNewRound(newSquare)
    // this.props.addNewMyCoursesRound( newSquare )
  }

  //  TEST

  addNewTestOrTheoryHandler = () => {
    const testObj = {
      answer: ['1'],
      class_id: this.props.currentSquare,
      info_text: ['А', 'B', 'C'],
      info_title: 'Текст',
      test: true,
      token: localStorage.getItem('token'),
    }
    this.props.postAddedTestPart(testObj, this.props.currentSquare)
    // this.props.addNewTestOrTheory( testObj )
  }

  onChangeSelectWithREST = (value: string) => {
    this.props.changeTestType(value)
    // this.props.postChangedPartOfTest( value === "theory" ? { part_id: this.props.testData[this.props.currentTestPage].id,  info: this.props.testData[this.props.currentTestPage].info_title, test: false} : null )
  }

  onChangeInfoTestWithREST = (testId: number, value: string) => {
    this.props.changeAnswerText(testId, value)

    // this.props.postChangedPartOfTest( {...this.props.testData[this.props.currentTestPage], info_text: "old", answer: "old" } )
  }

  onChangeOptionWithREST = () => {
    // this.props.postChangedPartOfTest( {...this.props.testData[this.props.currentTestPage],
    //     part_id: this.props.testData[this.props.currentTestPage].id,
    //     info_title: "old",
    //     answer: "old",
    //     info_text: this.props.testData[this.props.currentTestPage].info_text } )
  }

  onChangeRightAnswer = (rightAnswer: number) => {
    if (rightAnswer > 3) {
      rightAnswer = 3
    } else if (rightAnswer < 1) {
      rightAnswer = 1
    } else if (!rightAnswer) {
      rightAnswer = 1
    }
    this.props.changeRightAnswer(rightAnswer)
    // this.props.postChangedPartOfTest( {...this.props.testData[this.props.currentTestPage],
    //     part_id: this.props.testData[this.props.currentTestPage].id,
    //     info_title: "old",
    //     answer: [`${rightAnswer}`],
    //     info_text: "old" } )
  }

  leaveThisTest = () => {
    this.props.setTestData([])
    this.onChangeCurrentMyCoursePage(-1)
  }

  callBackValueAndSetMode = (mode?: string, value?: string) => {
    // console.log("mode", mode)
    // console.log("value", value)
    this.AddSomeThimgInTeoryContent('code', '', '', { mode, value })
    // this.setState({
    //     isContentCodeActive: false
    // })
  }

  // changeCodeEditorValueAndMode = ( mode: string, value: string, id: number ) => {

  // this.props.changeEditCodeValueAndMode( mode, value, id );
  // }

  AddSomeThimgInTeoryContent = (contentType: string, text?: string, event?: any, code?: any) => {
    // let showFile
    let sendingFile
    if (event) {
      // showFile = URL.createObjectURL(event.target.files[0])
      sendingFile = event.target.files[0]
    }

    switch (contentType) {
      case 'text':
        // this.props.setAddingContentData("text", text)
        this.props.setAddingData(this.props.testData[this.props.currentTestPage].id, {
          id: Date.now(),
          type: 'text',
          info: text,
        })
        this.props.setSendingAddingContentData('text', text)
        break
      case 'image':
        if (event.target.files) {
          this.props.setAddingData(this.props.testData[this.props.currentTestPage].id, {
            id: Date.now(),
            type: 'image',
            info: sendingFile,
          })
          // this.props.setAddingContentData("image", showFile)
          this.props.setSendingAddingContentData('image', sendingFile)
        }
        break
      case 'video':
        if (event.target.files) {
          this.props.setAddingData(this.props.testData[this.props.currentTestPage].id, {
            id: Date.now(),
            type: 'video',
            info: sendingFile,
          })
          // this.props.setAddingContentData("video", showFile)
          this.props.setSendingAddingContentData('video', sendingFile)
        }
        break
      case 'code':
        this.props.setAddingData(this.props.testData[this.props.currentTestPage].id, {
          id: Date.now(),
          type: 'code',
          info: code.value ? code.value : '',
          pr_ln: code.mode ? code.mode : '',
        })
        // this.props.setAddingContentData("code", code )
        this.props.setSendingAddingContentData('code', code)
        break
    }
  }

  render() {
    console.log('Test Data', this.props.testData)
    console.log('Course id', this.props.currnetCourseId)
    console.log('Current Square id ', this.props.currentSquare)
    console.log('Theory data', this.props.theoryContentData)

    const header = (page: any) => {
      try {
        switch (page) {
          case 1:
            return this.props.coursesData.filter((el) => el.id === this.props.currnetCourseId)[0].course_name
          case 2:
            return this.props.roundData.filter((el) => el.id === this.props.currentRound)[0].section_name
          case 3:
            return this.props.squareData.filter((el) => el.id === this.props.currentSquare)[0].class_name
          default:
            return 'SciDive'
        }
      } catch (e) {
        console.log(e)
      }
    }
    const RenderCoursesComponents = (): JSX.Element[] => {
      console.log(this.props.coursesData, 'COURSE')
      return this.props.coursesData.map((item: TCourseComponent, index: number) => {
        return (
          <Course
            key={index + Date.now()}
            scope={item.scope}
            avatar={item.avatar}
            courseName={item.course_name}
            about={item.about}
            exp_before={item.exp_before}
            exp_after={item.exp_after}
            isEditCourse={true}
            itemId={item.id}
            onCourseClickHandler={() => ''}
            onCheckInside={this.props.checkCourse}
            onEditCourse={() => this.onCourseEditClick(item.id)}
            sendForChecking={this.props.sendForChecking}
            viewCourse={this.viewCourseHendler}
            deleteCourse={this.props.deleteCourse}
            onSendCourseClick={this.props.onSendCourseClick}
            moderated={item.moderated}
            sendForVerification={this.props.sendForVerification}
            setCurrentCourseId={this.props.setCurrentCourseId}
            // data for CreateCourse component
            // selectedCategoty = { this.props}
            setNewViewData={this.props.setNewViewData}
          />
        )
      })
    }

    const RenderRounds = (): JSX.Element[] => {
      return this.props.roundData.map((item: MyCoursesPropsType, index: number) => {
        return (
          <GreenRound
            key={index + Date.now()}
            addingRound={false}
            name={item.section_name}
            id={item.id}
            isEditRoundName={item.isEdit}
            changeRoundName={this.props.changeCurrentRoundName}
            nextStage={() => this.props.setMyCoursesPage(2)}
            clickedRound={this.clickedRound}
            editREST={this.props.editRoundNameRequest}
            deleteRound={this.props.deleteRound}
          />
        )
      })
    }

    const RenderSquaresComponents = (): JSX.Element[] => {
      return this.props.squareData.map((item, index) => {
        return (
          <GreenSquare
            key={index + Date.now()}
            id={item.id}
            name={item.class_name}
            addNewSquare={false}
            changeSquareName={this.props.changeSquareName}
            isEditSquareName={item.isEdit}
            nextStage={() => this.props.setMyCoursesPage(3)}
            roundId={this.props.currentRound}
            clickedSquare={this.clickedSquare}
            editREST={this.props.editSquareNameRequest}
            deleteSquare={this.props.deletedSquare}
          />
        )
      })
    }

    const RenderTestComponent_renderSelect = () => {
      let isTest
      this.props.testData.forEach((item, index) => {
        if (index === this.props.currentTestPage) {
          isTest = item.test
        }
      })
      return (
        <MaterialSelect
          items={[
            ['theory', 'Теория'],
            ['task', 'Тест'],
          ]}
          defaultItemValue={isTest ? 'task' : 'theory'}
          onChange={this.onChangeSelectWithREST}
          helperText="Тест/Теория"
        />
      )
    }

    const RenderTestComponent_renderRounds = () => {
      return this.props.testData.map((item, index) => {
        const currentRound = index === this.props.currentTestPage
        if (item.test) {
          return <QuizTestRounds key={index} currentRound={currentRound} access={true} symbol="?" />
        } else {
          return <QuizTestRounds key={index} currentRound={currentRound} access={true} symbol="=>" />
        }
      })
    }

    const RenderTestComponent_answerText = () => {
      let currentAnswerText = ''
      let testId = 0
      this.props.testData.forEach((item, index) => {
        if (index === this.props.currentTestPage) {
          if (item.test) {
            testId = item.id
            currentAnswerText = item.info_title
          } else if (!item.test) {
            testId = item.id
            currentAnswerText = 'Теория'
          }
        }
      })

      const [cur, setCur] = React.useState(currentAnswerText)
      const textField = (
        <TextField
          InputLabelProps={{ style: { color: '#ccc' } }}
          InputProps={{
            style: {
              color: '#fff',
            },
          }}
          label="Вопрос"
          value={cur}
          onBlur={(event) => {
            this.onChangeInfoTestWithREST(testId, event.target.value)
          }}
          onChange={(event: any) => {
            setCur(event.target.value)
          }}
        />
      )

      const textP = <></>

      return <div>{currentAnswerText !== 'Теория' && this.props.testData.length !== 0 ? textField : textP}</div>
      // if (this.state.isAnswerTextEdit) {
      //   return (
      //     <input
      //       value={currentAnswerText}
      //       autoFocus
      //       onBlur={() => this.changeEditAnswerMode()}
      //
      //     />
      //   )
      // } else if (!this.state.isAnswerTextEdit) {
      //   return (
      //     <>
      //       <p>{currentAnswerText}</p>
      //       <i
      //         onClick={() => this.changeEditAnswerMode()}
      //         className="fas fa-pencil-alt"
      //       ></i>
      //     </>
      //   )
      // }
    }

    const RenderTestComponent_renderOptions = (): Array<JSX.Element> => {
      let options: Array<JSX.Element> = []
      const data = this.props.testData[this.props.currentTestPage]
      if (data) {
        if (data.test) {
          data.info_text.forEach((testItem, index) => {
            options.push(
              <div key={index}>
                <QuizBlockOption
                  changeOptions={this.props.changeMyCoursesOption}
                  onRESTBlur={this.onChangeOptionWithREST}
                  option={testItem}
                  isEdit={true}
                  id={index}
                  myCourses={true}
                  numb={index + 1}
                />
              </div>
            )
          })
        }
      }

      return options
    }

    const RenderTestComponent_rigthOption = (): JSX.Element => {
      if (this.props.testData[this.props.currentTestPage]) {
        if (!this.props.testData[this.props.currentTestPage].test) return <></>
        let rightAnswer = this.props.testData[this.props.currentTestPage].answer[0]
        rightAnswer = rightAnswer.toString()

        console.log('rightAnswer', rightAnswer)
        // rightAnswer = Number(rightAnswer)
        return (
          <div className={classes.radioButtonTest}>
            <FormControl component="fieldset">
              <label htmlFor="rightOpton">Правильный ответ:</label>
              <RadioGroup
                value={Number(rightAnswer)}
                onChange={(event) => this.onChangeRightAnswer(parseInt(event.target.value, 10))}
              >
                <div style={{ display: 'flex' }}>
                  <FormControlLabel value={1} control={<Radio />} label="1" labelPlacement="top" />
                  <FormControlLabel value={2} control={<Radio />} label="2" labelPlacement="top" />
                  <FormControlLabel value={3} control={<Radio />} label="3" labelPlacement="top" />
                </div>
              </RadioGroup>
            </FormControl>
          </div>
        )
      } else {
        return <></>
      }
    }

    const RenderTestComponentRenderControls = (): JSX.Element => {
      return (
        <>
          <AppButton
            style={{
              visibility: this.props.currentTestPage === 0 ? 'hidden' : 'visible',
            }}
            onClick={() => this.setCurrentTestPage(-1)}
            variant="contained"
            color="primary"
            className={classes.margin}
          >
            Назад
          </AppButton>
          <AppButton
            onClick={() => this.setCurrentTestPage(1)}
            style={{
              visibility:
                this.props.currentTestPage === this.props.testData.length - 1 || !this.props.testData.length
                  ? 'hidden'
                  : 'visible',
            }}
            variant="contained"
            color="primary"
          >
            Далее
          </AppButton>
        </>
      )
    }

    const RenderAddingContentPanel = (): JSX.Element => {
      try {
        if (this.props.testData.length > 0 && !this.props.testData[this.props.currentTestPage].test) {
          return (
            <>
              <div className={classes.RenderAddingContentPanel_topControls}>
                <AppButton
                  onClick={() =>
                    this.setState({
                      isContentTextActive: !this.state.isContentTextActive,
                    })
                  }
                  variant="contained"
                  color="primary"
                >
                  <i className="fas fa-font"></i>
                </AppButton>
                <input
                  onChange={(event: any) => this.AddSomeThimgInTeoryContent('image', '', event)}
                  type="file"
                  accept="image/x-png,image/jpeg"
                ></input>
                <input
                  onChange={(event: any) => this.AddSomeThimgInTeoryContent('video', '', event)}
                  type="file"
                  accept="video/*"
                ></input>

                {/* CODE */}
                <AppButton
                  // onClick={() => this.setState({ isContentCodeActive: !this.state.isContentCodeActive })}
                  onClick={() => this.callBackValueAndSetMode()}
                  variant="contained"
                  color="primary"
                >
                  <i className="fas fa-code"></i>
                </AppButton>
                {/* DELETE */}
                <AppButton onClick={() => this.props.deleteAddingContentData()} variant="contained" color="primary">
                  <i className="fas fa-trash"></i>
                </AppButton>
              </div>

              <div className={classes.RenderAddingContentPanel_content}>
                {!this.props.testData[this.props.currentTestPage].test &&
                this.props.testData[this.props.currentTestPage] &&
                this.props.testData[this.props.currentTestPage].info ? (
                  this.props.testData[this.props.currentTestPage].info.map((item, index) => {
                    if (item.type === 'text') {
                      return <p key={index + Date.now()}>{item.info}</p>
                    } else if (item.type === 'image' || item.type === 'img') {
                      return (
                        <div key={index + Date.now()}>
                          <img
                            src={typeof item.info === 'string' ? item.info : URL.createObjectURL(item.info)}
                            alt=""
                          />
                        </div>
                      )
                    } else if (item.type === 'video') {
                      return (
                        <video width="600px" controls key={index + Date.now()}>
                          <source src={typeof item.info === 'string' ? item.info : URL.createObjectURL(item.info)} />
                        </video>
                      )
                    } else if (item.type === 'code') {
                      return (
                        <React.Fragment key={index + Date.now()}>
                          <AceCodeEditor
                            callBackValueAndSetMode={this.props.changeEditCodeValueAndMode}
                            codeEditorID={item.id}
                            defaultMode="python"
                            mode={item.pr_ln ? item.pr_ln : ''}
                            readOnly={false}
                            theme="mono_industrial"
                            relativeSize={2}
                            fontSize="13pt"
                            defaultInputValue={item.info}
                            defaultOutputValue={''}
                          />
                        </React.Fragment>
                      )
                    }
                    return true
                  })
                ) : (
                  <></>
                )}

                {/* ADD TEXT BUTTON */}
                {this.state.isContentTextActive && (
                  <AddingText AddSomeThimgInTeoryContent={this.AddSomeThimgInTeoryContent} />
                )}

                {/* {this.state.isContentCodeActive && <AceCodeEditor
                                callBackValueAndSetMode={this.callBackValueAndSetMode}
                                mode="python"
                                readOnly={false} // если true, то код редактировать нельзя
                                theme="mono_industrial"
                                relativeSize={2}
                                fontSize="13pt"
                                defaultInputValue=""
                                defaultOutputValue=""
                            />} */}
              </div>
            </>
          )
        } else return <></>
      } catch (e) {
        console.log(e)
        return <></>
      }
    }

    const RenderTestComponent = () => {
      // <FourthStageComponent
      // data = { this.props.testData }
      // forMyCourses = { true }
      // changeAnswerText = { this.props.changeAnswerText }
      // />

      return (
        <>
          <div className={classes.RenderTestComponent_renderSelect}>{RenderTestComponent_renderSelect()}</div>
          <div className={classes.RenderTestComponent_renderRounds_wrapper}>{RenderTestComponent_renderRounds()}</div>

          <div className={classes.RenderTestComponent_answerText}>{RenderTestComponent_answerText()}</div>

          <div className={classes.RenderTestComponent_renderOptions}>{RenderTestComponent_renderOptions()}</div>

          <div className={classes.RenderTestComponent_rigthOption}>{RenderTestComponent_rigthOption()}</div>

          <div className={classes.RenderAddingContentPanel}>
            <RenderAddingContentPanel />
          </div>

          <div className={classes.RenderTestComponentRenderControls}>
            <RenderTestComponentRenderControls />
          </div>

          <div className={classes.addOrDeleteTestPart}>
            <AppButton
              onClick={() => this.props.deleteTest(this.props.testData[this.props.currentTestPage].id)}
              variant="contained"
              color="primary"
            >
              Удалить
            </AppButton>

            <AppButton
              onClick={() => this.props.sendContentData(this.props.currentSquare ? this.props.currentSquare : 0)}
              variant="contained"
              color="primary"
            >
              Добавить тест или теорию
            </AppButton>

            {/* <AppButton 
                    onClick = { () => console.log("Seding", this.props.sendingTheoryContentData ) }
                    variant="contained"
                    color="primary">Show content data</AppButton> */}

            <AppButton
              onClick={() => this.props.postChangedPartOfTest(this.props.testData[this.props.currentTestPage])}
              variant="contained"
              color="primary"
            >
              Сохранить
            </AppButton>
          </div>
        </>
      )
    }

    const RenderMyCoursesPage = (): JSX.Element => {
      switch (this.props.cureentMyCoursesPage) {
        case 0:
          return (
            <div>
              <h1>Мои курсы</h1>
              <div className={classes.Mycourses_wrapper}>{RenderCoursesComponents()}</div>
            </div>
          )

        case 1:
          return (
            <div style={{ padding: '0 10px' }}>
              <div className={classes.flex}>
                <BackButton onClick={() => this.onChangeCurrentMyCoursePage(-1)}></BackButton>
                <NavLink to={'/about_course/?editMode=true'}>
                  <Button style={{ color: '#fff' }}>Редактировать описание курса</Button>
                </NavLink>
              </div>
              <h1>{header(1)}</h1>
              <div className={classes.mainClass_wrapper}>{RenderRounds()}</div>
              <GreenRound addingRound={true} addNewRound={this.addNewRoundWithRESP} />
            </div>
          )
        case 2:
          return (
            <div style={{ padding: '0 10px' }}>
              <BackButton onClick={() => this.onChangeCurrentMyCoursePage(-1)}></BackButton>
              <h1>{header(2)}</h1>
              {RenderSquaresComponents()}
              <GreenSquare addingSquare={true} addNewSquare={this.addNewSquareWithREST} />
            </div>
          )
        case 3:
          this.setCurrentTestPage(0)
          return (
            <div className={classes.testWrapper}>
              <div style={{ display: 'flex' }}>
                <BackButton className={classes.BackButton} onClick={() => this.leaveThisTest()}></BackButton>
                <h1>{header(3)}</h1>
              </div>
              <div className={classes.testWrapper_wrapper}>{RenderTestComponent()}</div>
            </div>
          )
        default:
          return <></>
      }
    }

    return (
      <div className={classes.mainClass}>
        <NavBar />

        <div className={classes.mainClass_wrapper}>
          <RenderMyCoursesPage />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: AppStateType) {
  return {
    roundData: state.MyCoursesReducer.roundData,
    cureentMyCoursesPage: state.MyCoursesReducer.cureentMyCoursesPage,
    coursesData: state.MyCoursesReducer.coursesData,
    currnetCourseId: state.MyCoursesReducer.currnetCourseId,
    currentRound: state.MyCoursesReducer.currentRound,
    squareData: state.MyCoursesReducer.squareData,
    currentSquare: state.MyCoursesReducer.currentSquare,

    // Test part
    testData: state.MyCoursesReducer.testData,
    currentTestPage: state.MyCoursesReducer.currentTestPage,
    theoryContentData: state.MyCoursesReducer.theoryContentData,
    sendingTheoryContentData: state.MyCoursesReducer.sendingTheoryContentData,
  }
}

export default compose(
  withRouter,
  connect<ReducerPropsType, TMapDispatchToProps, {}, AppStateType>(mapStateToProps, {
    setMyCoursesPage,
    setCureentRound,
    changeCurrentRoundName,
    addNewMyCoursesRound,
    changeMyCoursesisEdit,
    setCureentSquare,
    changeSquareName,
    addNewSquare,
    changeAnswerText,
    changeCurrentTestMyCoursesPage,
    changeMyCoursesOption,
    changeTestType,
    changeRightAnswer,
    onSendCourseClick,
    getMyCourses,
    checkCourse,
    editRoundNameRequest,
    postNewRound,
    editSquareNameRequest,
    sendForVerification,
    getRounds,
    setCurrentCourseId,
    postChangedPartOfTest,
    getSquaresREST,
    postNewSquare,
    getTestData,
    postAddedTestPart,
    sendForChecking,
    viewCourse,
    deleteCourse,
    setNewViewData,
    setTestData,
    deleteRound,
    deletedSquare,
    deleteTest,
    setAddingContentData,
    changeEditCodeValueAndMode,
    deleteAddingContentData,
    setSendingAddingContentData,
    sendContentData,
    setAddingData,
  })
)(MyCourses)
