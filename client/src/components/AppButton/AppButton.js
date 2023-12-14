import { Button } from '@material-ui/core'
import React from 'react'

const AppButton = (props) => {
  return (
      <Button
      {...props}
      style={{ color: '#fff', backgroundColor: '#17172e', ...props.style}}
      >
        {props.children}
      </Button>
    )
}

export default AppButton