import React, { useState } from 'react'
import classes from "./Layout.module.css"
import { connect } from 'react-redux'

import ToggleMenu from "../../components/UI/ToggleMenu/ToggleMenu"
import Drawer from "../../components/UI/ToggleMenu/Drawer/Drawer"



function Layout(props) {

    const [ menu, setMenuMode ] = useState(false)

    const toggleMenuHandler = () => {
        setMenuMode(!menu)
    }

    const onClose = () => {
        setMenuMode(false)
    }

    // const RenderToggleMenu = () => {
    //     if ( props.isAuth ) {
    //         return (
    //             <div className = { classes.Layout }>
    //                 <Drawer 
    //                 isOpen = { menu }
    //                 onClose = { onClose }
    //                 />

    //                 <ToggleMenu
    //                 onToggle = { toggleMenuHandler }
    //                 isOpen = { menu }
    //                 />

    //                 <main>
    //                     { props.children }
    //                 </main>
    //              </div>
    //         )
    //     } else {
    //         return (
    //             <main>
    //                 { props.children }
    //             </main>
    //         )
    //     }
    // }


    return (
        <div className = { classes.Layout }>
            <Drawer 
            isOpen = { menu }
            onClose = { onClose }
            />

            <ToggleMenu
            onToggle = { toggleMenuHandler }
            isOpen = { menu }
            />

            <main>
                { props.children }
            </main>
         </div>
    )
}



function mapStateToProps( state ) {
    return {
        isAuth: state.AuthReducer.isAuth
    }
}

export default connect(mapStateToProps) ( Layout )