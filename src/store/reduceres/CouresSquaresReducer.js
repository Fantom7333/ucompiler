import { COUNT_SQUARES, UNMOUNT_SQUARES, SET_SQUARES_DATA, SET_CURRENT_SQUARE } from "../actions/actionTypes"

const initialState = {
    squaresData:  [
        // {
        //   "access": true,
        //   "class_name": "Объекты",
        //   "id": 1
        // },
        // {
        //   "access": false,
        //   "class_name": "Типы Данных",
        //   "id": 2
        // }
      ],
    squaresCount: 0,
    currentSquare: null,
}

const CouresSquaresReducer = ( state = initialState, action ) => {
    switch( action.type ) {

        case SET_SQUARES_DATA:
            return {
                ...state,
                squaresData: action.data
            }

        case COUNT_SQUARES:
            return {
                ...state,
                squaresCount: action.squares
            }

        case UNMOUNT_SQUARES:
            return {
                ...state,
                squaresCount: 0,
                squaresData: []
            }

        case SET_CURRENT_SQUARE:
            return {
                ...state,
                currentSquare: action.currentSquare
            }

        default:
            return state
    }
}

export default CouresSquaresReducer