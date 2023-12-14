import { EMAIL_ERROR, NAME_ERROR, REGISTER_ERROR, BLOCK_REGISTER_BUTTON, LOG_REGISTER_MASSAGE } from "../actions/actionTypes"

const initialState = {
    isError: false,
    emailError: false,
    nameError: false,
    registerErrorMassage: null,
    isBlockedButton: false
}



const RegistrationReducer = ( state = initialState, action ) => {
    switch( action.type ) {


        case LOG_REGISTER_MASSAGE:
            return {
                ...state,
                registerErrorMassage: action.massage
            }

        case EMAIL_ERROR:
            return {
                ...state,
                emailError: true
            }
        case NAME_ERROR:
            return {
                ...state,
                nameError: true
            }
        case REGISTER_ERROR:
            return {
                ...state,
                isError: action.errorType
            }
        case BLOCK_REGISTER_BUTTON:
            return {
                ...state,
                isBlockedButton: action.mode
            }
            
        default:
            return state
    }
}

export default RegistrationReducer