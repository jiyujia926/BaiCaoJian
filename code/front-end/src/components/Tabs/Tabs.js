import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Pagination } from '@mui/material';
import { Divider } from '@material-ui/core';
import useStyles from "./styles";
import ItemCard from '../itemList/ItemCard';
import ItemCardforBook from '../itemList/ItemCardforBook';
import ItemCardforImgs from "../itemList/ItemCardforImgs";
import ItemCardforWeb from '../itemList/ItemCardforWeb';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const { items_citiao, items_shuben, items_tupian, items_xinwen, keyword } = props;
  const classes = useStyles();
  const itemsPerPage = 10;
  const [page_citiao, setPage_citiao] = useState(1); // init page num
  const [page_shuben, setPage_shuben] = useState(1); // init page num
  const [page_tupian, setPage_tupian] = useState(1); // init page num
  const [page_xinwen, setPage_xinwen] = useState(1); // init page num
  // set default value for page(const)
  const [numOfPage_citiao, setNumOfPage_citiao] = useState(
    Math.ceil(items_citiao.length / itemsPerPage)
  );

  const [numOfPage_shuben, setNumOfPage_shuben] = useState(
    Math.ceil(items_shuben.length / itemsPerPage)
  );

  const [numOfPage_tupian, setNumOfPage_tupian] = useState(
    Math.ceil(items_tupian.length / itemsPerPage)
  );

  const [numOfPage_xinwen, setNumOfPage_xinwen] = useState(
    Math.ceil(items_xinwen.length / itemsPerPage)
  )

  const [value, setValue] = React.useState(0);

  useEffect(()=>{
    setNumOfPage_citiao(Math.ceil(items_citiao.length / itemsPerPage));
    setNumOfPage_shuben(Math.ceil(items_shuben.length / itemsPerPage));
    setNumOfPage_tupian(Math.ceil(items_tupian.length / itemsPerPage));
    setNumOfPage_xinwen(Math.ceil(items_xinwen.length / itemsPerPage));
  })
  
  
  const handleChangeCitiao = (event, value) => {
    setPage_citiao(value);
  }
  const handleChangeShuben = (event, value) => {
    setPage_shuben(value);
  }
  const handleChangeTupian = (event, value) => {
    setPage_tupian(value);
  }
  const handleChangeXinwen = (event, value) => {
    setPage_xinwen(value);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="词条" {...a11yProps(0)} />
          <Tab label="新闻" {...a11yProps(1)} />
          <Tab label="书籍" {...a11yProps(2)} />
          <Tab label="图片" {...a11yProps(3)} />
          <Tab label="网页" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          {items_citiao
          .slice((page_citiao-1) * itemsPerPage, page_citiao * itemsPerPage)
          .map(item => <ItemCard data={item} keyword={keyword}/>)
          }
        </div>
        <Divider />
          <Box component="span">
            <Pagination
            count={numOfPage_citiao}
            page={page_citiao}
            onChange={handleChangeCitiao}
            defaultPage={1}
            color="standard"
            size="large"
            showFirstButton
            showLastButton
            classes={{ ul: classes.paginator }}
            />
          </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          {items_xinwen.length == 0 ? "暂时没有内容噢" : 
            items_xinwen
            .slice((page_xinwen-1) * itemsPerPage, page_xinwen * itemsPerPage)
            .map(item => <ItemCardforWeb data={item} />)
          }
        </div>
        <Divider />
          <Box component="span">
            <Pagination
            count={numOfPage_xinwen}
            page={page_xinwen}
            onChange={handleChangeXinwen}
            defaultPage={1}
            color="standard"
            size="large"
            showFirstButton
            showLastButton
            classes={{ ul: classes.paginator }}
            />
          </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          {
            (items_shuben.length == 0) ? "暂时没有内容噢" :
              items_shuben
              .slice((page_shuben-1) * itemsPerPage, page_shuben * itemsPerPage)
              .map(item => <ItemCardforBook data={item} />)
          }
        </div>
        <Divider />
          <Box component="span">
            <Pagination
            count={numOfPage_shuben}
            page={page_shuben}
            onChange={handleChangeShuben}
            defaultPage={1}
            color="standard"
            size="large"
            showFirstButton
            showLastButton
            classes={{ ul: classes.paginator }}
            />
          </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className={classes.tupian}>
          {items_tupian
          .slice((page_tupian-1) * itemsPerPage, page_tupian * itemsPerPage)
          .map(item => <ItemCardforImgs data={item}></ItemCardforImgs>)
          }
        </div>
        <Divider />
          <Box component="span">
            <Pagination
            count={numOfPage_tupian}
            page={page_tupian}
            onChange={handleChangeTupian}
            defaultPage={1}
            color="standard"
            size="large"
            showFirstButton
            showLastButton
            classes={{ ul: classes.paginator }}
            />
          </Box>

      </TabPanel>
      <TabPanel value={value} index={4}>
        网页
      </TabPanel>
    </Box>
  );
}

BasicTabs.propTypes = {
  items_citiao: PropTypes.array,
  items_shuben: PropTypes.array,
  items_news: PropTypes.array,
  items_tupian: PropTypes.array,
  keyword: PropTypes.string
};
