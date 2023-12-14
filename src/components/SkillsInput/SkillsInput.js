import React from 'react'

import { TextField } from '@material-ui/core'
import AppButton from '../AppButton/AppButton'

import classes from './SkillsInput.module.sass'

const SkillsInput = (props) => {
  let skills = props.exp?.map((skill, index) => {
    return (
      <div key={index} className={classes.Skill}>
        <TextField
          style={{ borderBottom: 'solid 2px rgba(101, 196, 91, 0.8)' }}
          multiline
          variant="filled"
          value={skill}
          name="skillInput"
          onChange={(event) => props.onChangeExp(event.target.value, index)}
        />
        <AppButton
          variant="contained"
          onClick={(event) => props.onDelete(index)}
        >
          <i className="fas fa-trash"></i>
        </AppButton>
      </div>
    )
  })

  return (
    <div className={classes.SkillsInput}>
      {skills}
      <AppButton variant="contained" color="primary" onClick={props.onAdd}>
        <i className="fas fa-plus"></i>
      </AppButton>
    </div>
  )
}

export default SkillsInput
