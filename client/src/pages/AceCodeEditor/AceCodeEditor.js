import React, { Component } from 'react'
import classes from './AceCodeEditor.module.css'
import AceEditor from 'react-ace'
import AceSettings from './AceSettings/AceSettings'
import Cookies from 'js-cookie'
import axiosApp from '../../axios/axiosApp'
import Loader from '../../components/UI/Loader/Loader'
// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/mode-python";
// import "ace-builds/src-noconflict/mode-csharp";
// import "ace-builds/src-noconflict/mode-c_cpp";

// import 'ace-builds/src-noconflict/theme-mono_industrial';
// import 'ace-builds/src-noconflict/theme-gob';
// import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/webpack-resolver'

import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import Typography from '@material-ui/core/Typography'
import AppButton from '../../components/AppButton/AppButton'

export default class AceCodeEditor extends Component {
  state = {
    mode: this.props.mode || "python" || Cookies.get('aceMode') || this.props.defaultMode,
    fontSize: Cookies.get('aceFontSize') || this.props.fontSize,
    relativeSize: Cookies.get('aceRelativeSize') || "1" || this.props.relativeSize,
    settingsIsOpen: false,
    theme: Cookies.get('aceTheme') || this.props.theme,
    inputValue: Cookies.get('aceInputValue') || this.props.defaultInputValue,
    outputValue: Cookies.get('aceOutputValue') || this.props.defaultOutputValue,
    inputFocus: false,
    loading: false,
  }

  post = async () => {
    this.loading()
    const code = this.state.inputValue
    let pr_ln = this.state.mode
    if (pr_ln === 'python') {
      pr_ln = 'py'
    } else if (pr_ln === 'c_cpp') {
      pr_ln = 'cpp'
    } else if (pr_ln === 'csharp') {
      pr_ln = 'cs'
    }
    try {
      const request = await axiosApp.post(`/code/${pr_ln}`, {
        headers:{
          // 'Content-type': 'text/javascript'
        }, 
      code  : String(code),
      })
      const response = request.data
      console.log("RESPONSE",response)
      this.setState({ outputValue: response['output'] })
      this.loading()
      // return response
    } catch (error) {
      console.error('Post  to docker Ace error ', error)
      this.setState({ outputValue: String(error) })
      this.loading()
      // return error
    }
  }

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  settingsOpenHandler = () => {
    this.setState({ settingsIsOpen: !this.state.settingsIsOpen })
  }

  onClickRunHandler = async () => {
    const result = await this.post(this.state.inputValue, this.state.mode)
    console.log('RESULT', result)
    this.setState({ outputValue: result['output'] })
  }

  onAceInputChange = (newValue) => {
    this.setState({ inputValue: newValue })
  }

  loading = () => {
    this.setState({ loading: !this.state.loading })
  }

  render() {
    console.log(this.props.relativeSize)
    return (
      <div className={classes.AceEditor}>
        <AppBar position="static" color="transparent" style={{ backgroundColor: '#777a6d', height: '70px' }}>
          <Toolbar>
            <IconButton onClick={this.settingsOpenHandler} edge="start" color="inherit">
              <SettingsIcon />
            </IconButton>
            <Typography variant="h5" style={{ marginLeft: '40%', textTransform: 'capitalize' }}>
              {this.state.mode === 'csharp' ? 'C#' : null}
              {this.state.mode === 'c_cpp' ? 'C++' : null}
              {this.state.mode === 'python' || this.state.mode === 'java' ? this.state.mode : null}
            </Typography>
            {this.state.loading ? (
              <div style={{ marginLeft: 'auto' }}>
                <Loader color="#74e293" />
              </div>
            ) : (
              <AppButton onClick={this.post} style={{ backgroundColor: '#4ac472b6', marginLeft: 'auto' }}>
                Run
              </AppButton>
            )}
          </Toolbar>
        </AppBar>
        <div style={{ display: 'flex' }}>
          <AceEditor
            focus={false}
            mode={this.state.mode}
            theme={this.state.theme}
            placeholder="<write your  here>"
            width={`${this.state.relativeSize}00%`}
            fontSize={this.state.fontSize}
            readOnly={this.props.readOnly}
            value={this.state.inputValue}
            onChange={this.onAceInputChange}
            editorProps={{ $blockScrolling: true }}
            style={{ border: '2px solid #1c1d1d' }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
          />

          <div className={classes.output}>
            <AceEditor
              theme={this.state.theme}
              width="100%"
              height="100%"
              readOnly={true}
              showGutter={false}
              fontSize={this.state.fontSize}
              cursorStart={2}
              value={this.state.outputValue}
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
            />
          </div>
        </div>

        <AceSettings
          settingsIsOpen={this.state.settingsIsOpen}
          settingsOpenHandler={this.settingsOpenHandler}
          fontSize={this.state.fontSize}
          relativeSize={this.state.relativeSize}
          theme={this.state.theme}
          mode={this.state.mode}
          onChangeFont={(font) => {
            this.setState({ fontSize: font })
          }}
          onChangeRelative={(relative) => {
            this.setState({ relativeSize: relative })
          }}
          onChangeTheme={(theme) => {
            this.setState({ theme })
          }}
          onChangeMode={(mode) => {
            this.setState({ mode })
          }}
        />

      </div>
    )
          
  }
}
