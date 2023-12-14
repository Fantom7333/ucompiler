import { connect } from 'react-redux'
import React, {  useState } from 'react'
import { compose } from 'redux'
import classes from './LeftSideMenu.module.sass'
import Submenu from './Submenu'
import { withRouter } from 'react-router'
import { createTheme, IconButton, TextField } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'
import { green } from '@material-ui/core/colors'
import { ThemeProvider } from '@material-ui/core/styles'

const queryString = require('query-string')

interface ItestItems {
  mainName: string
  subItems: Array<string>
  isOpened: boolean
  id: number
}

function LeftSideMenu(props: any) {
  const [subItems, setsubItems] = useState([
    {
      mainName: 'Дисциплины',
      subItems: ['Всё', 'Программирование', 'Математика', 'Физика', 'Машинное обучение', 'Статистика'],
      isOpened: false,
      id: 232174923,
    },
  ])
  const [searchValue, setSearchValue] = useState('')
  // const [filterParams, setFilterParams] = useState('')
  // const [filterPath, setFilterPath] = useState('')

  ///////// Hooks

  // useEffect(() => {
  //   setFilterPath(`?coursename=${searchValue}&scope=${filterParams}`)
  // }, [searchValue, filterParams])

  const subItemsHendler = (id: number) => {
    // let newItems: ItestItems | {} = {}
    setsubItems(
      subItems.map((item: ItestItems) => {
        if (item.id === id) {
          return { ...item, isOpened: !item.isOpened }
        }
        return item
      })
    )
  }

  const subItemClickCllBack = (name: string) => {
    // setFilterParams(name)

    if (name === 'Всё') props.history.push(`/?coursename=&scope=`)
    else {
      props.history.push(`/?coursename=${searchValue}&scope=${name}`)
    }
  }

  const RenderMenuItems = (): JSX.Element[] => {
    return subItems.map((item: ItestItems, index) => {
      return (
        <ul key={index * Date.now()} className={classes.Quiz_leftPanel_ul}>
          <div className={classes.Quiz_leftPanel_mainName} onClick={() => subItemsHendler(item.id)}>
            <p>{item.mainName}</p>
            <i className="fa fa-sort-desc" aria-hidden="true"></i>
          </div>
          <Submenu onItemClick={subItemClickCllBack} itemList={item.subItems} defaultState={item.isOpened} />
        </ul>
      )
    })
  }

  const SearchQueryParseHalper = () => {
    const parsed = queryString.parse(props.history.location.search)
    props.history.push(`/?coursename=${searchValue}&scope=${parsed.scope}`)
  }

  const onEnterSearchButtonHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      SearchQueryParseHalper()
    }
  }
  const theme = createTheme({
    palette: {
      primary: green,
    },
  })

  return (
    <div className={classes.Quiz_leftPanel}>
      <div className={classes.Quiz_leftPanel_input}>
        <ThemeProvider theme={theme}>
          <TextField
            inputProps={{ style: { color: '#fff', fontFamily: 'Montserrat', width: '100%' } }}
            placeholder="Поиск..."
            variant="filled"
            size="small"
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) => onEnterSearchButtonHandler(e)}
          />
        </ThemeProvider>
        <IconButton style={{ color: '#9df07e7e' }} type="submit" onClick={() => SearchQueryParseHalper()}>
          <SearchIcon />
        </IconButton>
      </div>
      {RenderMenuItems()}
    </div>
  )
}

function mapDispatchToProps(dispatch: any) {
  return {}
}

export default compose(withRouter, connect<any>(null, mapDispatchToProps))(LeftSideMenu)
