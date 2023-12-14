// types
import { TgetProfileDataCourses } from '../../types/ProfileTypes'
import {
  prfilePageCHANGE_USER_NAME,
  prfilePageSET_AVATAR,
  prfilePageSET_EDIT_MODE,
  prfilePageSET_PROFILE_DATA,
} from '../actions/actionTypes'
import { ActionsType } from '../actions/ProfileAction'

export interface TinitialState {
  Owner: boolean
  userName: string
  avatar: string
  courses: Array<TgetProfileDataCourses>
  isProfileEditMode: boolean
}

const initialState: TinitialState = {
  Owner: false,
  userName: localStorage.getItem('userName') || '{}',
  avatar: '',
  courses: [],

  isProfileEditMode: false,
}

const ProfileReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case prfilePageSET_PROFILE_DATA:
      return {
        ...state,
        Owner: action.profileData.Owner,
        avatar: action.profileData.avatar,
        courses: action.profileData.courses,
      }
    case prfilePageSET_EDIT_MODE:
      return {
        ...state,
        isProfileEditMode: !state.isProfileEditMode,
      }

    case prfilePageSET_AVATAR:
      return {
        ...state,
        avatar: action.image,
      }
    case prfilePageCHANGE_USER_NAME:
      return {
        ...state,
        userName: action.userName,
      }
    default:
      return state
  }
}

export default ProfileReducer
