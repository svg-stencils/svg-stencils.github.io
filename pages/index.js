import * as React                             from 'react';

import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

import Menu                                   from '@mui/material/Menu';
import MenuIcon                               from '@mui/icons-material/Menu';
import MenuItem                               from '@mui/material/MenuItem';

import Backdrop                               from '@mui/material/Backdrop';
import CircularProgress                       from '@mui/material/CircularProgress';

import Container                              from '@mui/material/Container';
import Grid                                   from '@mui/material/Grid';
import Box                                    from '@mui/material/Box';

import HeaderAppBar                           from '../app/components/HeaderAppBar'
import StencilToolbar                         from '../app/components/StencilToolbar'
import DialogStencilInfo                      from '../app/components/DialogStencilInfo'
import DialogQuickStart                       from '../app/components/DialogQuickStart'
import DialogError                            from '../app/components/DialogError'
import Footer                                 from '../app/components/Footer'

import { withRouter }                         from "next/router"


const ComponentImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'scale-down',
  position: 'absolute',
});

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
      selectedStencilValue: "",
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
      contextMenu: null,
      shareStencilMenu: null,
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

      if(query.stencil.startsWith("http://") || query.stencil.startsWith("https://")){
        this.setState({selectedStencilValue: {name: query.stencil, url: query.stencil }});
        this.selectStencil({url:query.stencil});
      }
      else{

        const searchStencil= this.state.stencils.find((stencil) => stencil.name === query.stencil);
        if(searchStencil){
          this.setState({selectedStencilValue: {name: searchStencil.name, url: searchStencil.url }});
          this.selectStencil({url:searchStencil.url});
        }
        else{
          const errorText = `A stencil with the name ${query.stencil} is not in our Library. Please check for typo's`;
          this.setState({errorOpen: true, errorTitle: `Sorry, can't find stencil ${query.stencil}`, errorText: errorText })
        }
      }
    }
  }

  clearStencil(){
    this.setState( {
      componentBaseUrl: "",
      selectedStencilValue: "",
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
          //TODO START REMOVE DUPLICATE CODE
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
          //TODO END REMOVE DUPLICATE CODE

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

  showShareStencilMenu(event){
    if(this.state.shareStencilMenu === null){
      this.setState({shareStencilMenu: { mouseX: event.clientX + 2, mouseY: event.clientY - 6 }});
    }
    else{
      this.setState({shareStencilMenu: null});
    }
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

    const canvasDefaultWidth = 5000;
    const factor = canvasDefaultWidth / this.state.mostRight * this.state.zoomValue / 100;
    //const factor = 1

    const comps = components.map((component)=>{

      if(componentsData && componentsData[component]){
        const cdata = componentsData[component];

        const top = cdata.top * factor
        const left = cdata.left * factor

        let width = (cdata.right - cdata.left) * factor
        //console.log(width)
        //console.log(factor)

        let img = new Image();
        img.onload = function() {
          //console.log("---------------------------")
          //console.log("Calc Image Width: ", width)
          //console.log("Real Image Width: ", (this.width * factor))
        };
        img.src = this.state.componentBaseUrl + "/" + component

        let cssWidth;
        if(width === 0){
          cssWidth = (100*factor)+"%";
        }
        else{
          cssWidth = width + "px";
        }

        if(cdata.type && cdata.type === "locked"){
          //console.log("LOCKED")
          //console.log(cdata)

          return (
            <Box onContextMenu={(e)=>{
              this.showComponentMenu(e, component);

            }} position='absolute' top={top+"px"} left={left+"px"} key={component} sx={{
              padding: '0px',
            }}>
              <img onDragStart={(e)=>{e.preventDefault()}} src={this.state.componentBaseUrl + "/" + component}
                style={{width:cssWidth}}
              />
            </Box>
          )
        }
        else{

          //cssWidth = (100*factor)+"%";
          return (
            <Box onContextMenu={(e)=>{
              this.showComponentMenu(e, component);
              }}
              position='absolute' top={top+"px"} left={left+"px"} key={component}
              sx={{
                Left: 80,
                cursor: 'grab',
                padding: '2px',
                '&:hover': {
                  border: 'solid 2px green',
                  padding: '0',
                },
              }}>

              <img src={this.state.componentBaseUrl + "/" + component} style={{width:cssWidth}} />

            </Box>
          )

        }


      }
      return null

    })

    return (
      <Box sx={{
        position:'relative',
        marginLeft: 10,
        marginTop: 10,

        }}>
          {comps}
        </Box>
    )

  }

  renderComponentsList(){

    const {components, componentsData} = this.state;
    let cdata;
    const comps = components.map((component)=>{
      if(componentsData && componentsData[component]){
        cdata = componentsData[component];
      }
      if(cdata && cdata.type && cdata.type === "locked"){
        return null;
      }
      else{
        return (
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
        )
      }
    })

    return (
      <Container maxWidth="xl" sx={{
        position:'relative',
        marginLeft: 10,
        marginTop: 10,
        paddingLeft: 84
      }}>
        <Grid container my={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {comps}
        </Grid>
      </Container>
    )
  }

  render(){

    return (
      <ThemeProvider theme={lightTheme}>

        <HeaderAppBar

          infoIconDisabled={this.state.infoIconDisabled}
          onClickStencilInfo={()=>this.setState({infoOpen: true})}
          onClickShareStencilMenu={ (e) => { this.showShareStencilMenu(e) }}

          selectedStencilValue={this.state.selectedStencilValue}
          stencils={this.state.stencils}
          onSelectStencil={(stencil)=>{
            this.setState({selectedStencilValue: stencil});
            this.selectStencil(stencil)}
          }


        />

        <StencilToolbar
          infoIconDisabled={this.state.infoIconDisabled}

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

        <Menu
          open={this.state.shareStencilMenu !== null}
          onClose={()=>{this.setState({shareStencilMenu:null})}}
          anchorReference="anchorPosition"
          anchorPosition={
            this.state.shareStencilMenu !== null
              ? { top: this.state.shareStencilMenu.mouseY, left: this.state.shareStencilMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={()=>{
            const shareURL = "https://svg-stencils.github.io/?stencil="+this.state.selectedStencilValue.name;
            navigator.clipboard.writeText(shareURL)
            this.setState({shareStencilMenu: null});
          }}>Copy Link</MenuItem>
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
          licenseUrl={this.state.stencilMetaLicenseUrl}
          description={this.state.stencilMetaDescription}
        />

        <DialogQuickStart
          open={this.state.quickStartOpen}
          onClose={()=>{this.setState({quickStartOpen:false})}}
        />
        <DialogError
          open={this.state.errorOpen}
          onClose={()=>{this.setState({errorOpen:false})}}
          title={this.state.errorTitle}
          text={this.state.errorText}
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
