import { ToggleMenuActionsSET_TOGGLE_IS_ADMIN } from "./actionTypes"
import axiosApp from "../../axios/axiosApp"



export const setToggleIsAdmin = ( isAdmin ) => {
    return {
        type: ToggleMenuActionsSET_TOGGLE_IS_ADMIN,
        isAdmin
    }
}



export function checkUserAdmin () {
    return async dispatch => {
        try {
            const request = await axiosApp.get(`check/admin?token=${ localStorage.getItem("token") }`)
            const response = request.data
            if ( !response.error ) {
                dispatch( setToggleIsAdmin( true ) )
            } else {
                dispatch( setToggleIsAdmin( false ) )
            }
        } catch (error) {
            console.error( "Check user admin error toggle menu ( AuthAction )", error )
        }
        
    }
}