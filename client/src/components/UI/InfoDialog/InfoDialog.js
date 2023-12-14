import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { Dialog } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import AppButtonLite from '../../AppButton/AppButtonLite'


const InfoDialog = props => {
    return (
        <div>
            <Dialog aria-labelledby="simple-dialog-title" open={true}>
                <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <AppButtonLite onClick={props.onClickOK} color="primary">
                        Ok
                    </AppButtonLite>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default InfoDialog