import { UNMOUNT_RECOVER_EMAIL, SET_RECOVER_EMAIL, SET_ERROR_MASSAGE } from "../actions/actionTypes"

const initialState = {
    recoverEmail: null,
    errorMassage: null 
}

const RecoverPasswordReducer = ( state = initialState, action ) => {
    switch( action.type ) {

        case SET_RECOVER_EMAIL:
            return {
                ...state,
                recoverEmail: action.email
            }
        case UNMOUNT_RECOVER_EMAIL:
            return {
                ...state,
                recoverEmail: null
            }

        case SET_ERROR_MASSAGE:
            return {
                ...state,
                errorMassage: action.massage
            }    
        default:
            return state
    }
}

export default RecoverPasswordReducer