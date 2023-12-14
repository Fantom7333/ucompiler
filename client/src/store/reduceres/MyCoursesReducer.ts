import {
  MyCoursesPropsType,
  TCourseComponent,
  TMyCoursesSquares,
  TTestDataTestAndTheory,
  IAddingContent,
} from '../../types/MyCoursesTypes'
import {
  SET_MY_COURSE_PAGE,
  myCoursesSET_CURRENT_ROUND,
  myCOursesCHANGE_ROUND_NAME,
  myCoursesADD_NEW_ROUND,
  myCoursesCHANGE_EDIT_MODE,
  myCoursesCHANGE_SUQUARE_NAME,
  myCoursesSET_CURRENT_SQUARE,
  myCoursesADD_NEW_SQUARE,
  myCoursesCHANGE_ANSWER_TEXT,
  myCoursesCHANGE_CURRENT_MYCOURSES_PAGE,
  myCoursesCHANGE_OPTION,
  myCoursesADD_NEW_TEST_OR_THEORY,
  myCoursesCAHNGE_TEST_TYPE,
  myCoursesCHANGE_RIGTH_ANSWER,
  myCoursesSET_MYCOURSES_COURSES,
  myCoursesSET_ROUNDS,
  myCoursesSET_CURRENT_COURSE_ID,
  myCoursesGET_SQUARES,
  myCoursesSET_TEST_DATA,
  myCoursesDELETE_ROUND,
  myCoursesDELETE_SQUARE,
  myCoursesDELETE_TEST_PART,
  myCoursesSet_ADDING_CONTENT,
  myCoursesDELETE_CONTENT,
  myCoursesSet_SENDING_ADDING_CONTENT,
  myCoursesSet_ADDING_DATA,
  myCoursesCHANGE_EDIT_CODE_VALUE_AND_MODE,
} from '../actions/actionTypes'
import { ActionsType } from '../../store/actions/MyCoursesActions'

export interface initialStateType {
  coursesData: Array<TCourseComponent>
  roundData: Array<MyCoursesPropsType>
  cureentMyCoursesPage: number
  currnetCourseId: number | null
  currentRound: number | null
  currentSquare: number | null
  currentTestPage: number
  squareData: Array<TMyCoursesSquares>
  testData: Array<TTestDataTestAndTheory>
  theoryContentData: Array<any>
  sendingTheoryContentData: Array<IAddingContent>
}

const initialState: initialStateType = {
  cureentMyCoursesPage: 0,
  currnetCourseId: 0,
  currentRound: null,
  currentSquare: null,

  currentTestPage: 0,

  coursesData: [
    // {
    //   avatar: "",
    //   course_name: "Course",
    //   id: Date.now(),
    //   moderated: "",
    // }
  ],
  roundData: [
    // {
    //     "access": true,
    //     "course_id": 1,
    //     "section_name": "ВведениеВPython3",
    //     "isEdit": false,
    //   },
    //   {
    //     "access": false,
    //     "id": 2,
    //     "section_name": "ООП",
    //     "isEdit": false,
    //   },
    //   {
    //     "access": false,
    //     "id": 3,
    //     "section_name": "Basics",
    //     "isEdit": false,
    //   }
  ],
  squareData: [
    // {
    //   "access": true,
    //   "class_name": "Объекты",
    //   "id": 1,
    //   "isEdit": false
    // },
    // {
    //   "access": false,
    //   "class_name": "ТипыДанных",
    //   "id": 2,
    //   "isEdit": false
    // }
  ],
  testData: [
    // {
    //   access: false,
    //   test: true,
    //   answer: "ВЫБЕРИТЕ ВАРИАНТ ОТВЕТА: А B С 322",
    //   testId: 42348218,
    //   rightAnswer: 3,
    //   info_text: [
    //       "А 322",
    //       "B",
    //       "C"
    //     ]
    // },
    // {
    //   access: false,
    //   test: false,
    //   answer: "ВЫБЕРИТЕ ВАРИАНТ ОТВЕТА: А B Сccccc",
    //   testId: 42348318,
    //   rightAnswer: 1,
    //   info_text: [
    //       "А",
    //       "B",
    //       "C"
    //     ]
    // },
  ],
  theoryContentData: [],
  sendingTheoryContentData: [],
}

