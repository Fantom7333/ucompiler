import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import BackButton from '../../components/UI/BackButton/BackButton'
import NavBar from '../../components/UI/NavBar/NavBar'
import { setMainId, setNameInSquareBlock, setRoundId } from '../../store/actions/MainQuizControllerAction'
import { clearBlock, getDataFromQuizes, setCurrentRound } from '../../store/actions/quizAction'
import classes from './Quiz.module.css'

class Quiz extends React.Component {
  // props.quiz[ props.match.params.id ]

  state = {
    loading: true,
    roundId: null,
    roundName: null,
  }

  componentDidMount() {
    this.props.getDataFromQuizes(this.props.match.params.courseId, localStorage.getItem('token'), this.props)
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    this.props.clearBlock()
    // this.setState({
    //     roundId: null
    // })
    // this.props.getDataFromQuizes(this.props.match.params.course)
  }

  //     <NavLink to = { `/quizes/${props.match.params.id}/${index }` }>
  //     { item.blokName }
  // </NavLink>

  // <Link to = { `/quizes/${props.match.params.id}/${index }` }>
  //                     { item.blokName }
  //                     </Link>

  // <NavLink to = { `${props.match.url}/block/${index }` }>
  //                     { item.blokName }
  //                     </NavLink>

  onRoundClickHandler = (id, name) => {
    this.props.setCurrentRound(id)
    // this.props.setNameInSquareBlock(name)
    // this.setState({
    //     roundId: id,
    //     roundName: name
    // })
    this.props.setNameInSquareBlock(name)
    this.props.setRoundId(id)
    this.props.setMainId(1)
  }

  blocksRender = (blockQuiz) => {
    return blockQuiz.map((item, index) => {
      let mapingLinks = []

      if (this.props.isAuth && localStorage.getItem('token')) {
        mapingLinks.push(
          <React.Fragment key={index}>
            {!item.access ? (
              item.section_name
            ) : (
              <p style={{ cursor: 'pointer' }} onClick={() => this.onRoundClickHandler(item.id, item.section_name)}>
                {item.section_name}
              </p>
            )}
          </React.Fragment>
        )
      } else {
        console.log('Anower side')
        mapingLinks.push(
          <React.Fragment key={index}>
            <NavLink to="/authorization/log_in">{item.section_name}</NavLink>
          </React.Fragment>
        )
      }
      // IF USES IS NOT AUTH
      // } else if ( !this.props.isAuth ) {
      //     mapingLinks.push(
      //         <React.Fragment key = { index }>
      //             <NavLink to = "/authorization/log_in" >
      //                 { item.section_name   }
      //             </NavLink>
      //         </React.Fragment>
      //     )
      // }
      return (
        <div
          className={`${classes.courseBlocks_round} ${!item.access && classes.courseBlocks_round_notAllowed}`}
          key={item + index}
        >
          {mapingLinks}
        </div>
      )
    })
  }

  // console.log( props.quiz[ props.match.params.id ]  )

  // { this.blocksRender( this.props.quiz ) }
  onExitHandler = () => {
    this.props.history.goBack()
  }
  render() {
    const paramsQuiz = (quiz) => {
      return (
        <div className={classes.Quiz_wrapper_info}>
          <h1>{this.props.courseName}</h1>
        </div>
      )
    }

    const renderContent = (
      <React.Fragment>
        <div className={classes.Quiz_wrapper}>
          <NavBar />
          <BackButton onClick={() => this.onExitHandler()} />
          {paramsQuiz(this.props.quiz[0])}

          {this.blocksRender(this.props.quiz)}
        </div>
      </React.Fragment>
    )

    const content = this.state.loading ? <h1>loading...</h1> : renderContent
    // { content }
    // <CouresSquares />
    return <div className={classes.Quiz}>{content}</div>
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quizReducer.quiz,
    currentCourse: state.quizReducer.currentCourse,
    isAuth: state.AuthReducer.isAuth,
    courseName: state.quizReducer.courseName,
    mainCourseId: state.quizReducer.mainCourseId,

    // currentCourse: state.quizReducer.currentCourse
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getDataFromQuizes: (courseId, token, props) => dispatch(getDataFromQuizes(courseId, token, props)),
    clearBlock: () => dispatch(clearBlock()),
    setRoundId: (id) => dispatch(setRoundId(id)),
    setNameInSquareBlock: (name) => dispatch(setNameInSquareBlock(name)),
    setMainId: (id) => dispatch(setMainId(id)),
    setCurrentRound: (roundId) => dispatch(setCurrentRound(roundId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz))
