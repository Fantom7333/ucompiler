import React, { useEffect } from 'react'
import CommentsList from '../CommenstList/CommentsList'
import RatingStars from '../RatingStars/RatingStars'
import VisibilityIcon from '@material-ui/icons/Visibility'
// import NavBar from '../../components/UI/NavBar/NavBar'

import classes from './AboutCourse.module.sass'

import { NavLink, withRouter } from 'react-router-dom'
import AppButtonLite from '../AppButton/AppButtonLite'
import { useDispatch, useSelector } from 'react-redux'
import { getAboutCourse } from '../../store/actions/AboutCourseAction'
import Loader from '../UI/Loader/Loader'

const AboutCourse = ({ history }) => {
  let isEditMode = (new URL(document.location)).searchParams.get('editMode')
  console.log(isEditMode)
  const dispatch = useDispatch()
  useEffect(() => dispatch(getAboutCourse()), [dispatch])
  const courseId = history.location.pathname.split('/')[history.location.pathname.split('/').length - 1]
  const { about, author, avatar, comments, course_name, exp_after, exp_before, fio, rating, c_stud, loading } = useSelector(
    (state) => state.AboutCourseReducer
  )

  const lisBefore = 
    exp_before.length > 0 ? exp_before.map((note, index) => <li key={index}><i className="fas fa-check"></i>{note}</li>) : <li>Информация не указана</li>
  
  let lisAfter =
    exp_after.length > 0 ? exp_after.map((note, index) => <li key={index}><i className="fas fa-check"></i>{note}</li>) : <li>Информация не указана</li>

    return (
      <div className={classes.AboutCourse}>
      { loading ? (
        <Loader/>
      ) : (
      <>
      <div className={classes.MainBox}>
        <div className={classes.MainLeftBox}>
          <img src={`http://127.0.0.1:5000/${avatar}`} alt="" />
          <div className={classes.AuthorBox}>
            <h6>Автор курса:</h6>
            <p>
              <NavLink to={`/profile/${author}`}>{fio}</NavLink>
            </p>
          </div>
        </div>
        <div className={classes.RightBox}>
          <h1>{course_name}</h1>
          <div className={classes.Views}>
            <VisibilityIcon />
            <h6>{c_stud}</h6>
          </div>
          <RatingStars Rate={rating} />
        </div>
      </div>
      <div className={classes.InfoBox}>
        <h3>О курсе:</h3>
        <h4>Требования для прохождения курса:</h4>
        <ul>{lisBefore}</ul>
        <h4>Навыки, которые будут получены в результате прохождения курса:</h4>
        <ul>{lisAfter}</ul>
        <h4>Описание:</h4>
        <h6>{about ? about : 'Информация не указана'}</h6>
        <NavLink to={`/course/${courseId}`}>
          <AppButtonLite variant="contained" color="primary">
            Перейти к прохождению курса
          </AppButtonLite>
        </NavLink>
        <h4>Комментарии:</h4>
      </div>
      <CommentsList comments={comments} /> 
      </>
      )}
    </div>
  )
}

export default withRouter(AboutCourse)
