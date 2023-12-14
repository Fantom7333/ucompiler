import { TCodeMirrorAction } from './../actions/CodeMirrorTestPageActions';
import { CodeMirrorTestPageSET_MODE, CodeMirrorTestPageSET_NEW_DOCKER_CODE } from '../actions/actionTypes';

export type TinitialState = {
    mode: string
    dockerResponseCode: string
}

const initialState: TinitialState = {
    mode: "xml",
    dockerResponseCode: ""
}

const CodeMirrorTestPageReducer  = ( state = initialState, action: TCodeMirrorAction ) => {
    switch( action.type ) {


        case CodeMirrorTestPageSET_MODE:
            return {
                ...state,
                mode: action.mode
            }
        case CodeMirrorTestPageSET_NEW_DOCKER_CODE:
            return {
                ...state,
                dockerResponseCode: action.code
            }

        default:
            return state
    }
}

export default CodeMirrorTestPageReducer