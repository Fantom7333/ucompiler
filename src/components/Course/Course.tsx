import React, { useState } from 'react'
import classes from './Course.module.sass'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { Dialog } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import { NavLink, withRouter } from 'react-router-dom'

import CreateCourse from '../../pages/CreateCourse/CreateCourse'
import AppButtonLite from '../AppButton/AppButtonLite'
// import { sendForVerification } from "../../store/actions/MyCoursesActions"

interface CourseProps {
  avatar: string
  courseName: string
  scope: string
  isEditCourse: boolean
  itemId: number
  moderated: string
  about: string
  exp_before: string
  exp_after: string
  onCourseClickHandler: () => void
  onSendCourseClick: (courseId: number) => void
  onCheckInside: (courseId: number) => void

  onEditCourse: (courseId: number) => void
  sendForChecking: (courseId: number) => void
  sendForVerification: (courseId: number) => void
  viewCourse: (courseId: number) => void
  deleteCourse: (courseId: number) => void

  setCurrentCourseId: (courseId: number) => void

  setNewViewData: (
    courseId: number,
    category: string,
    image: File,
    courseName: string,
    about: string,
    exp_before: string[],
    exp_after: string[]
  ) => void
}

const Course: React.FC<CourseProps> = (props) => {
  const [isOpenComponent, setIsOpenComponent] = useState(false)
  const [openDelete, setOpenDelete] = React.useState(false)

  const onEditCourseViwe = (courseId: number): void => {
    props.setCurrentCourseId(courseId)
    props.onEditCourse(courseId)
  }

  const onOpentComp = () => {
    setIsOpenComponent(!isOpenComponent)
  }

  const setForChecking = (courseId: number) => {
    props.sendForChecking(courseId)
  }

  const setNewViewDataHandler = (
    category: string,
    image: File,
    courseName: string,
    about: string,
    exp_before: string[],
    exp_after: string[]
  ) => {
    props.setNewViewData(props.itemId, category, image, courseName, about, exp_before, exp_after)
  }

  const deleteClickHandler = () => {
    props.deleteCourse(props.itemId)
    setOpenDelete(false)
  }

  const handleClickOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  const RenderButtons = (): JSX.Element | undefined => {
    const buttonStyles = {
      height: '5vh',
      width: '5vh',
      padding: 0,
      margin: '3%',
      minWidth: '1vw',
      fontFamily: 'Montserrat, sans-serif',
      color: '#fff',
    }
    const before_moderatedANDcanceled = (
      <div className={classes.editMode_buttons_beforeModerated}>
        <AppButtonLite
          style={buttonStyles}
          onClick={() => onEditCourseViwe(props.itemId)}
          variant="contained"
          color="primary"
          tooltip="Редактировать"
        >
          <i className="fas fa-pen"></i>
        </AppButtonLite>

        <AppButtonLite
          style={buttonStyles}
          onClick={() => onOpentComp()}
          variant="contained"
          color="primary"
          tooltip="Изменить информацию о курсе"
        >
          <i className="far fa-edit"></i>
        </AppButtonLite>

        <AppButtonLite
          style={buttonStyles}
          onClick={() => setForChecking(props.itemId)}
          variant="contained"
          color="primary"
          tooltip="Отправить на модерацию"
        >
          <i className="far fa-paper-plane"></i>
        </AppButtonLite>
        <NavLink to={`/about_course/${props.itemId}`}>
          <AppButtonLite
            style={buttonStyles}
            // onClick={() => props.viewCourse(props.itemId)}
            variant="contained"
            color="primary"
            tooltip="Посмотреть"
          >
            <i className="fas fa-eye"></i>
          </AppButtonLite>
        </NavLink>
        <AppButtonLite
          style={buttonStyles}
          onClick={handleClickOpenDelete}
          variant="contained"
          color="primary"
          tooltip="Удалить"
        >
          <i className="fas fa-trash-alt"></i>
        </AppButtonLite>
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>{'Удаление курса'}</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Вы действительно хотите удалить курс?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <AppButtonLite style={buttonStyles} onClick={deleteClickHandler} variant="contained" color="primary">
              Да
            </AppButtonLite>
            <AppButtonLite
              style={buttonStyles}
              onClick={handleCloseDelete}
              variant="contained"
              color="primary"
              autoFocus
            >
              Нет
            </AppButtonLite>
          </DialogActions>
        </Dialog>
      </div>
    )

    if (props.moderated === 'before-moderated') {
      return before_moderatedANDcanceled
    } else if (props.moderated === 'post-moderated') {
      return (
        <>
          <AppButtonLite
            style={{ ...buttonStyles, width: '10vw' }}
            onClick={() => props.viewCourse(props.itemId)}
            variant="contained"
            color="primary"
            className={classes.editMode_buttons_beforeModerated}
          >
            Посмотреть курс{' '}
          </AppButtonLite>
          <AppButtonLite
            style={{ ...buttonStyles, width: '10vw' }}
            onClick={handleClickOpenDelete}
            variant="contained"
            color="primary"
            className={classes.editMode_buttons_beforeModerated}
          >
            Удалить
          </AppButtonLite>
          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>{'Удаление курса'}</DialogTitle>
            <DialogContent>
              <DialogContentText style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Вы действительно хотите удалить курс?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <AppButtonLite style={buttonStyles} onClick={deleteClickHandler} variant="contained" color="primary">
                Да
              </AppButtonLite>
              <AppButtonLite
                style={buttonStyles}
                onClick={handleCloseDelete}
                variant="contained"
                color="primary"
                autoFocus
              >
                Нет
              </AppButtonLite>
            </DialogActions>
          </Dialog>
        </>
      )
    } else if (props.moderated === 'moderated') {
      return (
        <>
          <AppButtonLite
            style={{ ...buttonStyles, width: '10vw' }}
            onClick={() => props.viewCourse(props.itemId)}
            variant="contained"
            color="primary"
            className={classes.editMode_buttons_beforeModerated}
          >
            Посмотреть курс
          </AppButtonLite>
          <AppButtonLite
            style={{ ...buttonStyles, width: '10vw' }}
            onClick={handleClickOpenDelete}
            variant="contained"
            color="primary"
            className={classes.editMode_buttons_beforeModerated}
          >
            Удалить
          </AppButtonLite>
          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>{'Удаление курса'}</DialogTitle>
            <DialogContent>
              <DialogContentText style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Вы действительно хотите удалить курс?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <AppButtonLite style={buttonStyles} onClick={deleteClickHandler} variant="contained" color="primary">
                Да
              </AppButtonLite>
              <AppButtonLite
                style={buttonStyles}
                onClick={handleCloseDelete}
                variant="contained"
                color="primary"
                autoFocus
              >
                Нет
              </AppButtonLite>
            </DialogActions>
          </Dialog>
        </>
      )
    } else if (props.moderated === 'cancaled') {
      return before_moderatedANDcanceled
    }
  }

  const setNormalModeratedNames = () => {
    if (props.moderated === 'before-moderated') {
      return 'Перед модерацией'
    } else if (props.moderated === 'post-moderated') {
      return 'После модерации'
    } else if (props.moderated === 'cancaled') {
      return 'Отклонён'
    } else if (props.moderated === 'moderated') {
      return 'На модераци'
    } else {
      return props.moderated
    }
  }

  const RenderEditCourse = (): JSX.Element => {
    if (!props.isEditCourse) {
      return (
        <NavLink to={`/about_course/${props.itemId}`} onClick={() => props.onCourseClickHandler()}>
          <div className={classes.Quiz_item}>
            <img src={props.avatar} alt="" />
            <h6> {props.courseName}</h6>
          </div>
        </NavLink>
      )
    } else {
      return (
        <div className={classes.editMode}>
          <div className={classes.editMode_moderate}>
            <p>{setNormalModeratedNames()}</p>
          </div>
          <div className={classes.editMode_buttons}>{RenderButtons()}</div>
          <img src={`http://127.0.0.1:5000/${props.avatar}`} alt="" />
          <h6> {props.courseName}</h6>
        </div>
      )
    }
  }

  return (
    <div className={classes.Course}>
      <RenderEditCourse />
      <div className={classes.Cours_createCourseComponent}>
        <Dialog
          open={isOpenComponent}
          onClose={onOpentComp}
          scroll="body"
          PaperProps={{
            style: { backgroundColor: '#0d0d28', borderRadius: '10px', maxWidth: '74vw' },
          }}
        >
          <CreateCourse
            isEditMod={true}
            setImage={`http://127.0.0.1:5000/${props.avatar}`}
            courseName={props.courseName}
            scope={props.scope}
            setNewViewData={setNewViewDataHandler}
            closeDialog={onOpentComp}
            about={props.about}
            exp_before={props.exp_before}
            exp_after={props.exp_after}
          />
        </Dialog>
      </div>
    </div>
  )
}

export default withRouter(Course)
