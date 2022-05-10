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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
import logoPic from '../public/logo.png'

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    white: '#fff',
    primary: {
      main: '#1976d2',
    },
  },
});

class ResponsiveAppBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stencils: [],
      components: [],
      componentsData:{},
      componentBaseUrl: "",
      view: "list",
      infoIconDisabled: true,
      viewDisabled: true,
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
            this.setState( {
              view: "canvas",
              viewDisabled: false,
              infoIconDisabled: false,
              components: out.components,
              componentsData: out.components_data}
            );
          }
          else{
            this.setState( {
              view: "list",
              viewDisabled: true,
              infoIconDisabled: false,
              components: out.components,
              componentsData: null}
            );
          }

        });
    }
    else{
      console.log("unset components")
      this.setState( {
        stencilMetaName: "",
        stencilMetaDescription: "",
        stencilMetaHomePage: "",
        stencilMetaLicenseUrl: "",
        stencilMetaAuthor: "",
        infoIconDisabled: true,
        components: [],
        view: "list",
        viewDisabled: true,
        componentsData: null}
      );
    }

  }

  handleChangeView(view){
    this.setState({view:view})
  }

  renderComponent(component){
    return (
      <Grid item xs={2} sm={4} md={4} key={component}  style={{border:"1px solid green", marginLeft:"-1px", marginTop:"-1px"}}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <ComponentImgStyle src={this.state.componentBaseUrl + "/" + component} />
        </Box>
      </Grid>
    )
  }

  render(){

    const {components} = this.state;
    const comps = components.map((component)=>{ return this.renderComponent(component)})

    return (
      <ThemeProvider theme={lightTheme}>
        <AppBar position="static" color="white" position="sticky">
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
                  style={{ minWidth: "300px" }}
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
                  activeOption={this.state.view}
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

              <Box mx={1} sx={{ flexGrow: 0 }}>
                <img src={logoPic.src} alt="Logo SVG Stencils" width="200" />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="xl" >
          <Grid container my={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            {comps}
          </Grid>
        </Container>

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
            <DialogContentText id="alert-dialog-description">
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
              <Typography variant="body1" gutterTop component="div" px={1}>
                {this.state.stencilMetaDescription}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autofocus onClick={()=>{this.setState({infoOpen:false})}}>Close</Button>
          </DialogActions>
        </Dialog>

      </ThemeProvider>
    );
  }
};
export default ResponsiveAppBar;
