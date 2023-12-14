import React, { useState } from 'react'
import InputRatingStars from '../InputRatingStars/InputRatingStars'
import classes from './CommentsList.module.sass'
import { TextField, Button } from '@material-ui/core'
import AppButtonLite from '../AppButton/AppButtonLite'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, setMaxCommentListLength } from '../../store/actions/AboutCourseAction'
import CommentItem from './CommentItem/CommentItem'

const CommentsList = ({ comments }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const [target, setTarget] = useState(0)
  const { maxCommentListLength } = useSelector((state) => state.AboutCourseReducer)

  const sendCommentHandler = (comment) => {
    if (comment && target > 0) {
      dispatch(
        addComment(comment.trim(), target, localStorage.getItem('token'), window.location.pathname.split('/')[2])
      )
      setComment('')
      setTarget(0)
    } else {
      console.log('sendCommentHandler error: отсутствует комментарий или рейтинговая оценка')
    }
  }

  let content =
    Object.keys(comments).length > 0 ? (
      Object.keys(comments).map((key, index) => {
        if (key >= maxCommentListLength) {
          return null
        }
        return (
          <CommentItem
            key={index}
            comment={{
              avatar: comments[key].avatar,
              login: comments[key]?.login,
              comment: comments[key]?.comment,
              rating: comments[key]?.rating,
              id: comments[key]?.id,
            }}
          />
        )
      })
    ) : (
      <p style={{ margin: '1vh 5vh 0 5vh', paddingBottom: '5vh' }}>Комментарии пока отсутствуют...</p>
    )
  return (
    <div className={classes.CommentsList}>
      <div className={classes.InputComment}>
        <TextField
          multiline
          variant="filled"
          placeholder="Оставьте комментарий"
          onChange={(event) => setComment(event.target.value)}
          value={comment}
          name="aboutCourceInput"
        />
      </div>

      <div className={classes.InputCommentButtons}>
        <InputRatingStars target={target} setTarget={setTarget} />
        <AppButtonLite onClick={(event) => sendCommentHandler(comment)} variant="contained" color="primary">
          Оставить комментарий
        </AppButtonLite>
      </div>
      {content}
      {Object.keys(comments).length > maxCommentListLength && (
        <div className={classes.commentListButtons}>
          <Button
            onClick={() => {
              dispatch(setMaxCommentListLength(maxCommentListLength + 10))
            }}
          >
            Показать следующие 10 комментариев
          </Button>
          <Button onClick={() => dispatch(setMaxCommentListLength(Object.keys(comments).length))}>
            Показать все комментарии
          </Button>
        </div>
      )}
    </div>
  )
}

export default CommentsList
