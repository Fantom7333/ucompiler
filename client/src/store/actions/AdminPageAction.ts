import axiosApp from '../../axios/axiosApp'
import {
  adminPageSET_COURSES,
  adminPageSET_ADMIN_NAME,
  adminPageSET_DISABLE_BUTTON,
  adminPageSET_EMTY_OBJ,
} from './actionTypes'

// get courses
export const getCourses = () => {
  return async (dispatch: any) => {
    try {
      const request = await axiosApp.get(`admin/panel/moderated?token=${localStorage.getItem('token')}`)
      const response = request.data

      dispatch(setCourses(response))
    } catch (error) {
      console.error('Get admin panel courses error ', error)
    }
  }
}

export const getCanceledCourses = () => {
  return async (dispatch: any) => {
    try {
      const request = await axiosApp.get(`admin/panel/cancaled?token=${localStorage.getItem('token')}`)
      const response = request.data

      if (!response.error) {
        dispatch(setCourses(response))
      } else {
        dispatch(setEmptyObj())
      }
    } catch (error) {
      console.error('Get admin panel canceled courses error ', error)
    }
  }
}

interface TsetCourses {
  type: typeof adminPageSET_COURSES
  courses: any
}
const setCourses = (courses: any): TsetCourses => {
  return {
    type: adminPageSET_COURSES,
    courses,
  }
}

interface TsetEmptyObj {
  type: typeof adminPageSET_EMTY_OBJ
}
const setEmptyObj = () => {
  return {
    type: adminPageSET_EMTY_OBJ,
  }
}

export const postNewAdminUser = (adminName: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(setDisableButton(true))
      const request = await axiosApp.post(`set/new/admin`, {
        new_admin: adminName,
        token: localStorage.getItem('token'),
      })
      dispatch(setDisableButton(false))
      const response = request.data
      if (response.error) {
        alert('error')
      } else {
        dispatch(setAdminName(''))
      }
    } catch (error) {
      console.error('Post new admin name ( AdminPageAction )', error)
    }
  }
}

interface TsetAdminName {
  type: typeof adminPageSET_ADMIN_NAME
  adminName: string
}
export const setAdminName = (adminName: string): TsetAdminName => {
  return {
    type: adminPageSET_ADMIN_NAME,
    adminName,
  }
}

export const viewCourse = (props: any, courseId: number) => {
  return async (dispatch: any) => {
    props.history.push(`course/${courseId}`)
  }
}

export const acceptCourse = (courseId: number) => {
  return async (dispatch: any) => {
    try {
      const request = await axiosApp.post(`confirm_moderation/${courseId}`, {
        token: localStorage.getItem('token'),
      })
      const response = request.data
      if (!response.error) {
        dispatch(getCourses())
      }
    } catch (error) {
      console.error('Accept course error ( Admin page )', error)
    }
  }
}

export const rejectCourse = (courseId: number) => {
  return async (dispatch: any) => {
    try {
      const request = await axiosApp.post(`cancel_moderation/${courseId}`, {
        token: localStorage.getItem('token'),
      })
      const response = request.data
      if (!response.error) {
        dispatch(getCourses())
      }
    } catch (error) {
      console.error('Reject course error ( Admin panel )', error)
    }
  }
}

// buttons

// buttons names
// 1) disableSendNewAdminButton
interface TsetDisableButton {
  type: typeof adminPageSET_DISABLE_BUTTON
  mod: boolean
}
const setDisableButton = (mod: boolean): TsetDisableButton => {
  return {
    type: adminPageSET_DISABLE_BUTTON,
    mod,
  }
}

export type TAdminPageAction = TsetCourses | TsetAdminName | TsetDisableButton | TsetEmptyObj
