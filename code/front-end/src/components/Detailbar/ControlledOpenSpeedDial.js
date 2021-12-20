import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import StarIcon from '@mui/icons-material/Star';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Feedback from '@mui/icons-material/Feedback';
import {theme} from "../../style";
import {ThemeProvider} from "@emotion/react";

export default function ControlledOpenSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clStar = () =>{
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    }
    else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
    } 
    else if (document.all) {
        try{
            window.external.addFavorite(url, title);
        }catch(e){
            alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }
    }
    else if (window.sidebar) {
        window.sidebar.addPanel(title, url);
    } 
    else { 
       alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
  }

  const clFeedback = () =>{
    window.open("mailto:1223752784@qq.com"); 
}


  const clPrint = () =>{
    window.document.body.innerHTML = window.document.getElementById('detailinfomain').innerHTML;  
    window.print(); 
    window.location.reload();
  }

  const clShare = () =>{
    var sinaurl='https://service.weibo.com/share/share.php?url='+window.location+'&title=【百草笺——中药搜索引擎】这是好友分享给你的来自的神秘药材，快来看看吧！';
    window.open(sinaurl); 
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
              key={'反馈问题'}
              icon={<Feedback />}
              tooltipTitle={'反馈问题'}
              onClick={clFeedback}
            />
            <SpeedDialAction
              key={'打印'}
              icon={<PrintIcon />}
              tooltipTitle={'打印'}
              onClick={clPrint}
            />
            <SpeedDialAction
              key={'微博分享'}
              icon={<ShareIcon />}
              tooltipTitle={'微博分享'}
              onClick={clShare}
            />
        </SpeedDial>
      </ThemeProvider>
    </Box>
  );
}