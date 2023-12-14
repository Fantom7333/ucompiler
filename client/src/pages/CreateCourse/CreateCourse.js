import React, { useEffect, useState } from 'react'
import classes from './CreateCourse.module.css'

import NavBar from '../../components/UI/NavBar/NavBar'
import { useDispatch, useSelector } from 'react-redux'

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
import SkillsInput from '../../components/SkillsInput/SkillsInput'
import { TextField } from '@material-ui/core'

function CreateCourse(props) {
  const dispatch = useDispatch()

  ///// state
  const [sendingImage, setSendingImage] = useState('')
  const [imageIsAdd, setImageIsAdd] = useState(false)
  const [showPrewImage, setShowPrewImage] = useState('')
  const [courseName, setCourseName] = useState('')
  const [about, setAbout] = useState('')
  const [exp_after, setExp_after] = useState([])
  const [exp_before, setExp_before] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentRound, setCurrentRound] = useState(null)
  const [currentSquare, setCurrentSquare] = useState(null)

  ///// props
  const { newCourseData, currendCreateCoursePage, categorys } = useSelector((state) => state.CreateCourseReducer)

  /////  GET DATA  HELPERS
  useEffect(() => {
    if (props.isEditMod) {
      setShowPrewImage(props.setImage)
      setCourseName(props.courseName)
      setSelectedCategory(props.scope)
      setAbout(props.about)
      setExp_before(JSON.parse(props.exp_before))
      setExp_after(JSON.parse(props.exp_after))
    }
    dispatch(getCategorys())
    dispatch(setCurrentCreateCourseStage(0))
  }, [dispatch, props.setImage, props.courseName, props.scope, props.isEditMod, props.about, props.exp_before, props.exp_after])

  const getSqaresHelper = () => {
    const squareData = newCourseData.filter((item) => item.roundId === currentRound && item.squares)
    return squareData
  }

  ////////////////////////////////////

  const imageInputHandler = (event) => {
    if (sendingImage) {
      dispatch(
        sendImage(
          selectedCategory,
          sendingImage,
          courseName,
          localStorage.getItem('token'),
          about,
          exp_before,
          exp_after
        )
      )
    } else {
      setImageIsAdd(true)
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
  }

  const addExpBeforeHandler = () => {
    setExp_before([...exp_before, ''])
  }

  const addExpAfterHandler = () => {
    setExp_after([...exp_after, ''])
  }

  const changeExpBeforeHandler = (skill, index) => {
    const exp = [...exp_before]
    exp[index] = skill
    setExp_before(exp)
  }

  const changeExpAfterHandler = (skill, index) => {
    const exp = [...exp_after]
    exp[index] = skill
    setExp_after(exp)
  }

  const deleteExpBeforeHandler = (index) => {
    console.log(index)
    const exp = [...exp_before]
    exp.splice(index, 1)
    setExp_before(exp)
  }

  const deleteExpAfterHandler = (index) => {
    const exp = [...exp_after]
    exp.splice(index, 1)
    setExp_after(exp)
  }

  const setPreviewImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setShowPrewImage(URL.createObjectURL(event.target.files[0]))
    }
    setSendingImage(event.target.files[0])
  }

  const currendPageHandler = (page) => {
    if (page > 0 && currendCreateCoursePage < 3) {
      dispatch(chageCurrentCreateCoursePage(page))
    } else if (page < 0 && currendCreateCoursePage > 0) {
      dispatch(chageCurrentCreateCoursePage(page))
    }
  }

  const roundsSpawner = () => {
    const access = newCourseData.length === 0 ? true : false
    dispatch(
      addNewRound({
        section_name: 'название блока...',
        roundId: Math.random() * 100,
        access,
        squares: [],
      })
    )
  }

  const squaresSpawner = () => {
    const access = getSqaresHelper()[0].squares.length === 0 ? true : false
    dispatch(
      addNewSquare(currentRound, {
        class_name: 'новый раздел',
        access: access,
        squareId: Math.random() * 100,
        isEdit: false,
        test: [],
      })
    )
  }

  const RenderNewRounds = () => {
    return newCourseData.map((item, index) => {
      console.log('Round item', item.roundId)
      return (
        <div key={index + 10} className={classes.Round_wrapper}>
          <GreenRound
            id={item.roundId}
            isEditRoundName={item.isEdit}
            name={item.section_name}
            addingRound={false}
            changeRoundName={(id, roundName) => dispatch(changeRoundName(id, roundName))}
            nextStage={() => currendPageHandler(1)}
            clickedRound={(id) => setCurrentRound(id)}
          />
        </div>
      )
    })
  }

  const RenderCategoryList = () => {
    const options = []
    categorys.forEach((item) => {
      options.push([item, item])
    })
    return (
      <MaterialSelect
        items={options}
        defaultItemValue={selectedCategory}
        onChange={setSelectedCategory}
        helperText="Выберете категорию курса"
      />
    )
  }

  const FirstStage = () => (
    <>
      <RenderCategoryList />
      <div className={classes.wrapper_courseImageFileContainer}>
        <div className={classes.wrapper_courseImageFileContainer_wrapper}>
          <div className={classes.wrapper_dispalySelectedImage}>
            {showPrewImage ? <img src={showPrewImage} alt="" /> : <i className="fas fa-images"></i>}
          </div>

          <TextField
            color="secondary"
            variant="filled"
            id={classes.courseImageFile}
            type="file"
            onChange={(event) => setPreviewImage(event)}
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
            onChange={(event) => setCourseName(event.target.value)}
            value={courseName}
            name="courseNameInput"
          />
        </div>
        <div className={classes.wrapper_aboutCourseContainer}>
          <div>
            <label htmlFor="aboutCourceInput">О курсе</label>
          </div>
          <TextField
            className={classes.InputAboutCourse}
            style={{ borderBottom: 'solid 2px rgba(101, 196, 91, 0.8)' }}
            multiline
            variant="filled"
            onChange={(event) => setAbout(event.target.value)}
            value={about}
            name="aboutCourceInput"
          />
          <div>
            <label htmlFor="exp_before">Требования для прохождения курса:</label>
          </div>

          <SkillsInput
            exp={exp_before}
            onDelete={deleteExpBeforeHandler}
            onAdd={addExpBeforeHandler}
            onChangeExp={changeExpBeforeHandler}
          />
          <div>
            <label htmlFor="exp_after">Навыки, которые будут получены в результате прохождения курса:</label>
          </div>
          <SkillsInput
            exp={exp_after}
            onDelete={deleteExpAfterHandler}
            onAdd={addExpAfterHandler}
            onChangeExp={changeExpAfterHandler}
          />
        </div>

        {!imageIsAdd ? null : (
          <InfoDialog
            title="Что то пошло не так"
            content="Курс не был создан, вы не выбрали файл с фото"
            onClickOK={() => setImageIsAdd(!imageIsAdd)}
          />
        )}
      </div>
    </>
  )

  const SecondStage = () => {
    return (
      <div>
        <div>
          <RenderNewRounds />
        </div>
        <GreenRound addNewRound={roundsSpawner} addingRound={true} />
      </div>
    )
  }

  const ThirdStage = () => {
    let squares = []

    newCourseData.forEach((item) => {
      if (item.roundId === currentRound) {
        item.squares.forEach((squareItem, squareMapId) => {
          squares.push(
            <React.Fragment key={squareMapId}>
              <GreenSquare
                id={squareItem.squareId}
                name={squareItem.class_name}
                addingSquare={false}
                nextStage={() => currendPageHandler(1)}
                isEditSquareName={squareItem.isEdit}
                changeSquareName={(id, newSquareName, roundId) =>
                  dispatch(changeSquareName(id, newSquareName, roundId))
                }
                clickedSquare={setCurrentSquare}
                roundId={currentRound}
              />
            </React.Fragment>
          )
        })
      }
    })

    return (
      <div>
        {squares}
        <GreenSquare
          defaultName="новый раздел"
          addingSquare={true}
          roundId={currentRound}
          addNewSquare={squaresSpawner}
        />
      </div>
    )
  }

  const FourthStage = () => {
    let fourthStageData = []
    newCourseData.forEach((item) => {
      if (item.roundId === currentRound) {
        item.squares.forEach((squareItem) => {
          if (squareItem.squareId === currentSquare) {
            fourthStageData = squareItem.test
          }
        })
      }
    })
    return (
      <FourthStageComponent
        forMyCourses={false}
        currentRoundId={currentRound}
        currentSquareId={currentSquare}
        data={fourthStageData}
      />
    )
  }

  const RenderStages = () => {
    switch (currendCreateCoursePage) {
      case 0:
        return FirstStage()
      case 1:
        return SecondStage()
      case 2:
        return ThirdStage()
      case 3:
        return FourthStage()
      default:
        return true
    }
  }
  return (
    <div className={classes.CreateCourse}>
      {props.isEditMod ? null : <NavBar />}
      <div className={classes.wrapper}>
        <form onSubmit={(event) => onSubmitHandler(event)}>
          {RenderStages()}

          <div className={classes.wrapper_submitButtonContainer}>
            {props.isEditMod ? (
              <AppButtonLite
                onClick={() => {
                  props.setNewViewData(selectedCategory, sendingImage, courseName, about, exp_before, exp_after)
                  props.closeDialog()
                  props.history.push('/my_courses')
                }}
                variant="contained"
                color="primary"
              >
                Сохранить
              </AppButtonLite>
            ) : (
              <AppButtonLite onClick={imageInputHandler} variant="contained" color="primary">
                Создать курс
              </AppButtonLite>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default withRouter(CreateCourse)
