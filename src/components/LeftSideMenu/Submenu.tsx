//--isolatedModules
import classes from './Submenu.module.sass'
import React from 'react'

interface IProps {
  itemList: Array<string>
  defaultState: boolean
  onItemClick: (name: any) => void
}

const Submenu: React.FC<IProps> = (props) => {
  const RenderItems = (): any => {
    return props.itemList.map((item, index) => {
      return (
        <React.Fragment key={index * Date.now()}>
          <li onClick={() => props.onItemClick(item)}>{item}</li>
        </React.Fragment>
      )
    })
  }

  return (
    <ul className={props.defaultState ? classes.opened : classes.closed}>
      <hr />
      <RenderItems />
    </ul>
  )
}
export default Submenu
