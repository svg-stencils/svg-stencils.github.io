import * as React        from 'react';
import Button            from '@mui/material/Button';
import Dialog            from '@mui/material/Dialog';
import DialogActions     from '@mui/material/DialogActions';
import DialogContent     from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle       from '@mui/material/DialogTitle';

class DialogQuickStart extends React.Component {

  render(){
    return (
        <Dialog
          open={this.props.open}
          onClose={()=>{this.props.onClose()}}
          maxWidth="lg"
          fullWidth={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Quick Start
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <video controls width="750">

                <source src="/videos/svg-stencils-quickstart.webm" type="video/webm" />

                Sorry, your browser doesn't support embedded videos.
              </video>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{this.props.onClose()}}>Close</Button>
          </DialogActions>
        </Dialog>

    )

  }
}
export default DialogQuickStart;
