import axiosApp from "../../axios/axiosApp"
import { SET_COURSE_IMAGE, SET_CATEGORYS, 
    CHANGE_CURREND_CREATE_COURSE_PAGE,
    ADD_CREATE_COURSE_DATA, CHANGE_ROUND_NAME, 
    ADD_NEW_SQUARE, CHANGE_SQUARE_NAME, 
    SET_CUREENT_CREATE_COURSE_STAGE, 
    ADD_TEST_DATA,
    SET_CURRENT_TEST_OBJ, 
    CHANGE_CURRENT_TEST_OBJ,
    SET_CURRENT_TEST_PAGE,
    SET_TYPE_TEST,
    SET_TEST_TEXT,
    SET_OPTIONS_DATA,
    CHANGE_OPTIONS_DATA,
    SAVE_TEST,
    ADD_TEST_OR_THORY,
    CHANGE_CURRENT_RIGHT_ANSWER} from "./actionTypes"


export const sendImage = (scope, image, name,  token, about, exp_before, exp_after) => {
    return async dispath => {
        dispath( setCourseImage(image) )
        if ( !scope ) {
            scope = "Программирование"
        }

        const photoFormData = new FormData()
        photoFormData.append("image", image )
        photoFormData.append("token", token )
        photoFormData.append("name", name )
        photoFormData.append("scope", scope )
        photoFormData.append("about", about )
        photoFormData.append("exp_before", JSON.stringify(exp_before) )
        photoFormData.append("exp_after", JSON.stringify(exp_after) )
 
        for (var pair of photoFormData.entries()) {
            console.log(pair); 
        }
        try {
            await axiosApp.post("new_course", photoFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            } )
                .then( res => {
                    console.log( res.data )
                })
        } catch (error) {
            console.error("Send image error", error )
        }
        window.location.href = '/my_courses'
    }
}


export const addNewRound = data => {
    return {
        type: ADD_CREATE_COURSE_DATA,
        data
    }
}

export const getCategorys = () => {
    return async dispath => {
        try {
            let response = await axiosApp.get("new_course")            
            dispath( setCategorys(response.data) )
        } catch (error) {
            console.error(error)
        }
        
    }
}



const setCategorys = categorys => {
    return {
        type: SET_CATEGORYS,
        categorys
    }
}

const setCourseImage = image => {
    return {
        type: SET_COURSE_IMAGE,
        image
    }
}

export const chageCurrentCreateCoursePage = page => {
    return {
        type: CHANGE_CURREND_CREATE_COURSE_PAGE,
        page
    }
}
export const changeRoundName = (id, newRoundName ) => {
    if ( !newRoundName ) {
        newRoundName = "Название"
    }
    return {
        type: CHANGE_ROUND_NAME,
        id,
        newRoundName
    }
}

export const changeSquareName = ( id, newSquareName, roundId ) => {

    if ( !newSquareName ) {
        newSquareName = "Название"
    }
    return {
        type: CHANGE_SQUARE_NAME,
        id,
        newSquareName,
        roundId
    }
}

export const addNewSquare = ( roundId, data ) => {
    return {
        type: ADD_NEW_SQUARE,
        roundId,
        data
    }
}


export const setCurrentCreateCourseStage = page => {
    return {
        type: SET_CUREENT_CREATE_COURSE_STAGE,
        page
    }
}

//   Fouth Stage actions
export const addTestData = ( roundId, squareId, data ) => {
    return {
        type: ADD_TEST_DATA,
        roundId,
        squareId,
        data
    }
}

export const setCurrentTestPage = page => {
    return {
        type: SET_CURRENT_TEST_PAGE,
        page
    }
}

export const setCurrentTestData = data => {
    return {
        type: SET_CURRENT_TEST_OBJ,
        data
    }
}

export const changeCurrentTestObj = () => {
    return {
        type: CHANGE_CURRENT_TEST_OBJ,
    }
}

export const setTypeOfTest = typeOfTest => {
    return {
        type: SET_TYPE_TEST,
        typeOfTest
    }
}

export const setTestText = text => {
    return {
        type: SET_TEST_TEXT,
        text
    }
}
// export const changeTestText = newText => {
//     return {
//         type: CHANGE_TEST_TEXT,
//         newText
//     }
// }

export const setOptionsData = data => {
    return {
        type: SET_OPTIONS_DATA,
        data
    }
}
export const changeOptionsData = (newData, id) => {
    return {
        type: CHANGE_OPTIONS_DATA,
        newData,
        id
    }
}
export const saveTest = ( roundId, squareId ) => {
    return {
        type: SAVE_TEST,
        roundId,
        squareId,
    }
}
export const addTestOrTheory = () => {
    return {
        type: ADD_TEST_OR_THORY
    }
}
export const changeCurrentRightAnswer = rightAnswer => {
    if ( rightAnswer > 3 ) {
        rightAnswer = 3 
    } else if (rightAnswer < 1 ) {
        rightAnswer = 1 
    }

    return {
        type: CHANGE_CURRENT_RIGHT_ANSWER,
        rightAnswer
    }
}