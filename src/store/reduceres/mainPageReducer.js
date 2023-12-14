import { GET_COURSERS, CLEAR_MAINPAGE_COURSES, SET_CURRENT_COURSE, SET_SQUARE_ID, SET_ROUND_ID } from "../actions/actionTypes"




const initialState = {
    mainPageCourses: [],
    currentCourse: null,

    cureentRound: null,
    currentSquare: null,

}



const mainPageReducer = ( state = initialState, action ) => {
    switch( action.type ) {

        case GET_COURSERS:
            return {
                ...state,
                mainPageCourses: action.courses
            }
        
        case CLEAR_MAINPAGE_COURSES:
            return {
                ...state,
                mainPageCourses: []
            }

        case SET_CURRENT_COURSE:
            return {
                ...state,
                currentCourse: action.course
            }
        
        
        case SET_ROUND_ID:
            return {
                ...state,
                cureentRound: action.id
            }

        case SET_SQUARE_ID:
            return {
                ...state,
                currentSquare: action.id
            }
        default:
            return state
    }
}

export default mainPageReducer