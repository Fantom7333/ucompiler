import React from 'react'
import classes from "./Drawer.module.css"
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Backdrop from "../../Backdrop/Backdrop"
import {logoutUser} from "../../../../store/actions/AuthAction"
import AppButtonLite from '../../../AppButton/AppButtonLite'


function Drawer(props) {

    const links = [
        {to: "/profile", name: "Профиль"},
        {to: "/new_course", name: "Создать свой курс"},
        {to: "/my_courses", name: "Мои курсы"},
    ]

    if ( props.isAdmin ) {
       links.push({
        to: "/admin", name: "Администрирование",
       })
    }

    let cls = [classes.Drawer]

        if( !props.isOpen ) {
            cls.push(classes.close)
        }



    const RenderLinks = () => {

        return links.map( (item, index) => {
            return (
                <li key = { index }>
                    <NavLink to = { item.to } >{item.name}</NavLink>
                </li>
            )
        })
    }

    return (
        <>
            <nav className = { cls.join(" ") }>
                <ul>
                    <RenderLinks />
                    <NavLink className = { classes.Drawer_logoutButton } to = "/">
                        <AppButtonLite onClick = { () => props.logoutUser() } variant="contained" color="primary" >выход</AppButtonLite>
                    </NavLink>
                </ul>
            </nav>
            { props.isOpen && <Backdrop onClick = { props.onClose } />  } 
        </>
    )
}



function mapStateToProps( state ) {
    
    return {
      isAuth: state.AuthReducer.isAuth,
      isAdmin: state.AuthReducer.isAdmin,
        // isAdmin: state.ToggleMenuReducer.isAdmin
    }
  }
  
  
  function mapDispatchToProps( dispatch ) {
    return {
        logoutUser: () => dispatch( logoutUser() ),
    }
  }



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
) (Drawer)

// export default connect(null, null)(withRouter(Drawer) )