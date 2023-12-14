import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"


import quizReducer from "./quizReducer"
import QuizTestRoundsReducer from "./QuizTestRoundsReducer"
import mainPageReducer from "./mainPageReducer"
import AuthReducer from "./AuthReducer"
import RegistrationReducer from "./RegistrationReducer"
import RecoverPasswordReducer from "./RecoverPasswordReducer"
import CouresSquaresReducer from "./CouresSquaresReducer"
import CreateCourseReducer from "./CreateCourseReducer"
import MainQuizControllerReducer from "./MainQuizControllerReducer"
import MyCoursesReducer from "../reduceres/MyCoursesReducer"
import AdminPageReducer from "../reduceres/AdminPageReducer"
import ProfileReducer from "../reduceres/ProfileReducer"
import CodeMirrorTestPageReducer from "../reduceres/CodeMirrorTestPageReducer"
import ToggleMenuReducer from "../reduceres/ToggleMenuReducer"
import AboutCourseReducer from "./AboutCourseReducer"


const rootReducer = combineReducers({


    quizReducer,
    QuizTestRoundsReducer,
    mainPageReducer,
    AuthReducer,
    RegistrationReducer,
    RecoverPasswordReducer,
    CouresSquaresReducer,
    CreateCourseReducer,
    MainQuizControllerReducer,
    MyCoursesReducer,
    AdminPageReducer,
    ProfileReducer,
    AboutCourseReducer,

    // Toggle menu
    ToggleMenuReducer,
    // Code mirror
    CodeMirrorTestPageReducer,
    //

    createCourseForm: formReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>



export default rootReducer