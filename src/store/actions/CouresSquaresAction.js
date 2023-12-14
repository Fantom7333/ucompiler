// ajax get squares 

import { COUNT_SQUARES, UNMOUNT_SQUARES, SET_SQUARES_DATA, SET_CURRENT_SQUARE } from "./actionTypes"
import axiosApp from "../../axios/axiosApp"



export const getSquaresData = ( path, props ) => {
    return dispatch => {
        axiosApp.get(path)
            .then( res => {
                if( res.data.redirect ) {
                    props.history.push(`/${props.match.params.course}`)
                } else {
                    console.log("Square data", res.data )
                    dispatch( setSquares(res.data.data))
                }
                
            })
            .catch( error => {
                console.error("ERROR", error)
            })
    }
}

const setSquares = data => {
    return {
        type: SET_SQUARES_DATA,
        data
        
    }
}

export const countSquares = squares => {
    return {
        type: COUNT_SQUARES,
        squares
    }
}

export const unmountSquares = () => {
    return {
        type: UNMOUNT_SQUARES,
    }
}


export const setCureentSquare = currentSquare => {
    debugger
    console.log("course squre", currentSquare)
    return {
        type: SET_CURRENT_SQUARE,
        currentSquare
    }
}


// {
//     data: [
//       {
//         "access": true,
//         "class_name": "Объекты",
//         "id": 1
//       },
//       {
//         "access": false,
//         "class_name": "Типы Данных",
//         "id": 2
//       }
//     ],
//     exitPath: "/course/1"
// }