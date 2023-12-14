import { SET_COURSE_IMAGE, 
    SET_CATEGORYS, 
    CHANGE_CURREND_CREATE_COURSE_PAGE, 
    ADD_CREATE_COURSE_DATA, 
    CHANGE_ROUND_NAME, 
    ADD_NEW_SQUARE, 
    CHANGE_SQUARE_NAME, 
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
    CHANGE_CURRENT_RIGHT_ANSWER} from "../actions/actionTypes"


const initialState = {
    courseImage: null,
    categorys: [],
    currendCreateCoursePage: 0,
    newCourseData: 
    [
        {
        section_name: "C++", 
        access: true, 
        roundId: 423545, 
        isEdit: false,
        squares: [
            {
                class_name: "введения", 
                access: true, 
                squareId: 53425342,
                isEdit: false,
                test: [ 
                    {
                        testId: 32425,
                        access: false, 
                        test: true, 
                        answer: "ВЫБЕРИТЕ ВАРИАНТ ОТВЕТА: А B С",
                        rightAnswer: 1,
                        info_text: [
                        "А",
                        "B",
                        "C"
                        ]
                    },
                    {
                        testId: 42389,
                        access: true,
                        answer: "Объекты в ЯП прикрепляются к переменным-ссылкам",
                        test: false,
                        rightAnswer: 1,
                        info_text: [
                        "А",
                        "B",
                        "C"
                        ]
                    },
                ]
            },
        ],
    },
],

    currentTestData: [],

    currentTestPage: 0,
    typeOfTest: null,
    testText: "null",
    currentOptions: [],

    currentRightAnswer: 1,
}





const CreateCourseReducer = ( state = initialState, action ) => {

    const updateOptionsValue = ( newOptionValue, id )=> {
        let optionsData = state.currentOptions
        optionsData[id] = newOptionValue
        
        return optionsData
    }

    switch( action.type ) {

        case SET_COURSE_IMAGE:
            return {
                ...state,
                courseImage: action.image
            }

        case SET_CATEGORYS:
            return {
                ...state,
                categorys: action.categorys
            }

        case CHANGE_CURREND_CREATE_COURSE_PAGE:
            return {
                ...state,
                currendCreateCoursePage: state.currendCreateCoursePage + action.page
            }

        case SET_CUREENT_CREATE_COURSE_STAGE:
            return {
                ...state,
                currendCreateCoursePage: action.page
            }

        case ADD_CREATE_COURSE_DATA:
            return {
                ...state,
                newCourseData: [...state.newCourseData, {...action.data } ]
            }

        case CHANGE_ROUND_NAME:
            return {
                ...state,
                newCourseData: changeNameInNewCourseDataArrayHalper( state.newCourseData, action.id, action.newRoundName )
            }
        
        case CHANGE_SQUARE_NAME:
            return {
                ...state,
                newCourseData: changeSquareName( state.newCourseData, action.roundId, action.id, action.newSquareName )
            }


        case ADD_NEW_SQUARE:
            return {
                ...state,
                newCourseData: state.newCourseData.map( item => {
                    if ( item.roundId === action.roundId ) {
                        return { ...item, squares: [...item.squares, action.data] }
                    }
                    return item
                })
            }
            
        case ADD_TEST_DATA:
            return {
                ...state,
                
            }



        //  Fouth Stage

        case SET_CURRENT_TEST_PAGE:
            return {
                ...state,
                currentTestPage: action.page
            }
            
        case SET_CURRENT_TEST_OBJ:
            return {
                ...state,
                currentTestData: action.data,
                // typeOfTest: action.data[ state.currentTestPage ].test ? "task" : "theory"
            }

        case CHANGE_CURRENT_TEST_OBJ:
            return {
                ...state,
                currentTestData: state.currentTestData.map( ( item, index ) => {
                    if ( index === state.currentTestPage ) {
                        if ( item.test ) {
                        return { ...item, answer: state.testText, test: state.typeOfTest, rightAnswer: state.currentRightAnswer  }
                        } else if ( !item.test ) {
                            return { ...item, answer: state.testText,  test: state.typeOfTest }
                        }
                    }
                    return item        
                })
            }
        case SET_TYPE_TEST:
            return {
                ...state,
                typeOfTest: action.typeOfTest
            }
        case SET_TEST_TEXT:
            return {
                ...state,
                testText: action.text
            }
        // case CHANGE_TEST_TEXT:
        //     return {
        //         ...state,
        //         testText: action.newText
        //     }    
        case SET_OPTIONS_DATA:
            return {
                ...state,
                currentOptions: action.data
            }
        case CHANGE_OPTIONS_DATA:
            // debugger
            // let optionsData = state.currentOptions
            // optionsData[action.id] = action.newData
            return {
                ...state,
                currentOptions: updateOptionsValue( action.newData, action.id )
            }

        case SAVE_TEST:
            const currentTestData = [ ...state.currentTestData.map( (item, index) => {
                if ( index === state.currentTestPage ) {
                    return { ...item, info_text: state.currentOptions }
                }
                return item
            })]
            return {
                ...state,
                newCourseData: saveTest( state.newCourseData, action.roundId, action.squareId, currentTestData )
            }

        case ADD_TEST_OR_THORY:
            return {
                ...state,
                currentTestData: [...state.currentTestData, 
                    {
                    access: false, test: true, testId: Date.now(), "answer": "Вопрос...", rightAnswer: 1,
                    "info_text": [
                    "А",
                    "B",
                    "C"
                    ]
                }
            ]
            }

        case CHANGE_CURRENT_RIGHT_ANSWER:
            return {
                ...state,
                currentRightAnswer: action.rightAnswer
            }

        default:
            return state
    }


    
}



////    HELPERS FUNCTIONS

const changeNameInNewCourseDataArrayHalper = ( array, id, name ) => {
    return array.map( item => {
        if ( item.roundId === id ) {
            return { ...item, isEdit: !item.isEdit, section_name: name }
        }
        return item
    })
}

const changeSquareName = ( array, roundId, id, newSquareName ) => {
    return array.map( item => {
        if ( item.roundId === roundId ) {
            return { ...item, squares:  [...item.squares.map( squareItem => {
                if ( squareItem.squareId === id ) {
                    return { ...squareItem, class_name: newSquareName, isEdit: !squareItem.isEdit}
                }
                return squareItem
            })] 
        }
    }
    return item
    })
}

///////////////////// ERROR HERE 

const saveTest = ( array, roundId, squareId, test ) => {
    return array.map( ( item, index ) => {
        if ( item.roundId === roundId ) {
            return { ...item, squares: [...item.squares.map( squareItem => {
                if ( squareItem.squareId === squareId ) {
                    return { ...squareItem, test: test }
                }
                return squareItem
            })] 
        }
    }   
    return item
    })
}
 


export default CreateCourseReducer