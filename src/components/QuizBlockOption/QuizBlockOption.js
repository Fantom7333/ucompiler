import React, { useEffect, useState } from 'react'

import classes from './QuizBlockOption.module.sass'
import { Button, TextField } from '@material-ui/core'

function QuizBlockOption(props) {
  const [isEdit, setisEdit] = useState(false)
  const [inputValue, setInputValue] = useState(props.option)
  useEffect(() => {
    setInputValue(props.option)
  }, [setInputValue, props.option])
  const changeEditModeForMyCourses = async () => {
    setisEdit(false)
    await props.changeOptions(inputValue, props.id)
    props.onRESTBlur()
  }

  const changeEditMode = () => {
    setisEdit(!isEdit)
    if (props.myCourses) {
      return
    }
  }

  const chageInputValue = (event) => {
    const value = event.target.value
    setInputValue(value)
  }

  // const RenderEditContent = () => {
  //   var className = cx('fas', 'fa-pencil-alt')

  //   if (props.isEdit) {
  //     return (
  //       <div className={classes.QuizBlockOption_penciles}>
  //         <i onClick={() => changeEditMode()} className={className}></i>
  //       </div>
  //     )
  //   }
  //   return null
  // }

  const textFieldLabel = props.numb ? `Ответ ${props.numb}` : ''

  let inputItem = (
    <TextField
      label={textFieldLabel}
      variant="filled"
      onChange={chageInputValue}
      value={inputValue}
      InputLabelProps={{ style: { color: '#ccc' } }}
      InputProps={{
        style: {
          color: '#fff',
        },
      }}
      onBlur={props.myCourses ? () => changeEditModeForMyCourses() : () => changeEditMode()}
    />
  )
  let buttonItem = (
    <div className={classes.butt}>
      <Button
        variant="text"
        color="default"
        onClick={props.myCourses ? () => changeEditModeForMyCourses() : () => changeEditMode()}
      >
        {inputValue}
      </Button>
    </div>
  )

  return (
    <div className={classes.QuizBlockOption}>
      <div className={classes.QuizBlockOption_wrapper}>{props.isTest ? buttonItem : inputItem}</div>
    </div>
  )
}

export default QuizBlockOption
