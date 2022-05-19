import * as React from 'react';
import logoPic                                from '../../public/images/logo.png'
import Slider                                 from '@mui/material/Slider';
import ZoomOutIcon                            from '@mui/icons-material/ZoomOut';
import ZoomInIcon                             from '@mui/icons-material/ZoomIn';
import Stack                                  from '@mui/material/Stack';
import ViewQuiltIcon                          from '@mui/icons-material/ViewQuilt';
import ViewModuleIcon                         from '@mui/icons-material/ViewModule';
import ToggleButton                           from '@mui/material/ToggleButton';
import ToggleButtonGroup                      from '@mui/material/ToggleButtonGroup';
import InfoIcon                               from '@mui/icons-material/Info';
import Autocomplete                           from '@mui/material/Autocomplete';
import TextField                              from '@mui/material/TextField';
import Container                              from '@mui/material/Container';
import Button     from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AppBar     from '@mui/material/AppBar';
import Box        from '@mui/material/Box';
import Toolbar    from '@mui/material/Toolbar';
import GitHubIcon from '@mui/icons-material/GitHub';

class HeaderAppBar extends React.Component {

  renderStencilSelection(){
    if(this.props.urlField === false){
      return (
        <Autocomplete
          multiple={false}
          id="checkboxes-tags-demo"
          options={this.props.stencils}
          disableCloseOnSelect={false}
          size="small"
          onChange={(event, value)=>{
            this.props.onSelectStencil(value);
            //this.selectStencil(value);
          }}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              {option.name}
            </li>
          )}
          style={{ minWidth: "250px" }}
          renderInput={(params) => (
            <TextField {...params} label="Stencil" placeholder="Select stencils to work with" />
          )}
        />
      )
    }
    else{
      return (
        <TextField label="Stencil URL" placeholder="Enter Stencil URL" size="small"
          value={this.props.urlFieldValue}
          onChange={(e)=>{this.props.onUrlFieldValueChange(e.target.value)}}
          style={{ minWidth: "250px" }}
          variant="standard"
        />
      )

    }
  }

  render(){
    return (
      <AppBar position="static" color="white" position="sticky" style={{minWidth:"850px"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters={true}>
            <Box mx={1} sx={{ flexGrow: 1, display: 'flex'  }} bgColor="#fff">

              {/*
                <FormControlLabel
                  control={<Switch checked={this.state.urlField} color="primary" size="small" />}
                  onChange={(e,val)=>{
                    this.setState({urlField: val}, ()=>{
                      if(this.state.urlField === false){
                        this.clearStencil();
                      }

                    });
                  }}
                  label={
                    <Box component="div" fontSize={13}>
                      Use URL field
                    </Box>
                  }
                  labelPlacement="bottom"
                />
                */}

              {this.renderStencilSelection()}

              <IconButton onClick={()=>this.props.onClickStencilInfo()} aria-label="info" disabled={this.props.infoIconDisabled} color="primary">
                <InfoIcon />
              </IconButton>

            </Box>

            <Box mx={1} sx={{ flexGrow: 1, display: 'flex'  }} bgColor="#fff">
              <ToggleButtonGroup
                disabled={this.props.viewDisabled}
                value={this.props.view}
                exclusive
                size="small"
                onChange={(e,view)=>this.props.onChangeView(view)}
              >
                <ToggleButton value="list" aria-label="list">
                  <ViewModuleIcon />
                </ToggleButton>
                <ToggleButton value="canvas" aria-label="canvas">
                  <ViewQuiltIcon />
                </ToggleButton>
              </ToggleButtonGroup>

            </Box>

            {(this.props.zoomHidden === true ? null :
            <Box mx={1} sx={{ flexGrow: 1, display: 'flex'  }} bgColor="#fff">
              <Box sx={{ width: 150 }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                  <ZoomOutIcon onClick={()=>this.props.onZoomOut()}/>
                  <Slider aria-label="Volume" value={this.props.zoomValue} onChange={(e, val)=>{
                    this.props.onZoomSlide(val);
                  }} />
                  <ZoomInIcon onClick={()=>this.props.onZoomIn()}/>
                </Stack>
              </Box>
            </Box>
            )}

            <Box mx={1} sx={{ flexGrow: 0 }}>
              <img src={logoPic.src} alt="Logo SVG Stencils" width="200" />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

    )

  }
}
export default HeaderAppBar;
