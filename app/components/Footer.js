import * as React from 'react';
import Button     from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AppBar     from '@mui/material/AppBar';
import Box        from '@mui/material/Box';
import Toolbar    from '@mui/material/Toolbar';
import GitHubIcon from '@mui/icons-material/GitHub';

class Footer extends React.Component {

  render(){
    return (

      <AppBar position="fixed" color="white" sx={{ top: 'auto', bottom: "0" }} style={{minWidth:"850px"}}>
        <Toolbar variant="dense">
          <Button onClick={()=>{ this.props.onClick() }}>
            Quick start movie
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={()=>{
            window.location.href = "https://github.com/svg-stencils/svg-stencils.github.io/blob/main/DOCUMENTATION.md";
          }}>
            Documentation
          </Button>

          <Button onClick={()=>{
            window.location.href = "https://github.com/svg-stencils/svg-stencils.github.io/blob/main/DOCUMENTATION.md#how-to-add-my-stencil-to-the-svg-stencils-library";
          }}>
            Add your Stencil
          </Button>

          <Button onClick={()=>{
            window.location.href = "https://inkscape.org/~mipmip/%E2%98%85svg-stencil-export";
          }}>
            Inkscape Extension
          </Button>

          <IconButton onClick={()=>{
            window.location.href = "https://github.com/svg-stencils/svg-stencils.github.io";
          }}>
            <GitHubIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

    )

  }
}
export default Footer;
