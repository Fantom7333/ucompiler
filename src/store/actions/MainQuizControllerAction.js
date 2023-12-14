import { SET_MAIN_Id, SET_NAME_IN_SQUARE_BLOCK, SET_SQUARE_ID, SET_ROUND_ID } from "./actionTypes"

export const setMainId = id => {
    return {
        type: SET_MAIN_Id,
        id
    }
}

export const setRoundId = id => {
    return {
        type: SET_ROUND_ID,
        id
    }
}
export const setSquareId = id => {
    return {
        type: SET_SQUARE_ID,
        id
    }
}

export const setNameInSquareBlock = name => {
    return {
        type: SET_NAME_IN_SQUARE_BLOCK,
        name
    }
}