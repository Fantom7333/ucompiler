import { SET_MAIN_Id, SET_NAME_IN_SQUARE_BLOCK, SET_SQUARE_ID, SET_ROUND_ID } from '../actions/actionTypes'


const initialState = {
    mainCourseId: 0,
    roundId: null,
    SquareId: null,
    squareName: null,
}






function MainQuizControllerReducer( state = initialState, action) {
    switch ( action.type ) {
        
        case SET_MAIN_Id:
            return {
                ...state,
                mainCourseId: action.id
            }

        case SET_NAME_IN_SQUARE_BLOCK:
            return {
                ...state,
                squareName: action.name
            }

        case SET_ROUND_ID:
            return {
                ...state,
                roundId: action.id
            }
        case SET_SQUARE_ID:
            return {
                ...state,
                SquareId: action.id
            }

        default:
            return state
    }
}

export default MainQuizControllerReducer