const MyCoursesReducer = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case myCoursesSET_CURRENT_COURSE_ID:
      return {
        ...state,
        currnetCourseId: action.courseId,
      }

    case SET_MY_COURSE_PAGE:
      return {
        ...state,
        cureentMyCoursesPage: action.page,
      }

    case myCoursesSET_ROUNDS:
      return {
        ...state,
        roundData: action.rounds,
      }

    case myCoursesSET_CURRENT_ROUND:
      return {
        ...state,
        currentRound: action.roundId,
      }

    case myCOursesCHANGE_ROUND_NAME:
      return {
        ...state,
        roundData: [
          ...state.roundData.map((item) => {
            if (item.id === action.id) {
              return { ...item, section_name: action.roundName, isEdit: !item.isEdit }
            }
            return item
          }),
        ],
        // changeNameAndisEdit( state.roundData, "section_name", action.roundName )
      }

    case myCoursesCHANGE_EDIT_MODE:
      return {
        ...state,
        roundData: changeNameAndisEdit(state.roundData, 'isEdit', action.edit),
      }
    case myCoursesADD_NEW_ROUND:
      // const newRound = {
      //   "id": Date.now(),
      //   "section_name": "Название...",
      //   "isEdit": false,
      // }

      // postNewRound( action.newRound )
      return {
        ...state,
        roundData: [...state.roundData, action.newRound],
      }

    //      SQUARES

    case myCoursesGET_SQUARES:
      return {
        ...state,
        squareData: action.squares,
      }

    case myCoursesSET_CURRENT_SQUARE:
      return {
        ...state,
        currentSquare: action.squareId,
      }

    case myCoursesCHANGE_SUQUARE_NAME:
      return {
        ...state,
        squareData: [
          ...state.squareData.map((item) => {
            if (item.id === action.squareId) {
              return { ...item, class_name: action.squareName, isEdit: !item.isEdit }
            }
            return item
          }),
        ],
      }
    case myCoursesADD_NEW_SQUARE:
      // const newSquare = {
      //   "access": false,
      //   "class_name": "Название",
      //   "id": Date.now(),
      //   "isEdit": false
      // }

      // postNewSquare( {...newSquare, section_id: state.currentRound} )

      return {
        ...state,
        squareData: [...state.squareData, action.square],
      }

    ///////////////////////////////////////////////////////////   Test part

    case myCoursesSET_TEST_DATA:
      return {
        ...state,
        testData: action.testData,
      }

    case myCoursesCHANGE_ANSWER_TEXT:
      return {
        ...state,
        testData: [
          ...state.testData.map((item) => {
            if (item.id === action.id) {
              if (item.test) {
                return { ...item, info_title: action.text }
              } else if (!item.test) {
                return { ...item }
              }
            }
            return item
          }),
        ],
      }

    case myCoursesCHANGE_CURRENT_MYCOURSES_PAGE:
      return {
        ...state,
        currentTestPage: state.currentTestPage + action.page,
      }

    case myCoursesCHANGE_OPTION:
      const newTestData = state.testData.map((item, index) => {
        if (index === state.currentTestPage) {
          // debugger
          const newOptions = changeOption(item.info_text, action.id, action.optionName)
          return { ...item, info_text: newOptions }
        }
        return item
      })
      return {
        ...state,

        testData: newTestData,
      }

    case myCoursesADD_NEW_TEST_OR_THEORY:
      return {
        ...state,
        testData: [...state.testData, action.testObj],
      }

    case myCoursesCAHNGE_TEST_TYPE:
      return {
        ...state,
        testData: [
          ...state.testData.map((item, index) => {
            if (index === state.currentTestPage) {
              return { ...item, test: action.testType }
            }
            return item
          }),
        ],
      }
    case myCoursesCHANGE_RIGTH_ANSWER:
      return {
        ...state,
        testData: [
          ...state.testData.map((item, index) => {
            if (index === state.currentTestPage) {
              return { ...item, answer: [action.rightAnswer] }
            }
            return item
          }),
        ],
      }

    // REST
    case myCoursesSET_MYCOURSES_COURSES:
      return {
        ...state,
        coursesData: action.data,
      }

    case myCoursesDELETE_ROUND:
      return {
        ...state,
        roundData: [...state.roundData.filter((item) => item.id !== action.roundId)],
      }

    case myCoursesDELETE_SQUARE:
      return {
        ...state,
        squareData: [...state.squareData.filter((item) => item.id !== action.squareId)],
      }
    case myCoursesDELETE_TEST_PART:
      return {
        ...state,
        testData: [...state.testData.filter((item) => item.id !== action.testId)],
      }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    case myCoursesSet_ADDING_DATA:
      return {
        ...state,
        testData: [
          ...state.testData.map((item) => {
            if (item.id === action.partId) {
              // return { ...item, info: [ ...item.info, action.data ]}
              if (item.info) return { ...item, info: [...item.info, action.data] }
              else return { ...item, info: [action.data] }
            }
            return item
          }),
        ],
      }

    ////////////// Change code editor value and mode ( write!!! )
    case myCoursesCHANGE_EDIT_CODE_VALUE_AND_MODE:
      return {
        ...state,
        testData: [
          ...state.testData.map((testDataItem) => {
            if (testDataItem.id === state.testData[state.currentTestPage].id) {
              return {
                ...testDataItem,
                info: [
                  ...testDataItem.info.map((item) => {
                    if (item.id === action.codeEditorID) {
                      return { ...item, info: action.value, pr_ln: action.mode }
                    }
                    return item
                  }),
                ],
              }
            }
            return testDataItem
          }),
        ],
      }

    /////////////
    case myCoursesSet_ADDING_CONTENT:
      return {
        ...state,
        theoryContentData: [
          ...state.theoryContentData,
          {
            type: action.addingType,
            content: action.data,
          },
        ],
      }
    case myCoursesSet_SENDING_ADDING_CONTENT:
      return {
        ...state,
        sendingTheoryContentData: [
          ...state.sendingTheoryContentData,
          {
            type: action.addingType,
            content: action.data,
          },
        ],
      }
    case myCoursesDELETE_CONTENT:
      return {
        ...state,
        theoryContentData: [],
        sendingTheoryContentData: [],
      }

    default:
      return state
  }

}

const changeOption = (optionsArray: Array<string>, optionId: number, newOptionName: string): Array<string> => {
  let optionsData = [...optionsArray]
  optionsData[optionId] = newOptionName

  return optionsData
}

const changeNameAndisEdit = (array: Array<MyCoursesPropsType>, whatChanging: string, action: any) => {
  return [
    ...array.map((item) => {
      if (item.id === action.id) {
        return { ...item, whatChanging: action }
      }
      return item
    }),
  ]
}

export default MyCoursesReducer
