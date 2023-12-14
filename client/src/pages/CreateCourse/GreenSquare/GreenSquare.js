import React, { useState } from 'react'
import classes from "./GreenSquare.module.css"

import EditInput from "../EditInput/EditInput"



function GreenSquare(props) {
    const [ squareNameinputValue, setSquareNameinputValue ] = useState(props.name)

    const onChangeSquareNameHandler = event => {
        const value = event.target.value
        setSquareNameinputValue(value)
    }

    const RenderIcons = () => {
        return (
            <>
                <div className = { classes.pencil }>
                    <i onClick = { () => props.changeSquareName( props.id, squareNameinputValue, props.roundId ) } className="fas fa-pencil-alt"></i>
                </div>
                <div className = { classes.trash }>
                    <i onClick = { () => props.deleteSquare( props.id ) } className="fas fa-trash"></i>
                </div>
                
            </>
        )
    }

    // props.nextStage
    return (
        <div className = { !props.addingSquare ? classes.Square : classes.addingSquare }  >
            <div className = { classes.Square_wrapper } onClick = { !props.addingSquare ? null : props.addNewSquare } >

                <EditInput 
                SomethingNameinputValue = { squareNameinputValue }
                setNameInputValue = { setSquareNameinputValue }
                clickedSomething= { props.clickedSquare }
                propsId = { props.id }
                propsRoundIs = { props.roundId }
                nextStage = { props.nextStage }
                addingSomething = { props.addingSquare }
                isEditSomethingName = { props.isEditSquareName }
                propsName = { props.name }
                onChangeSomethingNameHandler = { onChangeSquareNameHandler }
                onChangeSomethingName = { props.changeSquareName }

                // change square name REST
                onBlurEditRoundREST = { props.editREST }
                />

                { !props.addingSquare && <div  className = {classes.editPen }> <RenderIcons /> </div> }
            </div>
        </div>
    )
}

export default GreenSquare
