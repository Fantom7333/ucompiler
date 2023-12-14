import React, { Component } from 'react'

import classes from "./MainPage.module.sass"

import NavBar  from "../../components/UI/NavBar/NavBar"
import MainPageContent from "../../components/MainPageContent/MainPageContent"

export default class MainPage extends Component {
    render() {
        return (
            <div className = { classes.mainClass }>
                <NavBar />
                <MainPageContent />
            </div>
        )
    }
}
