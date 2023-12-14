import { Button, Tooltip } from '@material-ui/core'
import React from 'react'

const AppButtonLite = (props) => {
  let content = (
    <Button {...props} style={{ color: '#fff', backgroundColor: '#6d9dd4', ...props.style }}>
      {props.children}
    </Button>
  )
  if (props.tooltip) {
    content = (
      <Tooltip title={props.tooltip}>
        <Button {...props} style={{ color: '#fff', backgroundColor: '#6d9dd4', ...props.style }}>
          {props.children}
        </Button>
      </Tooltip>
    )
  }
  return content
}

export default AppButtonLite
