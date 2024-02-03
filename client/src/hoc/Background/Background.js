import React from 'react'
import classes from './Background.module.css'
import LinksPage from '../../components/LinksSocialMedia/LinksSocialMedia'
import LinksPolitics from '../../components/LinksPolitics/LinksPolitics'
const Background = ({children}) => {
  return (
    <div className={classes.Background}>
      {children}
      <div></div>
      <div className={classes.ClassForUrls}>
      <LinksPage></LinksPage>
      <LinksPolitics></LinksPolitics>
      <div>
      </div>
      </div>
    </div>
    )
}
export default Background