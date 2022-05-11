import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import InfoIcon from '@mui/icons-material/Info';
import GitHubIcon from '@mui/icons-material/GitHub';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const ComponentImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'scale-down',
  position: 'absolute',
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

//import Image from 'next/image'
import logoPic from '../public/images/logo.png'

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    white: '#fff',
    whiteTrans: 'rgba(255,255,255,0.3)',
    hover: 'rgba(76, 203, 76, 0.3)',
    primary: {
      main: '#1976d2',
    },
  },
});

class ResponsiveAppBar extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      stencils: [],
      components: [],
      componentsData:{},
      componentBaseUrl: "",
      mostRight:0,
      zoomValue: 30,
      zoomHidden: true,
      view: "list",
      infoIconDisabled: true,
      viewDisabled: true,
      infoOpen: false,
      quickStartOpen: false,
      stencilMetaName: "",
      stencilMetaDescription: "",
      stencilMetaHomePage: "",
      stencilMetaLicenseUrl: "",
      stencilMetaAuthor: "",

    };
  }

  componentDidMount() {
    fetch('/stencils.json' ,{
      headers : {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      }
    })
      .then(function(response){
        return response.json();
      })
      .then((stencils)=> {
        this.setState({stencils: stencils});
      });


  }

  selectStencil(value){
    if(value){

      this.setState({componentBaseUrl: value.url})

      fetch(value.url + "/stencil-meta.json" ,{
        mode: 'cors',
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(function(response){
          return response.json();
        })
        .then((meta)=> {
          this.setState({
            stencilMetaName: meta.name,
            stencilMetaDescription: meta.description,
            stencilMetaHomePage: meta.homepage,
            stencilMetaLicenseUrl: meta.license,
            stencilMetaAuthor: meta.author,
          });
        });


      fetch(value.url + "/stencil-components.json" ,{
        mode: 'cors',
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(function(response){
          return response.json();
        })
        .then((out)=> {
          if(out.components_data){

            let mostRight = 0;
            let ctr = 0;
            out.components.forEach((element, index, array)=>{
                ctr++;
                if(out.components_data[element].right > mostRight) mostRight = out.components_data[element].right

                if (ctr === array.length) {
                  this.setState({mostRight:mostRight})
                }
              });

            this.setState( {
              view: "canvas",
              viewDisabled: false,
              zoomHidden: false,
              infoIconDisabled: false,
              components: out.components,
              componentsData: out.components_data}
            );
          }
          else{
            this.setState( {
              view: "list",
              viewDisabled: true,
              zoomHidden:true,
              infoIconDisabled: false,
              components: out.components,
              componentsData: null}
            );
          }

        });
    }
    else{
      this.setState( {
        stencilMetaName: "",
        stencilMetaDescription: "",
        stencilMetaHomePage: "",
        stencilMetaLicenseUrl: "",
        stencilMetaAuthor: "",
        infoIconDisabled: true,
        components: [],
        view: "list",
        zoomHidden:true,
        viewDisabled: true,
        componentsData: null}
      );
    }

  }

  handleChangeView(view){
    let zoomHidden = false;

    if(view === 'list'){
      zoomHidden = true;
    }

    this.setState({
      view: view,
      zoomHidden:zoomHidden
    })
  }

  renderComponentsCanvas(){
    const {components, componentsData} = this.state;

    const canvasDefaultWidth = 3000;
    const factor = canvasDefaultWidth / this.state.mostRight * this.state.zoomValue / 100;

    const comps = components.map((component)=>{

      if(componentsData[component]){
        const cd = componentsData[component];
        const top = cd.top * factor
        const left = cd.left * factor
        const width = (cd.right - cd.left) * factor



        return (
          <Box position='absolute' top={top+"px"} left={left+"px"} key={component} sx={{
            cursor: 'grab',
            padding: '2px',
            '&:hover': {
              border: 'solid 2px green',
              padding: '0',
            },
          }}>
            <img src={this.state.componentBaseUrl + "/" + component} style={{width:width+"px"}} />
          </Box>
        )

      }
      return null

    })

    return (
      <Container maxWidth="xl" >
        <Box my={2} position="relative">
          {comps}
        </Box>
      </Container>
    )

  }
  renderComponentsList(){

    const {components} = this.state;
    const comps = components.map((component)=>{ return (
      <Grid item xs={2} sm={4} md={4} key={component}  style={{border:"1px solid green", marginLeft:"-1px", marginTop:"-1px"}}>
        <Box sx={{
          cursor: 'grab',
          pt: '100%',
          position: 'relative',
          '&:hover': {
            backgroundColor: 'hover',
          },
        }}>
          <ComponentImgStyle src={this.state.componentBaseUrl + "/" + component} />
        </Box>
      </Grid>
    )})

    return (
      <Container maxWidth="xl">
        <Grid container my={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {comps}
        </Grid>
      </Container>
    )
  }

  render(){

    return (
      <ThemeProvider theme={lightTheme}>
        <AppBar position="static" color="white" position="sticky" style={{minWidth:"850px"}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters={true}>
              <Box mx={1} sx={{ flexGrow: 1, display: 'flex'  }} bgColor="#fff">

                <Autocomplete
                  multiple={false}
                  id="checkboxes-tags-demo"
                  options={this.state.stencils}
                  disableCloseOnSelect={false}
                  size="small"
                  onChange={(event, value)=>{
                    this.selectStencil(value);
                  }}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      {/*
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      */}
                      {option.name}
                    </li>
                  )}
                  style={{ minWidth: "250px" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Stencil" placeholder="Select stencils to work with" />
                  )}
                />

                <IconButton onClick={()=>this.setState({infoOpen: true})} aria-label="info" disabled={this.state.infoIconDisabled} color="primary">
                  <InfoIcon />
                </IconButton>

              </Box>

              <Box mx={1} sx={{ flexGrow: 1, display: 'flex'  }} bgColor="#fff">
                <ToggleButtonGroup
                  disabled={this.state.viewDisabled}
                  value={this.state.view}
                  exclusive
                  size="small"
                  onChange={(e,view)=>this.handleChangeView(view)}
                >
                  <ToggleButton value="list" aria-label="list">
                    <ViewModuleIcon />
                  </ToggleButton>
                  <ToggleButton value="canvas" aria-label="canvas">
                    <ViewQuiltIcon />
                  </ToggleButton>
                </ToggleButtonGroup>

              </Box>

              {(this.state.zoomHidden === true ? null :
              <Box mx={1} sx={{ flexGrow: 1, display: 'flex'  }} bgColor="#fff">
                <Box sx={{ width: 150 }}>
                  <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <ZoomOutIcon />
                    <Slider aria-label="Volume" value={this.state.zoomValue} onChange={(e, val)=>{
                      this.setState({zoomValue:val});
                    }} />
                    <ZoomInIcon />
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

        {(this.state.view === 'list' ? this.renderComponentsList():this.renderComponentsCanvas())}

        <Dialog
          open={this.state.infoOpen}
          onClose={()=>{this.setState({infoOpen:false})}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.state.stencilMetaName}
          </DialogTitle>
          <DialogContent>
            <Typography variant="subtitle2" gutterBottom component="div" px={1}>
              author: {this.state.stencilMetaAuthor}
            </Typography>
            <Button onClick={()=>{
              window.open(this.state.stencilMetaHomePage, '_blank').focus();
            }}>
              Homepage
            </Button>
            <Button onClick={()=>{
              window.open(this.state.stencilMetaLicenseUrl, '_blank').focus();
            }}>
              License
            </Button>
            <Typography variant="body1" component="div" px={1}>
              {this.state.stencilMetaDescription}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{this.setState({infoOpen:false})}}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.quickStartOpen}
          onClose={()=>{this.setState({quickStartOpen:false})}}
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

                <source src="https://user-images.githubusercontent.com/658612/160613837-4df9c606-9970-4608-9b86-e0069fb5ca66.mp4" type="video/mp4" />

                Sorry, your browser doesn't support embedded videos.
              </video>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{this.setState({quickStartOpen:false})}}>Close</Button>
          </DialogActions>
        </Dialog>


        <AppBar position="fixed" color="white" sx={{ top: 'auto', bottom: "0" }} style={{minWidth:"850px"}}>
          <Toolbar variant="dense">
            <Button onClick={()=>{
              this.setState({quickStartOpen: true});
            }}>
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

      </ThemeProvider>
    );
  }
};
export default ResponsiveAppBar;
