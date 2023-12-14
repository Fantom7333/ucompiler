import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Quiz from "../Quiz/Quiz"
import CouresSquares from "../CouresSquares/CouresSquares"
// import Quiz from "../../components/Quiz/Quiz"
import QuizTest from "../../components/QuizTest/QuizTest"

function MainQuizController(props) {

    const RenderComponent = () => {

        switch ( props.mainCourseId ) {
            case 0:
                return <Quiz />
            case 1:
                return <CouresSquares />
            case 2:
                return <QuizTest />
            default: 
              return true
        }
    }


    return (
        <div>
            <RenderComponent />
        </div>
    )
}

function mapStateToProps ( state ) {
    return {
        mainCourseId: state.MainQuizControllerReducer.mainCourseId,
        setNameInSquareBlock: state.MainQuizControllerReducer.setNameInSquareBlock,
    }
}



export default compose(
    connect( mapStateToProps, null )
) (MainQuizController)

