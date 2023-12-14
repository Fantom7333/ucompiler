import { Iinfo } from './../../types/MyCoursesTypes'
import {
  SET_MY_COURSE_PAGE,
  myCoursesSET_CURRENT_ROUND,
  myCOursesCHANGE_ROUND_NAME,
  myCoursesADD_NEW_ROUND,
  myCoursesCHANGE_EDIT_MODE,
  myCoursesSET_CURRENT_SQUARE,
  myCoursesCHANGE_SUQUARE_NAME,
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
} from './actionTypes'
import axiosApp from '../../axios/axiosApp'

import { TCourseComponent } from '../../types/MyCoursesTypes'

type TsetMyCoursesPageAction = typeof SET_MY_COURSE_PAGE

//     REST first stage
interface TgetMyCourses {
  avatar: string
  scope: string
  course_name: string
  id: number
  moderated: string
  about: string
  exp_before: string
  exp_after: string
}
export const getMyCourses = () => {
  return async (dispatch: any) => {
    const request = await axiosApp.get<Array<TgetMyCourses>>(`my_courses?token=${localStorage.getItem('token')}`)
    const response = request.data
    console.log('COURSES', response)

    dispatch(setMyCoursesCourses(response))
  }
}

export const sendForChecking = (courseId: number) => {
  return async (dispatch: any) => {
    const request = await axiosApp.post(`to_moderation/${courseId}`, {
      token: localStorage.getItem('token'),
    })
    const response = request.data
    if (!response.error) {
      dispatch(getMyCourses())
    }
  }
}

export const viewCourse = (courseId: number, props: any) => {
  return (dispatch: any) => {
    props.history.push(`course/${courseId}`)
  }
}

export const deleteCourse = (courseId: number) => {
  return async (dispatch: any) => {
    try {
      const request = await axiosApp.delete(`course/${courseId}?token=${localStorage.getItem('token')}`)
      const response = request.data

      if (response.error === false) {
        dispatch(getMyCourses())
      }
    } catch (error) {
      console.error('Delete course error ( myCourses )', error)
    }
  }
}

export const sendForVerification = (courseId: number) => {
  return async (dispatch: any) => {
    await axiosApp.post(`to_moderation/${courseId}`, {
      token: localStorage.getItem('token'),
    })
  }
}

