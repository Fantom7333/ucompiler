import { ADD_QUIZ_ANSWERS, CLEAR_QUIZ_ANSWERS, DECREMENT_CURRENT_QUIZ, DISABLE_NEXT_TEST_BUTTON, EDIT_ACCESS, INCREMENT_CURRENT_QUIZ, SET_CURRENT_TOP_ROUND } from "../actions/actionTypes"

const initialState = {
    current: 0,
    currentTopRound: null,
    disableTestButton: false,
    quizAsnwers: [
        // { isAnswer: true,   answer: "5 + 5",  rightOption: 1,  options: [{ aswer1: 10 }, { aswer2: 2 }, {aswer3: 1 }, {aswer3: 322 }] },
        // { isAnswer: false,  theoryName: "Градиентный спуск", theory: "Градиентный спуск" } ,
        // { isAnswer: true,   answer: "10 + 5",  rightOption: 3,  options: [{ aswer1: 10 }, { aswer2: 2 }, {aswer3: 15 }, {aswer3: 8 }]  },
        // {
        //     "access": true,
        //     "info_text": [
        //       "А",
        //       "B",
        //       "С"
        //     ],
        //     "info_title": "ВЫБЕРИТЕ ВАРИАНТ ОТВЕТА:",
        //     "subclass_id": 0,
        //     "test": true
        //   },
    ]
}


const QuizTestRoundsReducer = ( state = initialState , action ) => {
    switch( action.type ) {


        case DECREMENT_CURRENT_QUIZ:
            return {
                ...state,
                current: state.current - 1
            }  
        case INCREMENT_CURRENT_QUIZ:
            return {
                ...state,
                current: state.current + 1
            }

          
        case EDIT_ACCESS:            
            return {
                ...state,
                quizAsnwers: state.quizAsnwers.map( item => {
                    // debugger
                    if( item.id === state.currentTopRound ) {      
                        // debugger                  
                        return { ...item , access: true }
                    }
                return item
            })
        }
        case ADD_QUIZ_ANSWERS:
            return {
                ...state,
                quizAsnwers: action.answers
            }
          

        case CLEAR_QUIZ_ANSWERS:
            return {
                ...state,
                quizAsnwers: [],
                current: 0,
                disableTestButton: false
            }
        
        case DISABLE_NEXT_TEST_BUTTON:
            return {
                ...state,
                disableTestButton: action.mode
            }

        case SET_CURRENT_TOP_ROUND:
            return {
                ...state,
                currentTopRound: action.currentTopRound
            }

        default:
            return state
    }
}


export default QuizTestRoundsReducer