import React from 'react'
import classes from './EditInput.module.sass'

function EditInput(props) {
  const nextStageClickHandler = () => {
    props.clickedSomething(props.propsId)
    props.nextStage()
  }

  const inputOnBlur = () => {
    if (props.onBlurEditRoundREST) {
      props.onChangeSomethingName(props.propsId, props.SomethingNameinputValue, props.propsRoundIs)
      props.onBlurEditRoundREST(props.propsId, props.SomethingNameinputValue)
    } else {
      props.onChangeSomethingName(props.propsId, props.SomethingNameinputValue, props.propsRoundIs)
    }
  }

  const AddingModRender = () => {
    if (props.addingSomething) {
      return <i className="fas fa-plus-circle"></i>
    } else if (!props.addingSomething && props.isEditSomethingName) {
      return (
        <input
          value={props.SomethingNameinputValue}
          onChange={props.onChangeSomethingNameHandler}
          className={classes.newInput}
          onBlur={inputOnBlur}
          autoFocus
        />
      )
    } else {
      return (
        <p className={classes.roundName} onClick={() => nextStageClickHandler()}>
          {props.propsName}
        </p>
      )
    }
  }

  return (
    <>
      <AddingModRender />
    </>
  )
}

export default EditInput
