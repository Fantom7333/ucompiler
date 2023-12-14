import axiosApp from '../../axios/axiosApp'
import {
  ADD_COMMENT,
  CLEAR_ABOUT_COURSE_STATE,
  DEL_COMMENT,
  SET_MAX_COMMENT_LIST_LENGTH,
  SHOW_ABOUT_COURSE,
} from './actionTypes'

export function getAboutCourse() {
  return async (dispatch) => {
    dispatch(clearAboutCourseState())
    const request = await axiosApp(window.location.pathname)
    const response = request.data
    console.log('ABOUT_COURSE_DATA', response)
    dispatch(showAboutCourse(response))
  }
}

export function showAboutCourse(payload) {
  return {
    type: SHOW_ABOUT_COURSE,
    payload,
  }
}

export function clearAboutCourseState() {
  return {
    type: CLEAR_ABOUT_COURSE_STATE,
  }
}

export function addComment(comment, rating, token, course_id) {
  return async (dispatch) => {
    let comment_id
    try {
      await axiosApp
        .post(`/leave_comment_c/${course_id}`, { comment, rating, token })
        .then((res) => {
          if (!res.data.error) {
            console.log('ADD_COMMENT SUCCESS')
            comment_id = res.data.comment_id
          } else console.log('ADD_COMMENT ERROR')
        })
    } catch (e) {
      console.log('AddCommentError: ', e)
    }
    // dispatch(getAboutCourse())
    dispatch(addLocalComment(comment, rating, comment_id))
  }
}

export function addLocalComment(comment, rating, comment_id) {
  return {
    type: ADD_COMMENT,
    comment,
    rating,
    comment_id,
  }
}

export function delComment(comment_id, token) {
  return async (dispatch) => {
    try {
      console.log(comment_id)
      await axiosApp
        .delete(`/leave_comment_c/${comment_id}?token=${token}`)
        .then((res) => {
          if (!res.data.error) {
            console.log('DEL_COMMENT SUCCESS')
            // dispatch(getAboutCourse())
            dispatch(delLocalComment(comment_id))
          } else console.log('DEL_COMMENT ERROR')
        })
    } catch (e) {
      console.log('delCommentError: ', e)
    }
    // dispatch(getAboutCourse())
  }
}

export function delLocalComment(comment_id) {
  return {
    type: DEL_COMMENT,
    comment_id,
  }
}

export function setMaxCommentListLength(value) {
  return {
    type: SET_MAX_COMMENT_LIST_LENGTH,
    payload: value,
  }
}
