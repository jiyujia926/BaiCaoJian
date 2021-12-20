import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import StarIcon from '@mui/icons-material/Star';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import {theme} from "../../style";
import {ThemeProvider} from "@emotion/react";

export default function ControlledOpenSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clStar = () =>{
    alert('收藏功能');
  }

  const clSave = () =>{
    alert('保存功能');
  }

  const clPrint = () =>{
    window.document.body.innerHTML = window.document.getElementById('detailinfomain').innerHTML;  
    window.print(); 
    window.location.reload();
  }

  const clShare = () =>{
    alert('分享功能');
  }

  return (
    <Box sx={{ height: 300, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
      {/*<div id={'detailinfomain'}>123</div>*/}
        <SpeedDial
          ariaLabel="SpeedDial uncontrolled open example"
          sx={{ position: 'absolute', bottom: 2, right: 15}}
          icon={<SpeedDialIcon/>}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
            <SpeedDialAction
              key={'收藏'}
              icon={<StarIcon />}
              tooltipTitle={'收藏'}
              onClick={clStar}
            />
            <SpeedDialAction
              key={'保存页面'}
              icon={<SaveIcon />}
              tooltipTitle={'保存页面'}
              onClick={clSave}
            />
            <SpeedDialAction
              key={'打印'}
              icon={<PrintIcon />}
              tooltipTitle={'打印'}
              onClick={clPrint}
            />
            <SpeedDialAction
              key={'分享'}
              icon={<ShareIcon />}
              tooltipTitle={'分享'}
              onClick={clShare}
            />
        </SpeedDial>
      </ThemeProvider>
    </Box>
  );
}