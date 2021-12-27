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
import cookie from "react-cookies";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://baicao.zjuers.com:6636"


export default function ControlledOpenSpeedDial(props) {
  const id = props.id;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function addFavor() {
    let data = {
      Email: cookie.load("account"),
      Id: id,
    };
    let res = await axios.post(`${server}/addfavor/`, data);
    if (res.data === "收藏成功") {
      alert("收藏成功");
    } else {
      alert("您已收藏");
    }
  }
  const clStar = () =>{
    if (cookie.load("account")) {
      addFavor();
    } else {
      alert("请先登录！");
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