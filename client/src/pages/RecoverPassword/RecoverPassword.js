import React, { useState } from 'react'

import classes from "./RecoverPassword.module.css"
import NavBar from "../../components/UI/NavBar/NavBar"

import { checkValidEmail } from "../../store/actions/RecoverPasswordAction"

import {  withRouter  } from "react-router-dom"

// import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';




function RecoverPassword(props) {

    const [ blockingSendButton, setBlockButton ] = useState(false)


    const  onSubmitHandler = async (event) => {
        event.preventDefault()
        
        setBlockButton(true)
        
        await props.checkValidEmail(emailValue.current.value, props )
        setBlockButton(false)
    }


        const emailValue = React.createRef()




        return (
            <div className = { classes.Authentication }>
                <NavBar />
                <h1>Восстановление пароля</h1>
                
            <div className = { classes.Authentication_wrapper }>
                
                    
                    <form className = { classes.Authentication_form } onSubmit = { event => onSubmitHandler(event) }>

                        
                        <input id = "forgot" type = "email" className = { classes.Authentication_input } ref = { emailValue } required minLength = "6" maxLength = "25" /> 
                        <label htmlFor = "forgot">Введите email</label>

                        <input  type = "submit" className = { classes.Authentication_input } value = "Отправить мне код"  disabled = { blockingSendButton } />
                        
                         
                    </form>

                    

                    
                </div>
                
                
            </div>
        )
}


function mapStateToProps( state ) {
    return {
    }
}
function mapDispatchToProps( dispatch  ) {
    return {
        checkValidEmail: ( email, props ) => dispatch( checkValidEmail( email, props )),
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(RecoverPassword)) 