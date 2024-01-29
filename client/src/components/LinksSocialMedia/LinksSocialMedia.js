import React, { Component } from 'react'
import classes from './LinksSocialMedia.module.sass'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import TelegramIcon from '@material-ui/icons/Telegram'
import LinkIcon from '@material-ui/icons/Link'
import { Icon24LogoVk } from '@vkontakte/icons'
import ContactMailIcon from '@material-ui/icons/ContactMail';
const ahref = "https://ucompiler.ru"


function LinksSocialMedia() {
  return (
    <div className="LinksSocialMedia">
      <List dense={true} className={classes.paper}>
   <ListItem
    button
    id='telegram'
>
    <a href="https://t.me/scidivecommunity">
    <ListItemIcon>
      <TelegramIcon />
    </ListItemIcon>
    </a>
    <ListItemText primary='Telegram' />
  </ListItem>
  <ListItem button id='vk'>
    <a href="https://vk.com/scidive">
    <ListItemIcon>
    <Icon24LogoVk/>
    </ListItemIcon>
    </a>
    <ListItemText primary='VK' />
  </ListItem>
  <a href="mailto:scidivecommunity@gmail.com">
  <ListItem button id='mail'>
    <ListItemIcon>
     <ContactMailIcon/>
    </ListItemIcon>
    <ListItemText primary='Contact us' />
  </ListItem>
  </a>
  <ListItem button id='copy'>
    <ListItemIcon onClick={navigator.clipboard.writeText(ahref)}>
      <LinkIcon />
    </ListItemIcon>
    <ListItemText primary='Copy Link' />
  </ListItem>
</List>
    </div>
  )
}

export default class LinksPage extends Component {
  render() {
      return (
          LinksSocialMedia()
      )
  }
}