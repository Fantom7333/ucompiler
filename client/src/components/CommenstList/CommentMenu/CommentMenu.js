import { IconButton } from '@material-ui/core'
import React from 'react'
// import { useDispatch } from 'react-redux'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MenuList from '../../UI/MenuList/MenuList'

import classes from './CommentMenu.module.sass'
import { useDispatch } from 'react-redux'
import { delComment } from '../../../store/actions/AboutCourseAction'

const CommentMenu = ({ anchorEl, onClose, onClick, commentId }) => {
  const dispatch = useDispatch()
  return (
    <div>
      <IconButton edge="end" color="inherit" onClick={onClick}>
        <MoreVertIcon
          className={classes.Icon}
          // color="primary"
          fontSize="small"
        />
      </IconButton>
      {/* {comment} */}
      <div className={classes.Menu}>
        <MenuList
          anchorEl={anchorEl}
          onClose={onClose}
          items={[['Удалить', () => dispatch(delComment(commentId, localStorage.getItem('token')))]]}
        />
      </div>
    </div>
  )
}

export default CommentMenu
