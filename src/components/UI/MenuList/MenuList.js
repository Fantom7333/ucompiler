import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const MenuList = ({ anchorEl, items, onClose }) => {
  // ancorEl - расположение меню. Значение появляется при нажатии кнопки.
  //    В параметр кнопки onClick нужно передать функцию: (event) => setAncorEl(event.currentTarget)

  // items - массив с массивами: [[label_1, function_1], [label_2, function_2]]

  // onClose - функция, которая обнуляет значение ancorEl: setAncorEl(null)
  return (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      open={Boolean(anchorEl)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={onClose}
    >
      {items.map((el, index) => (
        <MenuItem key={index} onClick={el[1]}>
          {el[0]}
        </MenuItem>
      ))}
    </Menu>
  )
}

export default MenuList