export const setNewViewData = (
  courseId: number,
  category: string,
  image: File,
  courseName: string,
  about: string,
  exp_before: string[],
  exp_after: string[]
) => {
  return async (dispatch: any) => {
    if (!category) {
      category = 'Программирование'
    }

    const photoFormData = new FormData()
    photoFormData.append('image', image)
    photoFormData.append('token', `${localStorage.getItem('token')}`)
    photoFormData.append('new_course_name', courseName)
    photoFormData.append('new_scope', category)
    photoFormData.append('about', about)
    photoFormData.append('exp_before', JSON.stringify(exp_before))
    photoFormData.append('exp_after', JSON.stringify(exp_after))
    await axiosApp.put(`/edit/${courseId}`, photoFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    dispatch(getMyCourses())
  }
}

interface TsetMyCoursesCourses {
  type: typeof myCoursesSET_MYCOURSES_COURSES
  data: any
}
export const setMyCoursesCourses = (data: Array<TCourseComponent>): TsetMyCoursesCourses => {
  return {
    type: myCoursesSET_MYCOURSES_COURSES,
    data,
  }
}

export const onSendCourseClick = (courseId: number) => {
  return async (dispatch: any) => {
    await axiosApp.post(`to_moderation/${courseId}`)
  }
}

export const checkCourse = (courseId: number) => {
  return async (dispatch: any) => {
    await axiosApp.get(`course/${courseId}?token=${localStorage.getItem('token')}`)
  }
}

export const getRounds = (courseId: number) => {
  return async (dispatch: any) => {
    const request = await axiosApp.get(`edit/course/${courseId}?token=${localStorage.getItem('token')}`)
    const response = await request.data
    dispatch(setRounds(response))
  }
}

// rest rounds
export const checkInside = (courseId: number) => {
  return async (dispatch: any) => {
    await axiosApp.get(`course/${courseId}`)
  }
}

export const postNewRound = (newRound: any) => {
  delete newRound['isEdit']

  return async (dispatch: any) => {
    const request = await axiosApp.post(`edit/course/section`, {
      ...newRound,
      token: localStorage.getItem('token'),
    })
    const response = request.data
    console.log('response', response)
    dispatch(
      addNewMyCoursesRound({
        id: response.id,
        section_name: newRound.section_name,
        isEdit: false,
      })
    )
  }
}
export const editRoundNameRequest = (roundId: number, newName: string) => {
  return async (dispatch: any) => {
    await axiosApp.put(`edit/course/section`, {
      token: localStorage.getItem('token'),
      section_id: roundId,
      new_name: newName,
    })
  }
}

export const deleteRound = (roundId: number) => {
  return async (dispatch: any) => {
    try {
      const request = await axiosApp.delete(`section/${roundId}?token=${localStorage.getItem('token')}`)
      const response = request.data
      if (response.error === false) {
        dispatch(deleteRoundFromReducer(roundId))
      }
    } catch (error) {
      console.error('Delete Round error ( myCourses )', error)
    }
  }
}

// =====================================================

//  resp squares

export const getSquaresREST = (roundId: number | null) => {
  return async (dispatch: any) => {
    const request = await axiosApp.get(`edit_section/${roundId}?token=${localStorage.getItem('token')}`)
    const response = request.data

    dispatch(getSquares(response))
  }
}

export const postNewSquare = (newSquare: any) => {
  // const testSq = {
  //     class_name: "Название",
  //     id: 15922359526951,
  // }
  // delete newSquare["isEdit"]
  return async (dispatch: any) => {
    const request = await axiosApp.post(`edit/course/class`, {
      class_name: newSquare.class_name,
      section_id: newSquare.section_id,
      token: localStorage.getItem('token'),
    })
    const response = request.data

    if (!response.error) {
      dispatch(
        addNewSquare({
          id: response.id,
          isEdit: newSquare.isEdit,
          class_name: newSquare.class_name,
        })
      )
    }
  }
}
export const editSquareNameRequest = (squareId: number, newName: string) => {
  return async (dispatch: any) => {
    await axiosApp.put(`edit/course/class`, {
      token: localStorage.getItem('token'),
      class_id: squareId,
      new_name: newName,
    })
  }
}

export const deletedSquare = (squareId: number) => {
  return async (dispatch: any) => {
    try {
      await axiosApp.delete(`class/${squareId}?token=${localStorage.getItem('token')}`)

      dispatch(setDeletedSquare(squareId))
    } catch (error) {
      console.error('Delete square error ( myCourses ) ', error)
    }
  }
}

// =========================================================

////////////////////////////    REST TEST

export const getTestData = (squareId: number) => {
  return async (dispatch: any) => {
    const request = await axiosApp.get(`edit_class/${squareId}?token=${localStorage.getItem('token')}`)
    const response = request.data
    // if ( response.error || response === [] ) {

    //     dispatch(  postAddedTestPart({
    //         // access: false,
    //         token: localStorage.getItem("token"),
    //         answer: ["1"],
    //         test: true,
    //         id: Date.now(),
    //         info_title: "Текст...",
    //         // rightAnswer: 1,
    //         class_id: squareId,
    //         info_text: [
    //         "А",
    //         "B",
    //         "C"
    //         ]
    //     }, squareId ) )
    // } else {
    dispatch(setTestData(response))
  }
}

// export const onChangeTestPart = ( changedObj: any ) => {
//     return async ( dispatch: any ) => {
//         const request = await axiosApp.put( ``, changedObj )
//         const respose = request.data
//     }
// }

// on changeing part of test in the test obj     "part" === OBJ
// export const postChangedPartOfTest = ( part: any ) => {

//     delete part.id
//     return async ( dispatch: any ) => {
//         debugger
//         const request = await axiosApp.put("edit/course/part", {
//             ...part, token: localStorage.getItem("token")
//         })
//         const response = request.data
//     }
// }
export const postChangedPartOfTest = (currentTestData: any) => {
  return async (dispatch: any, getState: any) => {
    const token: any = localStorage.getItem('token') ? localStorage.getItem('token') : ''
    const formData = new FormData()

    formData.append('token', token)
    formData.append('part_id', currentTestData.id.toString())
    formData.append('info', 'saving')
    formData.append('test', currentTestData.test.toString())

    let createdId: number = 0
    // let sendingTheoryContentData: Array<IAddingContent> = getState().MyCoursesReducer.sendingTheoryContentData

    if (currentTestData.test === false) {
      if (currentTestData.info) {
        for (let i = 0; i < currentTestData.info.length; i++) {
          let item: Iinfo = currentTestData.info[i]
          if (item.type === 'text') {
            formData.append('info_' + createdId, item.info)
            formData.append('id_' + createdId, createdId.toString())
            formData.append('type_' + createdId, item.type)
            createdId++
          } else if (item.type === 'image' || item.type === 'img') {
            formData.append('info_' + createdId, item.info)
            formData.append('id_' + createdId, createdId.toString())
            formData.append('type_' + createdId, 'img')
            console.log('id_' + createdId + ':', formData.get('id_' + createdId))
            console.log('type_' + createdId + ':', formData.get('type_' + createdId))
            console.log('info_' + createdId + ':', formData.get('info_' + createdId))
            createdId++
          } else if (item.type === 'video') {
            formData.append('info_' + createdId, item.info)
            formData.append('id_' + createdId, createdId.toString())
            formData.append('type_' + createdId, item.type)
            createdId++
          } else if (item.type === 'code') {
            formData.append('info_' + createdId, item.info)
            formData.append('type_' + createdId, item.type)
            formData.append('id_' + createdId, createdId.toString())
            formData.append('pr_ln_' + createdId, item.pr_ln ? item.pr_ln : '')
            createdId++
          }
        }
      }
    } else {
      formData.append('info_text', currentTestData.info_text.toString())
      formData.append('answer', currentTestData.answer.toString())
      formData.append('info_title', currentTestData.info_title)
    }

    try {
      const request = await axiosApp.put('edit/course/part', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const response = request.data
      console.log('response', response)
    } catch (error) {
      console.error('MyCourseActioins postChangedPartOfTest error', error)
    }
  }
}

export const postAddedTestPart = (testObj: any, courseId: number | null) => {
  // testObj = {
  //     "answer": ["1"],
  //     "class_id": courseId,
  //     "info_text": ["А", "B", "C"],
  //     "info_title": "Текст...",
  //     "test": true,
  //     "token": localStorage.getItem("token")
  // }
  return async (dispatch: any) => {
    try {
      const request = await axiosApp.post(`edit/course/part`, testObj)
      const response = request.data
      // delete testObj.class_id
      debugger
      dispatch(addNewTestOrTheory({ ...testObj, id: response.id }))
    } catch (error) {
      console.error('Post added test or theory ', error)
    }
  }
}

export const deleteTest = (testId: number) => {
  return async (dispatch: any) => {
    try {
      await axiosApp.delete(`part/${testId}?token=${localStorage.getItem('token')}`)
      dispatch(setDeletedTest(testId))
    } catch (error) {
      console.error('Delete test error ( myCourses )', error)
    }
  }
}

///////////////////////////////////   REST for content

export const sendContentData = (squareId: number) => {
  const token: any = localStorage.getItem('token') ? localStorage.getItem('token') : ''
  return async (dispatch: any, getState: any) => {
    const formData = new FormData()

    formData.append('token', token)
    formData.append('class_id', squareId.toString())
    formData.append('info_0', 'Текст')
    formData.append('id_0', '0')
    formData.append('type_0', 'text')
    formData.append('test', 'true')
    formData.append('info_text', '["A", "B", "C"]')
    formData.append('info_title', 'Test')
    formData.append('answer', '["1"]')

    // for( let i = 0; i < sendingTheoryContentData.length; i++ ) {
    //     let item: IAddingContent = sendingTheoryContentData[i]
    //     if ( item.type === "text" ) {
    //         formData.append("info_" + createdId, item.content )
    //         formData.append("id_" + createdId, createdId.toString() )
    //         formData.append("type_" + createdId, item.type )
    //         createdId++;
    //     } else if ( item.type === "image" ) {
    //         formData.append("info_" + createdId, item.content )
    //         formData.append("id_" + createdId, createdId.toString() )
    //         formData.append("type_" + createdId, "img" )
    //         createdId++;
    //     } else if ( item.type === "video" ) {
    //         formData.append("info_" + createdId, item.content )
    //         formData.append("id_" + createdId, createdId.toString() )
    //         formData.append("type_" + createdId, item.type )
    //         createdId++;
    //     } else if ( item.type === "code" ) {
    //         formData.append("info_" + createdId, item.content.value )
    //         formData.append("type_" + createdId, item.type )
    //         formData.append("id_" + createdId, createdId.toString() )
    //         formData.append("pr_ln_" + createdId, item.content.mode )
    //         createdId++;
    //     }
    // }
    // for (let pair of formData.entries() ) {
    //     console.log(pair[0]+ ', ' + pair[1]);
    // }
    try {
      await axiosApp.post(`edit/course/part`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      dispatch(getTestData(squareId))
    } catch (error) {
      console.error('Send content data', error)
    }
  }
}

//=======================================================================================================
interface TdeleteRoundFromReducer {
  type: typeof myCoursesDELETE_ROUND
  roundId: number
}
const deleteRoundFromReducer = (roundId: number): TdeleteRoundFromReducer => {
  return {
    type: myCoursesDELETE_ROUND,
    roundId,
  }
}

interface TsetCurrentCourseId {
  type: typeof myCoursesSET_CURRENT_COURSE_ID
  courseId: number
}
export const setCurrentCourseId = (courseId: number): TsetCurrentCourseId => {
  return {
    type: myCoursesSET_CURRENT_COURSE_ID,
    courseId,
  }
}

export interface TsetMyCoursesPage {
  type: TsetMyCoursesPageAction
  page: number
}

export const setMyCoursesPage = (page: number): TsetMyCoursesPage => {
  return {
    type: SET_MY_COURSE_PAGE,
    page,
  }
}

interface TsetCureentRound {
  type: typeof myCoursesSET_CURRENT_ROUND
  roundId: number
}

export const setCureentRound = (roundId: number): TsetCureentRound => {
  return {
    type: myCoursesSET_CURRENT_ROUND,
    roundId,
  }
}

interface TsetCurrentRounds {
  type: typeof myCoursesSET_ROUNDS
  rounds: any
}
const setRounds = (rounds: any): TsetCurrentRounds => {
  return {
    type: myCoursesSET_ROUNDS,
    rounds,
  }
}

interface TchangeCurrentRoundName {
  type: typeof myCOursesCHANGE_ROUND_NAME
  id: number
  roundName: string
}

export const changeCurrentRoundName = (id: number, roundName: string): TchangeCurrentRoundName => {
  return {
    type: myCOursesCHANGE_ROUND_NAME,
    id,
    roundName,
  }
}

interface TaddNewMyCoursesRound {
  type: typeof myCoursesADD_NEW_ROUND
  newRound: any
}
export const addNewMyCoursesRound = (newRound: any): TaddNewMyCoursesRound => {
  return {
    type: myCoursesADD_NEW_ROUND,
    newRound,
  }
}

interface TchangeMyCoursesisEdit {
  type: typeof myCoursesCHANGE_EDIT_MODE
  edit: boolean
}
export const changeMyCoursesisEdit = (edit: boolean): TchangeMyCoursesisEdit => {
  return {
    type: myCoursesCHANGE_EDIT_MODE,
    edit,
  }
}

//    SQUARES

interface TsetDeletedSquare {
  type: typeof myCoursesDELETE_SQUARE
  squareId: number
}
const setDeletedSquare = (squareId: number): TsetDeletedSquare => {
  return {
    type: myCoursesDELETE_SQUARE,
    squareId,
  }
}

type TgetSquares_squares = {
  class_name: string
  id: number
  isEdit: boolean
}
interface TgetSquares {
  type: typeof myCoursesGET_SQUARES
  squares: Array<TgetSquares_squares>
  // Array<TgetSquares_squares>
}
export const getSquares = (squares: Array<TgetSquares_squares>): TgetSquares => {
  return {
    type: myCoursesGET_SQUARES,
    squares,
  }
}

interface TsetCureentSquare {
  type: typeof myCoursesSET_CURRENT_SQUARE
  squareId: number
}
export const setCureentSquare = (squareId: number): TsetCureentSquare => {
  return {
    type: myCoursesSET_CURRENT_SQUARE,
    squareId,
  }
}

interface TchangeSquareName {
  type: typeof myCoursesCHANGE_SUQUARE_NAME
  squareId: number
  squareName: string
}
export const changeSquareName = (squareId: number, squareName: string): TchangeSquareName => {
  return {
    type: myCoursesCHANGE_SUQUARE_NAME,
    squareId,
    squareName,
  }
}

type TaddNewSquare_square = {
  access?: boolean
  class_name: string
  id: number
  isEdit: boolean
}
export interface TaddNewSquare {
  type: typeof myCoursesADD_NEW_SQUARE
  square: TaddNewSquare_square
}
export const addNewSquare = (square: TaddNewSquare_square): TaddNewSquare => {
  // const square = {
  //     access: false,
  //     class_name: "Название",
  //     id: Date.now(),
  //     isEdit: false
  // }
  return {
    type: myCoursesADD_NEW_SQUARE,
    square,
  }
}
///    TEST
interface TsetTestData {
  type: typeof myCoursesSET_TEST_DATA
  testData: any
}
export const setTestData = (testData: any) => {
  return {
    type: myCoursesSET_TEST_DATA,
    testData,
  }
}

interface TchangeAnswerText {
  type: typeof myCoursesCHANGE_ANSWER_TEXT
  id: number
  text: string
}
export const changeAnswerText = (id: number, text: string): TchangeAnswerText => {
  return {
    type: myCoursesCHANGE_ANSWER_TEXT,
    id,
    text,
  }
}

interface TchangeCurrentMyCoursesPage {
  type: typeof myCoursesCHANGE_CURRENT_MYCOURSES_PAGE
  page: number
}
export const changeCurrentTestMyCoursesPage = (page: number): TchangeCurrentMyCoursesPage => {
  return {
    type: myCoursesCHANGE_CURRENT_MYCOURSES_PAGE,
    page,
  }
}

interface TchangeMyCoursesOption {
  type: typeof myCoursesCHANGE_OPTION
  optionName: string
  id: number
}
export const changeMyCoursesOption = (optionName: string, id: number): TchangeMyCoursesOption => {
  return {
    type: myCoursesCHANGE_OPTION,
    optionName,
    id,
  }
}

interface TnewTestOrTheory {
  type: typeof myCoursesADD_NEW_TEST_OR_THEORY
  testObj: any
}
const addNewTestOrTheory = (testObj: any): TnewTestOrTheory => {
  return {
    type: myCoursesADD_NEW_TEST_OR_THEORY,
    testObj,
  }
}

interface TchangeTestType {
  type: typeof myCoursesCAHNGE_TEST_TYPE
  testType: any
}
export const changeTestType = (testType: any): TchangeTestType => {
  if (testType === 'task') {
    testType = true
  } else {
    testType = false
  }
  return {
    type: myCoursesCAHNGE_TEST_TYPE,
    testType,
  }
}

interface TchangeRightAnswer {
  type: typeof myCoursesCHANGE_RIGTH_ANSWER
  rightAnswer: number
}
export const changeRightAnswer = (rightAnswer: number): TchangeRightAnswer => {
  return {
    type: myCoursesCHANGE_RIGTH_ANSWER,
    rightAnswer,
  }
}

interface TsetDeletedTest {
  type: typeof myCoursesDELETE_TEST_PART
  testId: number
}
const setDeletedTest = (testId: number): TsetDeletedTest => {
  return {
    type: myCoursesDELETE_TEST_PART,
    testId,
  }
}

interface IsetAddingData {
  type: typeof myCoursesSet_ADDING_DATA
  partId: number
  data: any
}
export const setAddingData = (partId: number, data: any) => {
  return {
    type: myCoursesSet_ADDING_DATA,
    partId,
    data,
  }
}

// adding content video image code
interface IsetAddingContentData {
  type: typeof myCoursesSet_ADDING_CONTENT
  addingType: string
  data: any
}
export const setAddingContentData = (addingType: string, data: any): IsetAddingContentData => {
  return {
    type: myCoursesSet_ADDING_CONTENT,
    addingType,
    data,
  }
}

/// change code editor
interface IchangeEditCodeValueAndMode {
  type: typeof myCoursesCHANGE_EDIT_CODE_VALUE_AND_MODE
  mode: string
  value: string
  codeEditorID: number
}
export const changeEditCodeValueAndMode = (
  mode: string,
  value: string,
  codeEditorID: number
): IchangeEditCodeValueAndMode => {
  // console.log("mode", mode)
  // console.log("value", value)
  // console.log("id", codeEditorID)
  return {
    type: myCoursesCHANGE_EDIT_CODE_VALUE_AND_MODE,
    mode,
    value,
    codeEditorID,
  }
}
interface IsetSendingAddingContentData {
  type: typeof myCoursesSet_SENDING_ADDING_CONTENT
  addingType: string
  data: any
}
export const setSendingAddingContentData = (addingType: string, data: any): IsetSendingAddingContentData => {
  return {
    type: myCoursesSet_SENDING_ADDING_CONTENT,
    addingType,
    data,
  }
}

interface IdeleteAddingContentData {
  type: typeof myCoursesDELETE_CONTENT
}
export const deleteAddingContentData = (): IdeleteAddingContentData => {
  return {
    type: myCoursesDELETE_CONTENT,
  }
}

// =======================
export type ActionsType =
  | TchangeMyCoursesisEdit
  | TaddNewMyCoursesRound
  | TchangeCurrentRoundName
  | TsetCureentRound
  | TsetMyCoursesPage
  | TchangeSquareName
  | TsetCureentSquare
  | TaddNewSquare
  | TchangeAnswerText
  | TchangeCurrentMyCoursesPage
  | TchangeMyCoursesOption
  | TnewTestOrTheory
  | TchangeTestType
  | TchangeRightAnswer
  | TsetMyCoursesCourses
  | TsetCurrentRounds
  | TsetCurrentCourseId
  | TgetSquares
  | TsetTestData
  | TdeleteRoundFromReducer
  | TsetDeletedSquare
  | TsetDeletedTest
  | IsetAddingContentData
  | IdeleteAddingContentData
  | IsetSendingAddingContentData
  | IsetAddingData
  | IchangeEditCodeValueAndMode
