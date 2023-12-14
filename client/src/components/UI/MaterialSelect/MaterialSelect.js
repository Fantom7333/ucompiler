import React from 'react'
import classes from './MaterialSelect.module.css'

import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const MaterialSelect = (props) => {
  // PARAMETRS:
  //      items:
  //          type: array
  //          example: [[value1, label1], [value2, label2]...]
  //
  //      defaultItemValue:
  //          type: String
  //          example: value1X
  //      onChange:
  //          type: func
  //          example: props.testFuncHandler; в данную функцию будет передано значение event.target.value
  //      helperText:
  //          type: string
  //          example: "helper text"

  const [selectValue, setSelectValue] = React.useState(props.defaultItemValue)
  const handleChange = (event) => {
    props.onChange(event.target.value)
    setSelectValue(event.target.value)
  }
  const selectStyle = { backgroundColor: '#70c452', color: '#fff' }

  return (
    <div className={classes.MaterialSelect}>
      {props.items.length > 0 && (
        <FormControl variant="outlined" size="small">
          <Select value={selectValue} onChange={handleChange} style={selectStyle}>
            {props.items.map((item, index) => {
              return (
                <MenuItem key={index} value={item[0]}>
                  {item[1]}
                </MenuItem>
              )
            })}
          </Select>

          {props.helperText && <FormHelperText style={{ color: '#eeeeee91' }}>{props.helperText}</FormHelperText>}
        </FormControl>
      )}
    </div>
  )
}

export default MaterialSelect
