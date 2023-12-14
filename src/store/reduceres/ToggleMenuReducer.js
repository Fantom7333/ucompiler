import { ToggleMenuActionsSET_TOGGLE_IS_ADMIN } from "../actions/actionTypes"

const initialState = {
    isAdmin: false,
}


const ToggleMenuReducer = ( state = initialState, action ) => {
    switch( action.type ) {

        case ToggleMenuActionsSET_TOGGLE_IS_ADMIN:
            return {
                ...state,
                isAdmin: action.isAdmin
            }
        default:
            return state
    }
}

export default ToggleMenuReducer