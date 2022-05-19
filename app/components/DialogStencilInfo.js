import * as React        from 'react';
import Button            from '@mui/material/Button';
import Typography        from '@mui/material/Typography';
import Dialog            from '@mui/material/Dialog';
import DialogActions     from '@mui/material/DialogActions';
import DialogContent     from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle       from '@mui/material/DialogTitle';

class DialogStencilInfo extends React.Component {

  render(){
    return (
      <Dialog
        open={this.props.open}
        onClose={()=>{this.props.onClose()}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {this.props.title}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" gutterBottom component="div" px={1}>
            author: {this.props.author}
          </Typography>
          <Button onClick={()=>{
            window.open(this.props.Homepage, '_blank').focus();
          }}>
            Homepage
          </Button>
          <Button onClick={()=>{
            window.open(this.props.licenseUrl, '_blank').focus();
          }}>
            License
          </Button>
          <Typography variant="body1" component="div" px={1} sx={{whiteSpace: "pre-wrap"}}>
            {this.props.description.replace(/(?:\\r\\n|\\r|\\n)/g, '\n')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{this.props.onClose()}}>Close</Button>
        </DialogActions>
      </Dialog>
    )

  }
}
export default DialogStencilInfo;
