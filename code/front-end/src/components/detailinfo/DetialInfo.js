import React, { useState } from "react";
import DetailStyles from "./styles";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useForm } from "react-hook-form";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://127.0.0.1:8000";

function createData(item, detialtext) {
  return {item, detialtext};
}

const rows = [
  createData('中药名', "路路通"),
  createData('别名', "枫实、枫木上球、枫香果、枫果、枫树球、狼眼、九空子、狼目、聂子。"),
  createData('英文名', "Liquidambaris Fructus"),
  createData('药用部位', "金缕梅科植物枫香Liquidambar formosana Hance.的成熟果序。"),
  createData('植物形态', "乔木，高达40米。树皮灰褐色，粗糙，有皮孔。单叶互生，叶片宽卵形，常3裂，幼枝及萌发枝的叶多为掌状5裂，上面深绿色，下面淡绿色；叶柄长3～7厘米；托叶线形，早落。花单性，雌雄同株；雄花为柔荑花序，无花被，雄蕊多数，花丝不等长；雌花为球形的头状花序，直径1.5厘米，有花23～43朵，花序梗长，萼齿5，钻形，无花瓣，子房半下位，2室，胚乳多数，花柱2，柱头弯曲。蒴果多数集生成头状球形果序，直径2.5～4.5厘米，表面有由宿存花柱及子房周围的苞片变成的刺状物，蒴果长椭圆形，下部藏于花序轴内，成熟时顶孔开裂。种子有发育不完全和发育完全两型，前者占多数，多角形，细小，黄棕色，后者长圆形而扁，具翅，褐色。花期3～4月，果期9～10月。"),
  createData('产地分布', "生于平原及丘陵地带。分布于我国华东、华南、西南等地。"),
  createData('采收加工', "冬季果实成熟后采收，除去杂质，干燥。"),
  createData('药材性状', "聚花果，由多数小蒴果集合而成，球形，直径2～3厘米。基部有总果梗。表面灰棕色或棕褐色，有多数尖刺及喙状小钝刺，长0.5~1厘米，常折断，小蒴果顶部开裂，呈蜂窝状小孔。体轻，质硬，不易破开。气微，味淡。"),
  createData('性味归经', "性平，味苦。归肝经、肾经。"),
  createData('功效与作用', "祛风活络，利水通经。属祛风湿药下属分类的祛风湿强筋骨药。"),
  createData('临床应用', "用量5～9克，煎服。用治关节痹痛、麻木拘挛、水肿胀满、乳少经闭。"),
  createData('药理研究', "抗炎；保肝。药理实验表明，路路通有明显促进大鼠“甲醛化”关节炎肿胀消退和治疗蛋清性关节炎的功效与作用。"),
  createData('化学成分', "路路通含挥发油、黄酮类、酚类、有机酸及糖类。此外，尚含齐墩果酮酸甲酯、3-表齐墩果酸甲酯、3-表齐墩果酸甲酯，挥发油中含有β-松油烯、β-蒎烯、柠檬烯、α-松油烯等成分。另含熊果酸、28-去甲齐墩果酮酸、苏合香素、齐墩果酸、氧化丁香烯、a-榄香烯、环氧苏合香素、路路通内酯等成分。"),
  createData('使用禁忌', "阴虚、月经过多及孕妇禁服。"),
];

const DetialInfo = () => {
  const classes = DetailStyles();

  return (
    <div >
      <div style={{width:'85%',margin:'0 auto'}}>
        <div style={{width:'80%',margin:'0 auto',float:'left'}}>
          <div style={{fontSize:'29px',paddingBottom:'20px',textAlign:'center'}}>路路通</div>
          <div style={{paddingBottom:'60px'}}>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400}} aria-label="simple table">
          {/*
            <TableHead>

                <TableRow>
                <TableCell width="80px">项目名</TableCell>
                <TableCell align="left">具体信息</TableCell>
              </TableRow>
            </TableHead>
              */
          }
            <TableBody> 
              {rows.map((row) => (
                <TableRow  key={row.item}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell style={{width:'80px',align:"left"}} component="th" scope="row">{row.item} </TableCell>
                  <TableCell align="left">{row.detialtext}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
          </div>
        </div>
        
        <div style={{backgroundColor:'yellow',border:'3px',width:'15%',margin:'0 auto',float:'right'}}>   侧边栏扩展功能

        </div>
      </div>  
    </div>
  );
}

export default DetialInfo;