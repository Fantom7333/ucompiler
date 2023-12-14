import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import NavBar from "../../components/UI/NavBar/NavBar";
import { getConfirmData } from "../../store/actions/ConfirmChangePasswordAction";
import classes from "./ConfirmChangePassword.module.css";







function ConfirmChangePassword(props) {



    const onSubmitHandler = async (event) => {
        event.preventDefault()
        console.log( confirmCode.current.value )
        
        await props.getConfirmData({
            code: confirmCode.current.value,
            password: password.current.value,
            email: props.recoverEmail
        }, props )

    }


        const password = React.createRef()
        const confirmCode = React.createRef()



        return (
            <div className = { classes.Authentication }>
                <NavBar />
                <h1>Ввод кода подтверждения и нового пароля</h1>
                
            <div className = { classes.Authentication_wrapper }>
                

                    <form className = { classes.Authentication_form } onSubmit = { event => onSubmitHandler(event) }>

                    <p style = {{ color: "red"}}>{ props.errorMassage }</p>

                        <input id = "ConfirmPassword" type = "password" className = { classes.Authentication_input } ref = { password } required minLength = "6" maxLength = "20" /> 
                        <label htmlFor = "ConfirmPassword">Новый пароль</label>

                        <input id = "confirmCode" type = "text" className = { classes.Authentication_input } ref = { confirmCode } required minLength = "10" maxLength = "10" /> 
                        <label htmlFor = "confirmCode">Код подтверждения</label>

                        <input  type = "submit" className = { classes.Authentication_input } value = "Сменить пароль"  />
                        
                         
                    </form>

                    

                    
                </div>
                
                
            </div>
        )
}


function mapStateToProps( state ) {
    return {
        recoverEmail: state.RecoverPasswordReducer.recoverEmail,
        errorMassage: state.RecoverPasswordReducer.errorMassage,
    }
}
function mapDispatchToProps( dispatch  ) {
    return {
        getConfirmData: (cnfirmData, props ) => dispatch( getConfirmData( cnfirmData, props) )
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ConfirmChangePassword)) 