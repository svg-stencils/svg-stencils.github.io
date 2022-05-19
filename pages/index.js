import * as React                             from 'react';
import Typography                             from '@mui/material/Typography';
import Menu                                   from '@mui/material/Menu';
import MenuIcon                               from '@mui/icons-material/Menu';
import Container                              from '@mui/material/Container';
import Avatar                                 from '@mui/material/Avatar';
import Button                                 from '@mui/material/Button';
import Tooltip                                from '@mui/material/Tooltip';
import MenuItem                               from '@mui/material/MenuItem';
import AdbIcon                                from '@mui/icons-material/Adb';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import ViewListIcon                           from '@mui/icons-material/ViewList';
import ViewModuleIcon                         from '@mui/icons-material/ViewModule';
import ViewQuiltIcon                          from '@mui/icons-material/ViewQuilt';
import ToggleButton                           from '@mui/material/ToggleButton';
import ToggleButtonGroup                      from '@mui/material/ToggleButtonGroup';

import Checkbox                               from '@mui/material/Checkbox';
import Grid                                   from '@mui/material/Grid';
import TextField                              from '@mui/material/TextField';
import Autocomplete                           from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon               from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon                           from '@mui/icons-material/CheckBox';
import InfoIcon                               from '@mui/icons-material/Info';

import IconButton                             from '@mui/material/IconButton';
import AppBar                                 from '@mui/material/AppBar';
import Box                                    from '@mui/material/Box';
import Toolbar                                from '@mui/material/Toolbar';

import HeaderAppBar                           from '../app/components/HeaderAppBar'
import DialogStencilInfo                      from '../app/components/DialogStencilInfo'
import DialogQuickStart                       from '../app/components/DialogQuickStart'
import Footer                                 from '../app/components/Footer'

import Stack                                  from '@mui/material/Stack';
import Slider                                 from '@mui/material/Slider';
import ZoomOutIcon                            from '@mui/icons-material/ZoomOut';
import ZoomInIcon                             from '@mui/icons-material/ZoomIn';

import Switch                                 from '@mui/material/Switch';
import FormControlLabel                       from '@mui/material/FormControlLabel';
import HttpIcon                               from '@mui/icons-material/Http';
import InputAdornment                         from '@mui/material/InputAdornment';
import { withRouter }                         from "next/router"

import Backdrop                               from '@mui/material/Backdrop';
import CircularProgress                       from '@mui/material/CircularProgress';


import logoPic                                from '../public/images/logo.png'

const ComponentImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'scale-down',
  position: 'absolute',
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
      urlField: false,
      urlFieldValue: "",
      contextMenu: null,
      backdropOpen: false

    };
  }

  componentDidMount() {

    fetch('/stencils.json' ,{
    })
      .then(function(response){
        return response.json();
      })
      .then((stencils)=> {
        this.setState({stencils: stencils});
      });
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props.router
    // verify props have changed to avoid an infinite loop
    if (query.stencil && query.stencil !== prevProps.router.query.stencil) {
      this.setState({urlField: true, urlFieldValue: query.stencil},()=>{
        this.selectStencil({url:this.state.urlFieldValue});
      });
    }
  }

  clearStencil(){
    this.setState( {
      componentBaseUrl: "",
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

  selectStencil(value){
    if(value){

      this.setState({backdropOpen:true});

      fetch(value.url + "/stencil-meta.json" ,{
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
        })
        .catch((error) => {
          console.error('Error:', error);
          this.setState({backdropOpen:false});
        });


      fetch(value.url + "/stencil-components.json" ,{
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
              componentBaseUrl: value.url,
              view: "canvas",
              viewDisabled: false,
              zoomHidden: false,
              infoIconDisabled: false,
              components: out.components,
              componentsData: out.components_data},
              ()=>{
                this.setState({backdropOpen:false})
              }
            );
          }
          else{
            this.setState( {
              componentBaseUrl: value.url,
              view: "list",
              viewDisabled: true,
              zoomHidden:true,
              infoIconDisabled: false,
              components: out.components,
              componentsData: null},
              ()=>{
                this.setState({backdropOpen:false})
              }
            );
          }

        })
        .catch((error) => {
          this.setState({backdropOpen:false});
          console.error('Error:', error);
        });
    }
    else{
      this.clearStencil();
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

  showComponentMenu(event, component){
    event.preventDefault();

    if(this.state.contextMenu === null){
      this.setState({contextMenu: { component: component, mouseX: event.clientX + 2, mouseY: event.clientY - 6 }});
    }
    else{
      this.setState({contextMenu: null});
    }
  }

  copySvgFileToClipboard(){
    if(this.state.contextMenu !== null){

      /*
      const a = document.createElement('a');
      a.href = this.state.componentBaseUrl + "/" + this.state.contextMenu.component;
      a.setAttribute(
        'download',
        'file.svg',
      );
      //a.download = this.state.contextMenu.component;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again
      */

      fetch(this.state.componentBaseUrl + "/" + this.state.contextMenu.component)
        .then(r => r.text())
        .then(text => {
          navigator.clipboard.writeText(text)
        })
        .catch(console.error.bind(console));

      this.setState({contextMenu: null});
    }
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
          <Box onContextMenu={(e)=>{
            this.showComponentMenu(e, component);

          }} position='absolute' top={top+"px"} left={left+"px"} key={component} sx={{
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
        <Box
          onContextMenu={(e)=>{ this.showComponentMenu(e, component);}}
          sx={{
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

  handleUrlFieldChange(value){
    this.clearStencil();
    this.setState({urlFieldValue: value},()=>{
      this.selectStencil({url:this.state.urlFieldValue});
    })
  }

  renderStencilSelection(){
    if(this.state.urlField === false){
      return (
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
      )
    }
    else{
      return (
        <TextField label="Stencil URL" placeholder="Enter Stencil URL" size="small"
          value={this.state.urlFieldValue}
          onChange={(e)=>{this.handleUrlFieldChange(e)}}
          style={{ minWidth: "250px" }}
          variant="standard"
        />
      )
    }
  }

  render(){

    return (
      <ThemeProvider theme={lightTheme}>

        <HeaderAppBar
          infoIconDisabled={this.state.infoIconDisabled}
          onClickStencilInfo={()=>this.setState({infoOpen: true})}

          stencils={this.state.stencils}
          onSelectStencil={(stencil)=>this.selectStencil(stencil)}

          urlField={this.state.urlField}
          urlFieldValue={this.state.urlFieldValue}
          onUrlFieldValueChange={(value)=>{this.handleUrlFieldChange(value)}}

          view={this.state.view}
          viewDisabled={this.state.viewDisabled}
          onChangeView={(view)=>this.handleChangeView(view)}

          zoomHidden={this.state.zoomHidden}
          zoomValue={this.state.zoomValue}
          onZoomIn={()=>{
            if(this.state.zoomValue >= 95){
              this.setState({zoomValue: 100})
            }
            else{
              this.setState({zoomValue: this.state.zoomValue + 5})
            }
          }}
          onZoomOut={()=>{
            if(this.state.zoomValue <= 5){
              this.setState({zoomValue: 0})
            }
            else{
              this.setState({zoomValue: this.state.zoomValue - 5})
            }
          }}
          onZoomSlide={(val)=>{
            this.setState({zoomValue:val});
          }}

        />

        {(this.state.view === 'list' ? this.renderComponentsList():this.renderComponentsCanvas())}

        <Menu
          open={this.state.contextMenu !== null}
          onClose={()=>{this.setState({contextMenu:null})}}
          anchorReference="anchorPosition"
          anchorPosition={
            this.state.contextMenu !== null
              ? { top: this.state.contextMenu.mouseY, left: this.state.contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={()=>{this.copySvgFileToClipboard()}}>Copy SVG</MenuItem>
        </Menu>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={this.state.backdropOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <DialogStencilInfo
          open={this.state.infoOpen}
          onClose={()=>{this.setState({infoOpen:false})}}
          title={this.state.stencilMetaName}
          author={this.state.stencilMetaAuthor}
          homepage={this.state.stencilMetaHomePage}
          licenceUrl={this.state.stencilMetaLicenseUrl}
          description={this.state.stencilMetaDescription}
        />

        <DialogQuickStart
          open={this.state.quickStartOpen}
          onClose={()=>{this.setState({quickStartOpen:false})}}
        />

        <Footer
          onClick={()=>{
            this.setState({quickStartOpen: true});
          }}
        />

      </ThemeProvider>
    );
  }
};
export default withRouter(ResponsiveAppBar);
