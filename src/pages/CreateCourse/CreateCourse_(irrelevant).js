import React, { Component, useRef } from 'react'
import classes from './CreateCourse.module.css'

import NavBar from '../../components/UI/NavBar/NavBar'
import { compose } from 'redux'
import { connect } from 'react-redux'

import MaterialSelect from '../../components/UI/MaterialSelect/MaterialSelect'

import {
  sendImage,
  getCategorys,
  chageCurrentCreateCoursePage,
  addNewRound,
  addNewSquare,
  changeRoundName,
  changeSquareName,
  setCurrentCreateCourseStage,
} from '../../store/actions/CreateCourseAction'
import { withRouter } from 'react-router'

import GreenRound from './GreenRound/GreenRound'
import GreenSquare from './GreenSquare/GreenSquare'
import FourthStageComponent from './FourthStageComponent/FourthStageComponent'
import InfoDialog from '../../components/UI/InfoDialog/InfoDialog'
import AppButtonLite from '../../components/AppButton/AppButtonLite'
import { TextField } from '@material-ui/core'

class CreateCourse extends Component {
  state = {
    sendingImage: '',
    imageIsAdd: false,
    dialogOpen: false,
    showPrewImage: '',
    courseName: '',
    about: '',
    exp_before: '',
    exp_after: '',
    selectedCategory: '',
    isEditRoundName: false,

    currentRound: null,
    currentSquare: null,
  }

  /////  GET DATA  HELPERS

  componentDidMount() {
    if (this.props.isEditMod) {
      this.setState({
        showPrewImage: this.props.setImage,
        courseName: this.props.courseName,
        selectedCategory: this.props.scope,
      })
    }
    // this.props.TestBlobImage();
    this.props.getCategorys()
    this.props.setCurrentCreateCourseStage(0)
  }

  getSqaresHelper = () => {
    const squareData = this.props.newCourseData.filter(
      (item) => item.roundId === this.state.currentRound && item.squares
    )
    return squareData
  }

  /////////////////////////////////////////////////////////////////////////

  imageInputHandler = (event) => {
    if (this.state.sendingImage) {
      this.props.sendImage(
        this.state.selectedCategory,
        this.state.sendingImage,
        this.state.courseName,
        localStorage.getItem('token')
      )
    } else {
      this.setState({
        imageIsAdd: true,
      })
    }
  }

  onSubmitHandler = (event) => {
    event.preventDefault()
  }

  setPreviewImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        showPrewImage: URL.createObjectURL(event.target.files[0]),
      })
    }
    const image = event.target.files[0]

    this.setState({
      sendingImage: image,
    })
  }

  selectHandler = (value) => {
    this.setState({
      selectedCategory: value,
    })
  }

  // changeRoundName = (id, newRoundName ) => {
  //     // this.setState({
  //     //     isEditRoundName: !this.state.isEditRoundName
  //     // })
  //     this.props.changeRoundName(id, newRoundName )
  //     console.log(222)
  // }

  currendPageHandler = (page) => {
    if (page > 0 && this.props.currendCreateCoursePage < 3) {
      this.props.chageCurrentCreateCoursePage(page)
    } else if (page < 0 && this.props.currendCreateCoursePage > 0) {
      this.props.chageCurrentCreateCoursePage(page)
    }
  }
  // onImageChange = (event) => {
  //     if (event.target.files && event.target.files[0]) {
  //       let reader = new FileReader();
  //       reader.onload = (e) => {
  //         this.setState({image: e.target.result});
  //       };
  //     }
  // }

  roundsSpawner = () => {
    const access = this.props.newCourseData.length === 0 ? true : false
    this.props.addNewRound({ section_name: 'название блока...', roundId: Math.random() * 100, access, squares: [] })
  }

  squaresSpawner = () => {
    const access = this.getSqaresHelper()[0].squares.length === 0 ? true : false
    // console.log("this.getSqaresHelper()", this.getSqaresHelper()[0].squares )
    this.props.addNewSquare(this.state.currentRound, {
      class_name: 'новый раздел',
      access: access,
      squareId: Math.random() * 100,
      isEdit: false,
      test: [],
    })
  }

  clickedRound = (id) => {
    console.log('clickedRound', id)
    this.setState({
      currentRound: id,
    })
  }

  clickedSquare = (id) => {
    console.log('clickedSquare', id)

    this.setState({
      currentSquare: id,
    })
  }

  // addingNewSquareHandler = () => {
  //     // alert("added")
  //     console.log( this.props.newCourseData[this.state.currentRound].squares )
  //     addNewSquare(this.state.currentRound, {squarName: "новый раздел", access: false} )
  // }

  // addNewSquare = () => {
  //     console.log("ADDED")
  // }
  dialogHandler = () => {
    this.setState({
      imageIsAdd: !this.state.imageIsAdd,
    })
  }
  render() {
    console.log('newCourseData', this.props.newCourseData)
 

    const RenderNewRounds = () => {
      return this.props.newCourseData.map((item, index) => {
        console.log('Round item', item.roundId)
        return (
          <div key={index + 10} className={classes.Round_wrapper}>
            <GreenRound
              id={item.roundId}
              isEditRoundName={item.isEdit}
              name={item.section_name}
              addingRound={false}
              changeRoundName={this.props.changeRoundName}
              nextStage={() => this.currendPageHandler(1)}
              clickedRound={(id) => this.clickedRound(id)}
            />
          </div>
        )
      })
    }

    const RenderCategoryList = () => {
      const options = []
      this.props.categorys.forEach((item) => {
        options.push([item, item])
      })
      return (
        <MaterialSelect
          items={options}
          defaultItemValue={this.state.selectedCategory}
          onChange={this.selectHandler}
          helperText="Выберете категорию курса"
        />
      )
    }

    const FirstStage = () => {
      console.log(this.state.courseName, 'fffff')
      // const emails = ['username@gmail.com', 'user02@gmail.com']

      // const handleListItemClick = (value) => {
      //     onClose(value);
      //   }
      let courseName = React.createRef()
      const about = useRef('')
      const exp_before = useRef('')
      const exp_after = useRef('')
      const uploadState = () => {
        // this.setState({
        //   courseName: courseName.current.value,
        //   about: about.current.value,
        //   exp_before: exp_before.current.value,
        //   exp_after: exp_after.current.value,
        // })
        // console.log(this.state.courseName, "GGGGGGGGG")
        console.log(courseName.current.value, 'ggggggggg')
      }

      const test = (event) => {
        event.preventDefault()
        this.setState({ courseName: event.target.value })
      }
      return (
        <>
          <RenderCategoryList />

          <div className={classes.wrapper_courseImageFileContainer}>
            <div className={classes.wrapper_courseImageFileContainer_wrapper}>
              <div className={classes.wrapper_dispalySelectedImage}>
                {this.state.showPrewImage ? (
                  <img src={this.state.showPrewImage} alt="" />
                ) : (
                  <i className="fas fa-images"></i>
                )}
              </div>

              <TextField
                color="secondary"
                variant="filled"
                id={classes.courseImageFile}
                type="file"
                onChange={(event) => this.setPreviewImage(event)}
                accept="image/x-png,image/jpeg"
              />
            </div>

            <div className={classes.wrapper_courseNameContainer}>
              <div>
                <label htmlFor="courseNameInput">Название курса</label>
              </div>
              <TextField
                key="courseNameInput"
                variant="filled"
                size="small"
                ref={courseName}
                // onChange={(event) => courseName = event.target.value}
                // onChange={(event) => this.setState({ courseName: event.target.value })}
                onChange={test}
                // onBlur={uploadState}
                value={this.state.courseName}
                // value={courseName}
                name="courseNameInput"
              />
            </div>
            <div className={classes.wrapper_aboutCourseContainer}>
              <div>
                <label htmlFor="aboutCourceInput">О курсе</label>
              </div>
              <TextField
                variant="filled"
                onChange={(event) => (about.current = event.target.value)}
                value={about.current.value}
                name="aboutCourceInput"
              />
              <div>
                <label htmlFor="exp_before">Требования для прохождения курса:</label>
              </div>
              <TextField
                onChange={(event) => this.setState({ exp_before: event.target.value })}
                value={this.state.exp_before}
                variant="filled"
                size="small"
                name="exp_before"
              />
              <div>
                <label htmlFor="exp_after">Навыки, которые будут получены в результате прохождения курса:</label>
              </div>
              <TextField
                onChange={(event) => this.setState({ exp_after: event.target.value })}
                value={this.state.exp_after}
                variant="filled"
                size="small"
                name="exp_after"
              />
            </div>

            {!this.state.imageIsAdd ? null : (
              <InfoDialog
                title="Что то пошло не так"
                content="Курс не был создан, вы не выбрали файл с фото"
                onClickOK={this.dialogHandler}
              />
            )}
          </div>
        </>
      )
    }

    const SecondStage = () => {
      return (
        <div>
          {/* <h1>Second stage</h1> */}
          <div>
            <RenderNewRounds />
          </div>

          <GreenRound addNewRound={this.roundsSpawner} addingRound={true} />
        </div>
      )
    }

    const ThirdStage = () => {
      const currentRound = this.state.currentRound
      let squares = []

      this.props.newCourseData.forEach((item) => {
        if (item.roundId === currentRound) {
          item.squares.forEach((squareItem, squareMapId) => {
            squares.push(
              <React.Fragment key={squareMapId}>
                <GreenSquare
                  id={squareItem.squareId}
                  name={squareItem.class_name}
                  addingSquare={false}
                  nextStage={() => this.currendPageHandler(1)}
                  isEditSquareName={squareItem.isEdit}
                  changeSquareName={this.props.changeSquareName}
                  // changeSquareName = { this.props.changeSquareName }
                  clickedSquare={this.clickedSquare}
                  roundId={this.state.currentRound}
                />
              </React.Fragment>
            )
          })
        }
      })

      return (
        <div>
          {/* <h1>Third stage</h1> */}
          {squares}
          <GreenSquare
            defaultName="новый раздел"
            addingSquare={true}
            roundId={this.state.currentRound}
            addNewSquare={this.squaresSpawner}
          />
        </div>
      )
    }

    const FourthStage = () => {
      const currSq = this.state.currentRound
      let fourthStageData = []
      this.props.newCourseData.forEach((item) => {
        if (item.roundId === currSq) {
          item.squares.forEach((squareItem) => {
            if (squareItem.squareId === this.state.currentSquare) {
              fourthStageData = squareItem.test
            }
          })
        }
      })
      return (
        <FourthStageComponent
          forMyCourses={false}
          currentRoundId={this.state.currentRound}
          currentSquareId={this.state.currentSquare}
          data={fourthStageData}
        />
      )
    }

    const RenderStages = () => {
      switch (this.props.currendCreateCoursePage) {
        case 0:
          return <FirstStage key="asdfdfs" />
        case 1:
          return <SecondStage />
        case 2:
          return <ThirdStage />
        case 3:
          return <FourthStage />
        default:
          return true
      }
    }

    return (
      <div className={classes.CreateCourse}>
        {this.props.isEditMod ? null : <NavBar />}
        <div className={classes.wrapper}>
          <form onSubmit={(event) => this.onSubmitHandler(event)}>
            {/* { this.props.currendCreateCoursePage == 0 ? <FirstStage /> : this.props.currendCreateCoursePage == 1 ? <SecondStage /> : <ThirdStage /> } */}

            <RenderStages />

            <input 
            value={this.state.courseName}
            onChange={(e) => this.setState({courseName: e.target.value})}
            />

            <div className={classes.wrapper_submitButtonContainer}>
              {this.props.isEditMod ? (
                <AppButtonLite
                  onClick={() => {
                    this.props.setNewViewData(
                      this.state.selectedCategory,
                      this.state.sendingImage,
                      this.state.courseName,
                      this.props.history
                    )
                    this.props.closeDialog()
                    this.props.history.push('/my_courses')
                  }}
                  variant="contained"
                  color="primary"
                >
                  Сохранить
                </AppButtonLite>
              ) : (
                <AppButtonLite onClick={this.imageInputHandler} variant="contained" color="primary">
                  Создать курс
                </AppButtonLite>
              )}
            </div>

            {/*
                            <div>
                            { this.props.currendCreateCoursePage != 0 && <AppButtonLite onClick = { () => this.currendPageHandler(-1) } variant="contained" color="primary" >Предедущий этап</AppButtonLite> }
                        </div>

                        <div>
                            { this.props.currendCreateCoursePage >= 0 && this.props.currendCreateCoursePage != 1 && <AppButtonLite onClick = { () => this.currendPageHandler(1) } variant="contained" color="primary" >Следующий этап</AppButtonLite>}
                        </div>
                        */}
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    courseImage: state.CreateCourseReducer.courseImage,
    categorys: state.CreateCourseReducer.categorys,
    currendCreateCoursePage: state.CreateCourseReducer.currendCreateCoursePage,
    newCourseData: state.CreateCourseReducer.newCourseData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendImage: (scope, image, name, token) => dispatch(sendImage(scope, image, name, token)),
    getCategorys: () => dispatch(getCategorys()),

    chageCurrentCreateCoursePage: (page) => dispatch(chageCurrentCreateCoursePage(page)),
    setCurrentCreateCourseStage: (page) => dispatch(setCurrentCreateCourseStage(page)),

    addNewRound: (data) => dispatch(addNewRound(data)),
    addNewSquare: (roundId, data) => dispatch(addNewSquare(roundId, data)),
    changeRoundName: (id, roundName) => dispatch(changeRoundName(id, roundName)),
    changeSquareName: (id, newSquareName, roundId) => dispatch(changeSquareName(id, newSquareName, roundId)),
  }
}

// const CreateCourseForm = reduxForm({

//     form: "createCourseForm"
// }) (CreateCourse)

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(CreateCourse)
