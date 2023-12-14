import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import AppButton from '../AppButton/AppButton'
import classes from './AddingText.module.sass'

interface TProps {
  AddSomeThimgInTeoryContent: any
}

const AddingText: React.FC<TProps> = ({ AddSomeThimgInTeoryContent }) => {
  const [textValue, setTextValue] = useState('')

  const returnValue = () => {
    AddSomeThimgInTeoryContent('text', textValue)
  }

  return (
    // <div className={classes.block}>
    //   <TextField
    //     fullWidth
    //     id="outlined-basic"
    //     label="Введите текст..."
    //     variant="outlined"
    //     color="primary"
    //     onChange={(e) => setTextValue(e.target.value)}
    //     onKeyDown={(e) => e.keyCode === 13 && returnValue()}
    //   />

    <div className={classes.block}>
      <TextField
        id="outlined-basic"
        type="text"
        // label="Введите текст..."
        // InputLabelProps={{ className: "test-label" }}
        variant="outlined"
        color="primary"
        fullWidth
        FormHelperTextProps={{ style: { color: '#fff' } }}
        onChange={(e) => setTextValue(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && returnValue()}
      />
      <div className={classes.button}>
        <AppButton variant="contained" onClick={() => returnValue()}>
          Добавить
        </AppButton>
      </div>
    </div>
  )
  // return "some text"
}
export default AddingText
