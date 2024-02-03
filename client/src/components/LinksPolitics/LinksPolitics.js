import React, { Component } from 'react'
import classes from './LinksPolitics.module.sass'
import PrivacyPolitic from "./PrivacyPolitic.pdf"
import UserConfirmation from "./UserConfirmation.pdf"
const ahref = "https://ucompiler.ru"


function LinksPolitics() {
  return (
    <div className={classes.LinksPolitics}>
    <div className={classes.ClassForTerms}><a href={PrivacyPolitic} target="blank">
        <p>Политика конфиденциальности</p>
  </a>
  </div>
  <div className={classes.ClassForTerms}>
    <a href={UserConfirmation} target='blank'>
  <p>Пользовательское соглашение</p>
  </a>
  </div>
    </div>
  )
}

export default class LinksPage extends Component {
  render() {
      return (
          LinksPolitics()
      )
  }
}