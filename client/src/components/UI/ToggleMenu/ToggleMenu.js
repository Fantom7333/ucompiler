import React from 'react'
import classes from './ToggleMenu.module.css'
import { connect } from 'react-redux'

import { checkUserAdmin } from '../../../store/actions/ToggleMenuActions'

function ToggleMenu(props) {
  let cls = [classes.ToggleMenu, 'fa']

  if (props.isOpen) {
    cls.push('fa-times')
    cls.push(classes.open)
  } else {
    cls.push('fa-bars')
  }

  const onClickHandler = () => {
    props.onToggle()
  }

  return <i className={cls.join(' ')} onClick={() => onClickHandler()} />
}

export default connect(null, { checkUserAdmin })(ToggleMenu)
