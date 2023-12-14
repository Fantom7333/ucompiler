import React from 'react'
import classes from './AceSettings.module.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Cookies from 'js-cookie'


const AceSettings = props => {

    const formControStyle = {
        margin: '5px',
        minWidth: '100px'
    }
    const [fontSize, setFontSize] = React.useState(props.fontSize)
    const [relativeSize, setRelativeSize] = React.useState(props.relativeSize)
    const [theme, setTheme] = React.useState(props.theme)
    const [mode, setMode] = React.useState(props.mode)
    
    const onClickSave = () => {
        Cookies.set("aceFontSize", fontSize, {path: '/my_courses'})
        Cookies.set("aceRelativeSize", relativeSize, {path: '/my_courses'})
        Cookies.set("aceTheme", theme, {path: '/my_courses'})
        Cookies.set("aceMode", mode, {path: '/my_courses'})
        props.onChangeFont(fontSize)
        props.onChangeRelative(relativeSize)
        props.onChangeTheme(theme)
        props.onChangeMode(mode)
        props.settingsOpenHandler()
    }

    return (
        <div className={classes.AceSettings}>
            <Dialog disableEscapeKeyDown open={props.settingsIsOpen} onClose={(event, reason) => {
              if (reason !== 'backdropClick') props.settingsOpenHandler()
            }}>
                <DialogTitle style={{ backgroundColor: '#f8fde7' }} >Настройки</DialogTitle>
                <DialogContent style={{ backgroundColor: '#f8fde7' }}>
                    <form className={classes.container}>
                        <FormControl variant="outlined" style={formControStyle}>
                            <InputLabel id="demo-dialog-select-label">pt</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={fontSize}
                                onChange={(event) => {setFontSize(event.target.value)}}
                                label="pt"
                                >
                                <MenuItem value={'8pt'}>8</MenuItem>
                                <MenuItem value={'9pt'}>9</MenuItem>
                                <MenuItem value={'10pt'}>10</MenuItem>
                                <MenuItem value={'11pt'}>11</MenuItem>
                                <MenuItem value={'12pt'}>12</MenuItem>
                                <MenuItem value={'13pt'}>13</MenuItem>
                                <MenuItem value={'14pt'}>14</MenuItem>
                                <MenuItem value={'15pt'}>15</MenuItem>
                                <MenuItem value={'16pt'}>16</MenuItem>
                                <MenuItem value={'17pt'}>17</MenuItem>
                                <MenuItem value={'18pt'}>18</MenuItem>
                                <MenuItem value={'19pt'}>19</MenuItem>
                                <MenuItem value={'20pt'}>20</MenuItem>
                            </Select>
                            <FormHelperText>Размер шрифта</FormHelperText>
                        </FormControl>
                        <FormControl variant="outlined" style={formControStyle}>
                        <InputLabel id="demo-dialog-select-label">%</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={relativeSize}
                                label="pt"
                                onChange={(event) => {setRelativeSize(event.target.value)}}
                                >
                                <MenuItem value={0}>0% (output fullscreen)</MenuItem>
                                <MenuItem value={1}>50%</MenuItem>
                                <MenuItem value={2}>65%</MenuItem>
                                <MenuItem value={3}>75%</MenuItem>
                                <MenuItem value={4}>80%</MenuItem>
                                <MenuItem value={5}>85%</MenuItem>
                                <MenuItem value={10000}>100% (input fullscreen)</MenuItem>
                            </Select>
                            <FormHelperText>Ширина поля ввода</FormHelperText>
                        </FormControl>
                        <FormControl variant="outlined" style={formControStyle}>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={theme}
                                onChange={(event) => {setTheme(event.target.value)}}
                            >
                                <MenuItem value={'mono_industrial'}>Default</MenuItem>
                                <MenuItem value={'gob'}>Dark</MenuItem>
                                <MenuItem value={'kuroir'}>Light</MenuItem>
                                
                            </Select>
                            <FormHelperText>Тема</FormHelperText>
                        </FormControl>
                        <FormControl variant="outlined" style={formControStyle}>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={mode}
                                onChange={(event) => {setMode(event.target.value)}}
                            >
                                <MenuItem value={'python'}>Python</MenuItem>
                                <MenuItem value={'java'}>Java</MenuItem>
                                <MenuItem value={'csharp'}>C#</MenuItem>
                                <MenuItem value={'c_cpp'}>C++</MenuItem>
                                
                            </Select>
                            <FormHelperText>Язык</FormHelperText>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions style={{ backgroundColor: '#f8fde7' }}>
                    <Button onClick={props.settingsOpenHandler} color="default">
                        Отмена
                    </Button>
                    <Button onClick={onClickSave} color="default">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AceSettings