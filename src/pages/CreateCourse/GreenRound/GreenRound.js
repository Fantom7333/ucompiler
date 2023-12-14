import React, { useState } from 'react'
import classes from "./GreenRound.module.css"
import { connect } from 'react-redux'

import EditInput from "../EditInput/EditInput"
// { !props.addingRound && <div className = {classes.editPen }><i onClick = { () => props.changeRoundName() } className="fas fa-pencil-alt"></i></div> }
// { !props.addingRound && <FontAwesomeIcon style = {{fontSize: "20px", position: "absolute", height: "100px", width: "230px", cursor: "pointer"}}  onClick = { () => props.changeRoundName() } icon={faPencilAlt} />   }
function GreenRound(props) {

    const [ roundNameinputValue, setRoundNameinputValue ] = useState(props.name)

    const onChangeRoundNameHandler = event => {
        const value = event.target.value
        setRoundNameinputValue(value)
    }

    
    // const nextStageClickHandler = () => {
    //     props.clickedRound( props.id )
    //     props.nextStage()
        
    // }


    // const AddingModRender = () => {
    //     if (props.addingRound) {
    //         return <i className = "fas fa-plus-circle"></i>
    //     } else if ( !props.addingRound && props.isEditRoundName ) {
    //         return <input 
    //         value = { roundNameinputValue }
    //         onChange = { onChangeRoundNameHandler } 
    //         className = { classes.newInput } 
    //         onBlur = { () => props.changeRoundName(props.id, roundNameinputValue) } 
    //         autoFocus
    //         />
    //     }  else {
    //         return <p className = { classes.roundName } onClick = { () => nextStageClickHandler() }>{props.name}</p>
    //     }
    // }

    
    const RenderPens = () => {
        return (
            <>
                <i onClick = { () => props.changeRoundName(props.id, roundNameinputValue ) } className="fas fa-pencil-alt"></i>
                <div className = { classes.trashIcon }>
                    <i onClick = { () => props.deleteRound( props.id ) } className="fas fa-trash"></i>
                </div>
            </>
        )
    }

    console.log("round id", props.id )
    console.log("Round name", roundNameinputValue)
    return (
        <div onClick = { props.addingRound ? () => props.addNewRound() : null  } className = { props.addingRound ? classes.addingRound : classes.round  }>

            <EditInput 
            SomethingNameinputValue = { roundNameinputValue }
            setNameInputValue = { setRoundNameinputValue }
            clickedSomething= { props.clickedRound }
            propsId = { props.id }
            nextStage = { props.nextStage }
            addingSomething = { props.addingRound }
            isEditSomethingName = { props.isEditRoundName }
            propsName = { props.name }
            onChangeSomethingNameHandler = { onChangeRoundNameHandler }
            onChangeSomethingName = { props.changeRoundName }

            // change name ( REST PUT )
            onBlurEditRoundREST = { props.editREST }
            />

            { !props.addingRound && <div className = {classes.editPen }> <RenderPens /> </div> }
        </div>
    )
}

function mapStateToProps ( state ) {
    return {
        newCourseData: state.CreateCourseReducer.newCourseData
    }   
}

export default connect( mapStateToProps ) (GreenRound)