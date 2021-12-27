import React from "react";
import {useNavigate} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from "./styles";
import img from "../../images/LOGO.png";
import cookie from "react-cookies";
import PropTypes from "prop-types";
import {List} from "@material-ui/core";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://1.15.97.64:6636";

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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const User = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [favorList, setFavorList] = React.useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const remove = (i) => () => {
    // let data = {
    //   Email: cookie.load("account"),
    //   Id: i,
    // };
    //let res = await axios.post(`${server}/deletefavor/`, data);
    let res = {
      data: "删除成功",
    };
    if (res.data === "删除成功") {
      alert("取消收藏成功");
    } else {
      alert("您已取消收藏");
    }
  };
  async function fetch() {
    // let data = {
    //   Email: cookie.load("account"),
    // };
    //let res = await axios.post(`${server}/returnfavor/`, data);
    let res = {
      data: [
        {
          Id: 1,
          Name: "路路通",
          Description: "聚花果，由多数小蒴果集合而成，球形，直径2～3厘米。基部有总果梗。表面灰棕色或棕褐色，有多数尖刺及喙状小钝刺，长0.5~1厘米，常折断，小蒴果顶部开裂，呈蜂窝状小孔。体轻，质硬，不易破开。气微，味淡。",
        },
        {
          Id: 2,
          Name: "路路通2",
          Description: "聚花果，由多数小蒴果集合而成，球形，直径2～3厘米。基部有总果梗。表面灰棕色或棕褐色，有多数尖刺及喙状小钝刺，长0.5~1厘米，常折断，小蒴果顶部开裂，呈蜂窝状小孔。体轻，质硬，不易破开。气微，味淡。",
        },
        {
          Id: 3,
          Name: "路路通3",
          Description: "聚花果，由多数小蒴果集合而成，球形，直径2～3厘米。基部有总果梗。表面灰棕色或棕褐色，有多数尖刺及喙状小钝刺，长0.5~1厘米，常折断，小蒴果顶部开裂，呈蜂窝状小孔。体轻，质硬，不易破开。气微，味淡。",
        },
        {
          Id: 4,
          Name: "路路通4",
          Description: "聚花果，由多数小蒴果集合而成，球形，直径2～3厘米。基部有总果梗。表面灰棕色或棕褐色，有多数尖刺及喙状小钝刺，长0.5~1厘米，常折断，小蒴果顶部开裂，呈蜂窝状小孔。体轻，质硬，不易破开。气微，味淡。",
        },
      ],
    }
    setFavorList(res.data);
  }
  React.useEffect(() => {
    fetch();
  }, [remove]);
  return (
    <div>
      <div className={classes.block}>
        <img src={img} alt="logo" className={classes.logo}/>
      </div>
      <Paper variant="outlined" className={classes.paper}>
        <Typography variant="h5" className={classes.username}>
          {cookie.load("username")}
        </Typography>
        <Typography color="textSecondary" variant="body2" className={classes.email}>
          电子邮箱：{cookie.load("account")}
        </Typography>
        <Divider variant="middle" />
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="我的收藏" {...a11yProps(0)} />
        </Tabs>
        <Divider variant="middle" className={classes.divider}/>
        <TabPanel value={value} index={0}>
          <List>
            {favorList.map((current) => (
                <ListItem>
                  <ListItemText
                    primary={current.Name}
                    secondary={current.Description}
                    classes={{
                      secondary: classes.text,
                    }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => {
                        navigate("/detail/" + current.Id);
                      }}
                      aria-label="delete">
                      <SearchIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={remove(current.Id)}
                      aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            )}
          </List>
        </TabPanel>
      </Paper>
    </div>
  );
}

export default User;