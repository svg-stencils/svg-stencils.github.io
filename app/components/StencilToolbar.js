import * as React                            from 'react';
import logoPic                               from '../../public/images/logo.png'
import Slider                                from '@mui/material/Slider';
import ZoomOutIcon                           from '@mui/icons-material/ZoomOut';
import ZoomInIcon                            from '@mui/icons-material/ZoomIn';
import Stack                                 from '@mui/material/Stack';
import ViewQuiltIcon                         from '@mui/icons-material/ViewQuilt';
import ViewModuleIcon                        from '@mui/icons-material/ViewModule';
import ToggleButton                          from '@mui/material/ToggleButton';
import ToggleButtonGroup                     from '@mui/material/ToggleButtonGroup';
import InfoIcon                              from '@mui/icons-material/Info';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField                             from '@mui/material/TextField';
import Container                             from '@mui/material/Container';
import Button                                from '@mui/material/Button';
import IconButton                            from '@mui/material/IconButton';
import AppBar                                from '@mui/material/AppBar';
import Box                                   from '@mui/material/Box';
import Toolbar                               from '@mui/material/Toolbar';
import GitHubIcon                            from '@mui/icons-material/GitHub';
import ShareIcon                             from '@mui/icons-material/Share';
import Paper                                 from '@mui/material/Paper';


class StencilToolbar extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){

    if(this.props.infoIconDisabled){
      return null;
    }
    else{

      return (
        <Box
          sx={{
            position: 'fixed',
            left: 1,
            right: "auto",
            '& > :not(style)': {
              m: 1,
            },
          }}
        >
          <Paper elevation={3}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              m:1,
              p:1,
            }}
          >
            <ToggleButtonGroup
              orientation="vertical"
              disabled={this.props.viewDisabled}
              value={this.props.view}
              exclusive
              size="small"
              onChange={(e,view)=>this.props.onChangeView(view)}
              sx={{ mb: 2, mt:1 }}
            >
              <ToggleButton value="list" aria-label="list">
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton value="canvas" aria-label="canvas">
                <ViewQuiltIcon />
              </ToggleButton>
            </ToggleButtonGroup>


            {(this.props.zoomHidden === true ? null :
            <Box mx={1} sx={{ xheight: 150, flexGrow: 1, flexDirection: 'column',  display: 'flex'  }} bgColor="#fff">

              <Stack spacing={1} direction="column" sx={{ mb: 1 }} alignItems="center">
                <ZoomInIcon onClick={()=>this.props.onZoomIn()}/>

                <Box sx={{height: 75}}>
                  <Slider aria-label="Volume" orientation="vertical" value={this.props.zoomValue} onChange={(e, val)=>{
                    this.props.onZoomSlide(val);
                  }} />
                </Box>

                <ZoomOutIcon onClick={()=>this.props.onZoomOut()}/>
              </Stack>

            </Box>
            )}


          </Paper>
        </Box>
      )
    }
  }
}
export default StencilToolbar;
