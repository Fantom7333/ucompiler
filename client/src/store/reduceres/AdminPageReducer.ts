import { TAdminPageAction } from "../actions/AdminPageAction"

// exported types 
import { TgetCourses } from "../../types/AdminPageTypes"
import { adminPageSET_COURSES, adminPageSET_ADMIN_NAME, adminPageSET_DISABLE_BUTTON, adminPageSET_EMTY_OBJ } from "../actions/actionTypes"

export interface TinitialState {
    newAdminUserName: string
    courses: Array<TgetCourses>

    // buttons
    disableSendNewAdminButton: boolean
}

const initialState: TinitialState = {
    newAdminUserName: "",
    courses: [
        // {
        //     avatar: 'http://localhost:5000/static/course.png',
        //     course_name: "C#",
        //     id: 1
        // }
    ],

    // disable buttons
    disableSendNewAdminButton: false
}

const AdminPageReducer = ( state = initialState, action: TAdminPageAction ): TinitialState => {
    switch( action.type ) {
        case adminPageSET_COURSES:
            return {
                ...state,
                courses: action.courses
            }
        case adminPageSET_EMTY_OBJ:
            return {
                ...state,
                courses: []
            }

        case adminPageSET_ADMIN_NAME:
            return {
                ...state,
                newAdminUserName: action.adminName
            }
        // buttons
        case adminPageSET_DISABLE_BUTTON:
            return {
                ...state,
                disableSendNewAdminButton: action.mod
            }

        default:
            return state
    }
}


export default AdminPageReducer