import {
  ADD_COMMENT,
  CLEAR_ABOUT_COURSE_STATE,
  DEL_COMMENT,
  SET_MAX_COMMENT_LIST_LENGTH,
  SHOW_ABOUT_COURSE,
} from '../actions/actionTypes'

const initialState = {
  about: '',
  author: '',
  avatar: '',
  c_stud: 0,
  comments: [],
  course_name: '',
  exp_after: [],
  exp_before: [],
  fio: '',
  rating: 0,
  loading: false,
  maxCommentListLength: 5,
}
const AboutCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ABOUT_COURSE:
      return { ...state, ...action.payload, loading: false }
    case CLEAR_ABOUT_COURSE_STATE:
      return {
        ...state,
        about: '',
        author: '',
        c_stud: 0,
        comments: [],
        course_name: '',
        exp_after: '',
        exp_before: '',
        fio: '',
        rating: 0,
        loading: true,
      }

    case SET_MAX_COMMENT_LIST_LENGTH:
      return { ...state, maxCommentListLength: action.payload }
    case ADD_COMMENT:
      let newState = { ...state }
      newState.comments.push({
        avatar: localStorage.getItem('userAvatar'),
        comment: action.comment,
        date: new Date(),
        id: action.comment_id,
        login: localStorage.getItem('userName'),
        rating: action.rating,
      })
      return { ...state, ...newState }
    case DEL_COMMENT:
      let rez = { ...state }
      rez.comments.splice(
        rez.comments.findIndex((comment) => comment.id === action.comment_id),
        1
      )
      console.log('HUY', rez)
      return { ...state, ...rez }
    default:
      return state
  }
}

export default AboutCourseReducer
