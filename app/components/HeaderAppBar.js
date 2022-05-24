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
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField                              from '@mui/material/TextField';
import Container                              from '@mui/material/Container';
import Button     from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AppBar     from '@mui/material/AppBar';
import Box        from '@mui/material/Box';
import Toolbar    from '@mui/material/Toolbar';
import GitHubIcon from '@mui/icons-material/GitHub';
import ShareIcon from '@mui/icons-material/Share';
const filter = createFilterOptions();

const getValidUrl = (url = "") => {
  let newUrl = url.trim().replace(/\s/g, "");

  if(newUrl.startsWith("http://") || newUrl.startsWith("https://")){
    return newUrl
  }

  return null;
}

class HeaderAppBar extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      inputValue: ""
    }

  }

  renderStencilSelection(){

    return (
      <Autocomplete
        value={this.props.selectedStencilValue}
        multiple={false}
        id="checkboxes-tags-demo"
        options={this.props.stencils}
        disableCloseOnSelect={false}
        size="small"
        onChange={(event, value)=>{
          this.props.onSelectStencil(value);
        }}

        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          const isExisting = options.some((option) => inputValue === option.title);
          const urlValue = getValidUrl(inputValue);

          if (inputValue !== '' && !isExisting && urlValue) {
            filtered.push({
              inputValue,
              url: `${inputValue}`,
              name: `${inputValue}`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys

        inputValue={this.state.inputValue}
        onInputChange={(event, newInputValue) => {
          this.setState({inputValue: newInputValue});
        }}

        getOptionLabel={(option) => {

          if(option.name) return option.name;
          return ""

        }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            {option.name}
          </li>
        )}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label={(getValidUrl(this.props.selectedStencilValue.name)?"Stencil URL":"Stencil")} placeholder="Select or enter stencil URL" />
        )}
      />
    )
  }

  render(){
    return (
      <AppBar position="fixed" color="white"  style={{minWidth:"850px"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters={true}>

            <Box mx={1} sx={{ flexGrow: 1, display: 'flex'  }} bgColor="#fff">

              {this.renderStencilSelection()}

              <IconButton onClick={()=>this.props.onClickStencilInfo()} aria-label="info" disabled={this.props.infoIconDisabled} color="primary">
                <InfoIcon />
              </IconButton>

              <IconButton onClick={(e)=>this.props.onClickShareStencilMenu(e)} aria-label="info" disabled={this.props.infoIconDisabled} color="primary">
                <ShareIcon />
              </IconButton>

            </Box>


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
