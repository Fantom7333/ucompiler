import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import Square from '../../components/Square/Square'
import BackButton from '../../components/UI/BackButton/BackButton'
import NavBar from '../../components/UI/NavBar/NavBar'
import { countSquares, getSquaresData, setCureentSquare, unmountSquares } from '../../store/actions/CouresSquaresAction'
import { setMainId, setSquareId } from '../../store/actions/MainQuizControllerAction'
import classes from './CouresSquares.module.css'

class CouresSquares extends React.Component {
  state = {
    loading: true,
    squareId: null,
    squareName: null,
  }

  componentDidMount() {
    const path = `section/${this.props.roundId}?token=${localStorage.getItem('token')}`
    console.log('Path', path)
    this.props.getSquaresData(path, this.props)
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    // this.props.unmountSquares()
    // this.props.clearBlock()
    // this.props.getDataFromQuizes(this.props.match.params.course)
    // this.props.setMainId(0)
  }

  componentDidUpdate() {
    this.props.countSquares(this.squaresRender().length)
  }

  onSquareClickHandler = (id, name) => {
    // this.setState({
    //     squareId: id,
    //     squareName: name
    // })
    this.props.setSquareId(id)
    this.props.setMainId(2)
  }

  squaresRender = () => {
    if (this.props.squaresData) {
      return this.props.squaresData.map((item, index) => {
        let mapingLinks = []

        if (this.props.isAuth) {
          //
          mapingLinks.push(
            <React.Fragment key={index}>
              {item.access ? (
                <div className={classes.squaresLinks}>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.onSquareClickHandler(item.id, item.class_name)}
                  >
                    <Square squareName={item.class_name} />
                  </div>
                </div>
              ) : (
                <Square squareName={item.class_name} NotAllowed={!item.access} />
              )}
            </React.Fragment>
          )
        } else {
          // this.props.countSquares()
          mapingLinks.push(
            <React.Fragment key={index}>
              <NavLink to="/authorization/log_in">
                <Square squareName={item.class_name} />
              </NavLink>
            </React.Fragment>
          )
        }
        // this.props.countSquares()
        return (
          <div className={classes.courseBlocks_round} key={item + index}>
            {mapingLinks}
          </div>
        )
      })
    } else {
      return <h2>Уроков ещё не добавлено... </h2>
    }
  }

  render() {
    console.log('this.props.roundId', this.props.roundId)

    const paramsSquares = () => {
      return (
        <div className={classes.Quiz_wrapper_info}>
          <BackButton onClick={() => this.props.setMainId(0)} />
          <h1>{this.props.squareName}</h1>
        </div>
      )
    }

    const RenderContent = () => {
      return (
        <React.Fragment>
          <NavBar />
          {paramsSquares()}
          <div className={classes.Square_wrapper}>{this.squaresRender()}</div>
        </React.Fragment>
      )
    }

    // const squares = this.state.loading ? <h1>loading...</h1> : this.squaresRender()
    // const titleContent = this.state.loading ? <h1>loading...</h1> : paramsSquares()

    return (
      <div className={classes.Quiz}>
        <RenderContent />
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    squaresData: state.CouresSquaresReducer.squaresData,
    isAuth: state.AuthReducer.isAuth,
    squaresCount: state.CouresSquaresReducer.squaresCount,
    currentCourse: state.quizReducer.currentCourse,
    squaresBlockName: state.quizReducer.squaresBlockName,
    squareName: state.MainQuizControllerReducer.squareName,

    roundId: state.MainQuizControllerReducer.roundId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    countSquares: (squares) => dispatch(countSquares(squares)),
    unmountSquares: () => dispatch(unmountSquares()),
    getSquaresData: (path, token, props) => dispatch(getSquaresData(path, token, props)),
    setCureentSquare: (currentSquare) => dispatch(setCureentSquare(currentSquare)),

    setMainId: (id) => dispatch(setMainId(id)),
    setSquareId: (id) => dispatch(setSquareId(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CouresSquares))
