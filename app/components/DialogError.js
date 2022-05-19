import * as React        from 'react';
import Button            from '@mui/material/Button';
import Dialog            from '@mui/material/Dialog';
import DialogActions     from '@mui/material/DialogActions';
import DialogContent     from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle       from '@mui/material/DialogTitle';

class DialogError extends React.Component {

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
            {this.props.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{this.props.onClose()}}>Close</Button>
          </DialogActions>
        </Dialog>

    )

  }
}
export default DialogError;
