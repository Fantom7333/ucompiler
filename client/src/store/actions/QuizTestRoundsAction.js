import axiosApp from '../../axios/axiosApp'
import { setMainId } from '../../store/actions/MainQuizControllerAction'
import {
  ADD_QUIZ_ANSWERS,
  CLEAR_QUIZ_ANSWERS,
  DECREMENT_CURRENT_QUIZ,
  DISABLE_NEXT_TEST_BUTTON,
  EDIT_ACCESS,
  INCREMENT_CURRENT_QUIZ,
  SET_CURRENT_TOP_ROUND,
} from './actionTypes'

// let newAnswers = [
//   //  {
//   // id: 1,
//   // blokName: "Деф уравнения",
//   // blockAswersAndTheory: [
//   {
//     isAnswer: true,
//     answer: '5 + 5',
//     rightOption: 1,
//     options: [{ option: 10 }, { option: 2 }, { option: 1 }, { option: 322 }],
//   },
//   { isAnswer: false, theoryName: 'Градиентный спуск', theory: 'Градиентный спуск' },
//   {
//     isAnswer: true,
//     answer: '10 + 5',
//     rightOption: 3,
//     options: [{ option: 10 }, { option: 2 }, { option: 15 }, { option: 8 }],
//   },
//   // ]
//   //  }
// ]

export const getTestData = (path) => {
  return async (dispatch) => {
    try {
      await axiosApp.get(path).then((res) => {
        dispatch(addDataToState(res.data.data))
      })
    } catch (error) {
      console.error('get text data error', error)
    }
  }
}

export const changeAccess = (path, token) => {
  return (dispatch) => {
    axiosApp.post(path, { token: token, pass: 'part' }).then((res) => {
      console.log('changeAccess', res.data)
      dispatch(editAccess())
    })
  }
}

export const finishRedirectTest = (path, token, props) => {
  return async (dispatch) => {
    await axiosApp.post(path, { token: token, pass: 'class' }).then((res) => {
      console.log('finishRedirectTest', res.data)
      if (res.data.pass === 'nothing') {
        props.history.push('/')
      } else if (res.data.pass === 'class') {
        dispatch(setMainId(1))
      } else if (res.data.pass === 'section') {
        dispatch(setMainId(0))
      }
    })
  }
}

const editAccess = () => {
  return {
    type: EDIT_ACCESS,
  }
}

export const disableNextButton = (mode) => {
  return {
    type: DISABLE_NEXT_TEST_BUTTON,
    mode,
  }
}

const addDataToState = (answers) => {
  return {
    type: ADD_QUIZ_ANSWERS,
    answers,
  }
}

export const incrementCurrentQuiz = () => {
  return {
    type: INCREMENT_CURRENT_QUIZ,
  }
}

export const decrementCurrentQuiz = () => {
  return {
    type: DECREMENT_CURRENT_QUIZ,
  }
}

export const clearQuizAnswers = () => {
  return {
    type: CLEAR_QUIZ_ANSWERS,
  }
}

export const setCurrentTopRound = (currentTopRound) => {
  return {
    type: SET_CURRENT_TOP_ROUND,
    currentTopRound,
  }
}
