import React, { useState } from 'react'
import classes from './CommentItem.module.sass'
import { NavLink } from 'react-router-dom'
import CommentMenu from '../CommentMenu/CommentMenu'
import RatingStars from '../../RatingStars/RatingStars'

const CommentItem = ({ comment }) => {
  const [anchorEl, setAnchorEl] = useState()

  const menuOpenHandler = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <div className={classes.Comment}>
      <div className={classes.container1}>
        <div className={classes.profileInfo}>
          <img src={`${comment.avatar}`} alt="" />
          <div className={classes.links}>
            <NavLink to={`/profile/${comment?.login}`}>{comment?.login}</NavLink>
          </div>
        </div>

        <div className={classes.container2}>
          <RatingStars Rate={comment?.rating} />

          <CommentMenu
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            onClick={menuOpenHandler}
            commentId={comment.id}
          />
        </div>
      </div>

      <div className={classes.commentText}>
        {comment.comment.split('\n').map((el, index) => (
          <p key={index}>{el}</p>
        ))}
      </div>
    </div>
  )
}

export default CommentItem
