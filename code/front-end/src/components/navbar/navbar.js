import React from "react";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";

// @material-ui/core components
import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import CustomizedSnackbars from "../Alert/Alert";

import AccountCircle from '@material-ui/icons/AccountCircle';

import useStyles from "./styles";

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://baicao.zjuers.com:6636"
//const server = "http://127.0.0.1:8000";

const Navbar = () => {
  const classes = useStyles(); 
  const navigate = useNavigate();
  const [op, setOp] = React.useState("login");
  const [account, setAccount] = React.useState({
    email: cookie.load("username") ? cookie.load("account") : "",
    username: cookie.load("username") ? cookie.load("username") : "",
  });
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [remember, setRemember] = React.useState(cookie.load("remember"));
  const [ready, setReady] = React.useState(false);
  const initialFormState = {
    email: cookie.load("account") ? cookie.load("account") : "",
    password:
      remember && cookie.load("password") ? cookie.load("password") : "",
    username: "",
    email_check: "",
    password_check: "",
    username_check: "",
    oldpassword: "",
    newpassword: "",
    newpassword_check: "",
    checksum: "",
    checksum_check: "",
  };
  const [snackbar, setSnackbar] = React.useState({
    logDone: false,
    regDone: false,
    modDone: false,
    emailDone: false,
    noCode: false,
    findDone: false,
    logOut: false,
  });
  function closeSnackbar(name) {
    setSnackbar({ ...snackbar, [name]: false });
  }
  const [formData, setFormData] = React.useState(initialFormState);
  const handleClickButton = (event) => {
    if (account.email === "") {
      handleClickDialog();
    } else {
      handleClickProfile(event);
    }
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(false);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(false);
  };
  const handleClickDialog = () => {
    setOpenDialog(true);
    setOp("login");
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(initialFormState);
  };
  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLogout = () => {
    handleCloseProfile();
    cookie.remove("username", { path: "/" });
    setSnackbar({ ...snackbar, logOut: true });
    setAccount({ ...account, email: "", username: "" });
  };
  const handleSubmitLogin = () => {
    let ec = "";
    let pc = "";
    if (formData.email === "") {
      ec = "?????????????????????";
    } else if (
      !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
        formData.email
      )
    ) {
      ec = "?????????????????????";
    }
    if (formData.password === "") {
      pc = "?????????????????????";
    }
    setFormData({ ...formData, email_check: ec, password_check: pc });
    //????????????????????????????????????????????????
    if (ec === "" && pc === "") {
      login();
    }
  };
  async function login() {
    let ec = "";
    let pc = "";
    let data = {
      Password: formData.password,
      Email: formData.email,
    };
    let res = await axios.post(`${server}/login/`, data);
    if (res.data === "????????????") {
      let name = await axios.post(`${server}/getusername/`, data);
      setAccount({ email: formData.email, username: name.data });
      handleCloseDialog();
      setSnackbar({ ...snackbar, logDone: true });
      cookie.save("account", formData.email, { path: "/" });
      cookie.save("username", name.data, { path: "/" });
      if (remember) {
        cookie.save("password", formData.password, { path: "/" });
      } else {
        cookie.remove("password", { path: "/" });
      }
    } else {
      if (res.data === "????????????") {
        pc = "???????????????";
      } else {
        ec = "?????????????????????";
      }
      setFormData({
        ...formData,
        email_check: ec,
        password_check: pc,
      });
    }
  }
  const handleSubmitRegister = () => {
    let ec = "?????????";
    let uc = "?????????";
    let pc = "?????????";
    if (formData.email === "") {
      ec = "?????????????????????";
    } else if (
      !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
        formData.email
      )
    ) {
      ec = "?????????????????????";
    }
    if (formData.username === "") {
      uc = "????????????????????????";
    }
    if (formData.password === "") {
      pc = "?????????????????????";
    } else if (
      !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(formData.password)
    ) {
      pc = "?????????????????????";
    }
    setFormData({
      ...formData,
      email_check: ec,
      password_check: pc,
      username_check: uc,
    });
    //????????????????????????????????????????????????
    if (ec === "?????????" && pc === "?????????" && uc === "?????????") {
      register();
    }
  };
  async function register() {
    let ec = "";
    let data = {
      Name: formData.username,
      Password: formData.password,
      Email: formData.email
    };
    console.log(data);
    let res = await axios.post(`${server}/register/`, data);
    if (res.data === "???????????????") {
      setSnackbar({ ...snackbar, regDone: true });
      handleToLogin();
    } else {
      ec = "????????????????????????";
      setFormData({
        ...formData,
        email_check: ec,
      });
    }
  }
  const handleSubmitChangePassword = () => {
    let ec = "";
    let pc = "";
    let npc = "";
    if (formData.email === "") {
      ec = "?????????????????????";
    } else if (
      !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
        formData.email
      )
    ) {
      ec = "?????????????????????";
    }
    if (formData.oldpassword === "") {
      pc = "????????????????????????";
    }
    if (formData.newpassword === "") {
      npc = "????????????????????????";
    } else if (
      !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(formData.newpassword)
    ) {
      npc = "??????????????????????????????????????????6~20????????????????????????????????????????????????";
    }
    setFormData({
      ...formData,
      email_check: ec,
      password_check: pc,
      newpassword_check: npc,
    });
    //??????????????????????????????????????????????????????
    if (ec === "" && pc === "" && npc === "") {
      change();
    }
  };
  async function change() {
    let ec = "";
    let pc = "";
    let data = {
      Email: formData.email,
      Password: formData.oldpassword,
      Newpassword: formData.newpassword
    };
    console.log(data);
    //let res = { data: "????????????" };
    let res = await axios.post(`${server}/modifyPassword/`, data);
    if (res.data === "????????????") {
      handleToLogin();
      setFormData({ ...formData, password: "" });
      setAccount({ ...account, email: "", username: "" });
      cookie.remove("username", { path: "/" });
      if (cookie.load("password")) {
        cookie.remove("password", { path: "/" });
      }
      setSnackbar({ ...snackbar, modDone: true });
    } else {
      if (res.data === "????????????") {
        pc = "???????????????";
      } else {
        ec = "?????????????????????";
      }
      setFormData({
        ...formData,
        email_check: ec,
        password_check: pc,
        newpassword_check: "",
      });
    }
  }
  const handleSubmitSendEmail = () => {
    if (formData.email === "") {
      setFormData({ ...formData, email_check: "?????????????????????" });
    } else if (
      !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
        formData.email
      )
    ) {
      setFormData({ ...formData, email_check: "?????????????????????" });
    } else {
      sendemail();
    }    
  };
  async function sendemail() {
    // let res = {data: "???????????????"};
    let res = await axios.post(`${server}/find_pwd/`, { Email: formData.email });
    if (res.data === "???????????????") {
      setFormData({ ...formData, email_check: "?????????????????????"});
    } else {
      setReady(true);
      setFormData({ ...formData, email_check: ""});
      setSnackbar({ ...snackbar, emailDone: true });
    }  
  }
  const handleSubmitSetPassword = () => {
    if (ready) {
      let ec = "";
      let cc = "";
      let npc = "";
      if (formData.email === "") {
        ec = "?????????????????????";
      } else if (
        !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
          formData.email
        )
      ) {
        ec = "?????????????????????";
      }
      if (formData.checksum === "") {
        cc = "?????????????????????";
      }
      if (formData.newpassword === "") {
        npc = "????????????????????????";
      } else if (
        !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(formData.newpassword)
      ) {
        npc = "??????????????????????????????????????????6~20????????????????????????????????????????????????";
      }
      setFormData({
        ...formData,
        email_check: ec,
        checksum_check: cc,
        newpassword_check: npc,
      });
      if (ec === "" && cc === "" && npc === "") {
        setpassword();
      }
    } else {
      setSnackbar({ ...snackbar, noCode: true });
    }
  };
  async function setpassword() {
    let ec = "";
    let cc = "";
    let data = {
      Email: formData.email,
      Checksum: formData.checksum,
      Newpassword: formData.newpassword
    };
    // let res = {data: "????????????"};
    let res = await axios.post(`${server}/verify_code/`, data);
    if (res.data === "????????????") {
      handleToLogin();
      setFormData({ ...formData, email: "", password: "" });
      setSnackbar({ ...snackbar, findDone: true });
    } else {
      if (res.data === "???????????????") {
        ec = "?????????????????????";
      } else if (res.data === "??????????????????") {
        ec = "????????????????????????????????????????????????";
      } else {
        cc = "??????????????????";
      }
      setFormData({ ...formData, email_check: ec, checksum_check: cc });
    }
    
  }
  const handleRemember = (e) => {
    let tmp = e.target.checked;
    setRemember(tmp);
    cookie.save("remember", tmp, { path: "/" });
    if (!tmp && cookie.load("password")) {
      cookie.remove("password", { path: "/" });
    }
  };
  const handleToLogin = () => {
    setFormData(initialFormState);
    setOp("login");
  };
  const handleToRegister = () => {
    setFormData(initialFormState);
    setFormData({ ...formData, email: "", password: "" });
    setOp("register");
  };
  const handleToForgetPassword = () => {
    setFormData(initialFormState);
    setOp("forgetpassword");
  };
  const handleToChangePassword = () => {
    setOpenProfile(false);
    setFormData(initialFormState);
    setOp("changepassword");
    setOpenDialog(true);
  };
  return (
    <div className={classes.navbar}>
      <div className={classes.emptydiv} />
      <div className={classes.manager}>
        <Button
          color="primary"
          variant="outlined"
          startIcon={<AccountCircle />}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickButton}
        >
          {account.email === "" ? "??????" : account.username}
        </Button>
        {account.email && (
          <Poppers
            open={openProfile}
            anchorEl={openProfile}
            transition
            disablePortal
            className={classes.poppers}
          >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{ transformOrigin: "center top" }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseProfile}>  
                    <MenuList role="menu">
                      <MenuItem
                        onClick={() => {
                          setOpenProfile(false);
                          navigate('/');
                        }}
                        className={classes.dropdownItem}
                      >
                        ????????????
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setOpenProfile(false);
                          navigate('/user');
                        }}
                        className={classes.dropdownItem}
                      >
                        ????????????
                      </MenuItem>
                      <MenuItem
                        onClick={handleToChangePassword}
                        className={classes.dropdownItem}
                      >
                        ????????????
                      </MenuItem>
                      <MenuItem
                        onClick={handleLogout}
                        className={classes.dropdownItem}
                      >
                        ??????
                      </MenuItem>
                    </MenuList>          
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        )}
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        {op === "login" && (
          <div>
            <DialogTitle id="form-dialog-title" className={classes.form_head}>
              <Typography component="h1" variant="h5">
                ??????
              </Typography>
            </DialogTitle>
            <DialogContent className={classes.form_content}>
              <TextField
                error={formData.email_check !== ""}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="??????"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                helperText={formData.email_check}
                onChange={handleInputChange}
              />
              <TextField
                error={formData.password_check !== ""}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="??????"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                helperText={formData.password_check}
                onChange={handleInputChange}
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    name="remember" 
                    color="primary"
                    checked={remember}
                    onChange={handleRemember} 
                    />
                  }
                label="????????????"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.form_button}
                onClick={handleSubmitLogin}
              >
                ??????
              </Button>
              <Grid container className={classes.form_option}>
                <Grid item xs>
                  <Link onClick={handleToForgetPassword} variant="body2">
                    ???????????????
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick={handleToRegister} variant="body2">
                    ????????????
                  </Link>
                </Grid>
              </Grid>
            </DialogContent>
          </div>
        )}
        {op === "register" && (
          <div>
            <DialogTitle id="form-dialog-title" className={classes.form_head}>
              <Typography component="h1" variant="h5">
                ??????
              </Typography>
            </DialogTitle>
            <DialogContent className={classes.form_content}>
              <TextField
                error={
                  formData.email_check !== "" &&
                  formData.email_check !== "?????????"
                }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="??????"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                helperText={formData.email_check}
                onChange={handleInputChange}
              />
              <TextField
                error={
                  formData.username_check !== "" &&
                  formData.username_check !== "?????????"
                }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="?????????"
                name="username"
                autoComplete="username"
                value={formData.username}
                helperText={formData.username_check}
                onChange={handleInputChange}
              />
              <TextField
                error={
                  formData.password_check !== "" &&
                  formData.password_check !== "?????????"
                }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="??????"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                helperText={
                  formData.password_check === "?????????"
                    ? "?????????"
                    : formData.password_check +
                      "??????????????????6~20????????????????????????????????????????????????"
                }
                onChange={handleInputChange}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.form_button}
                onClick={handleSubmitRegister}
              >
                ??????
              </Button>
              <Grid container className={classes.form_option}>
                <Grid item>
                  <Link onClick={handleToLogin} variant="body2">
                    ?????????????????????
                  </Link>
                </Grid>
              </Grid>
            </DialogContent>
          </div>
        )}
        {op === "changepassword" && (
          <div>
            <DialogTitle id="form-dialog-title" className={classes.form_head}>
              <Typography component="h1" variant="h5">
                ????????????
              </Typography>
            </DialogTitle>
            <DialogContent className={classes.form_content}>
              <TextField
                error={ formData.email_check !== "" }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="??????"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                helperText={formData.email_check}
                onChange={handleInputChange}
              />
              <TextField
                error={ formData.password_check !== "" }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="oldpassword"
                label="?????????"
                type="password"
                name="oldpassword"
                autoComplete="oldpassword"
                autoFocus
                value={formData.oldpassword}
                helperText={formData.password_check}
                onChange={handleInputChange}
              />
              <TextField
                error={ formData.newpassword_check !== "" }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newpassword"
                label="?????????"
                type="password"
                id="newpassword"
                autoComplete="newpassword"
                value={formData.newpassword}
                helperText={ formData.newpassword_check }
                onChange={handleInputChange}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.form_button}
                onClick={handleSubmitChangePassword}
              >
                ??????
              </Button>
              <Grid container className={classes.form_option}>
              </Grid>
            </DialogContent>
          </div>
        )}
        {op === "forgetpassword" && (
          <div>
            <DialogTitle id="form-dialog-title" className={classes.form_head}>
              <Typography component="h1" variant="h5">
                ????????????
              </Typography>
            </DialogTitle>
            <DialogContent className={classes.form_content}>
              <div className={classes.form_email}>
                <TextField
                  error={formData.email_check !== ""}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="??????"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  helperText={formData.email_check}
                  className={classes.form_email_input}
                  onChange={handleInputChange}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.form_email_button}
                  onClick={handleSubmitSendEmail}
                >
                  ???????????????
                </Button>
              </div>
              <TextField
                error={formData.checksum_check !== ""}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="checksum"
                label="?????????"
                id="checksum"
                autoComplete="checksum"
                value={formData.checksum}
                helperText={formData.checksum_check}
                onChange={handleInputChange}
              />
              <TextField
                error={formData.newpassword_check !== ""}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newpassword"
                label="??????"
                type="password"
                id="newpassword"
                autoComplete="newassword"
                value={formData.newpassword}
                helperText={formData.newpassword_check}
                onChange={handleInputChange}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.form_button}
                onClick={handleSubmitSetPassword}
              >
                ??????
              </Button>
              <Grid container className={classes.form_option}>
                <Grid item xs>
                  <Link onClick={handleToLogin} variant="body2">
                    ??????
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick={handleToRegister} variant="body2">
                    ????????????
                  </Link>
                </Grid>
              </Grid>
            </DialogContent>
          </div>
        )}
      </Dialog>
      <CustomizedSnackbars
        name="logDone"
        message="???????????????"
        type="success"
        open={snackbar.logDone}
        close={closeSnackbar}
      />
      <CustomizedSnackbars
        name="logOut"
        message="???????????????"
        type="success"
        open={snackbar.logOut}
        close={closeSnackbar}
      />
      <CustomizedSnackbars
        name="regDone"
        message="???????????????????????????????????????"
        type="success"
        open={snackbar.regDone}
        close={closeSnackbar}
      />
      <CustomizedSnackbars
        name="modDone"
        message="???????????????????????????????????????"
        type="success"
        open={snackbar.modDone}
        close={closeSnackbar}
      />
      <CustomizedSnackbars
        name="emailDone"
        message="?????????????????????"
        type="success"
        open={snackbar.emailDone}
        close={closeSnackbar}
      />
      <CustomizedSnackbars
        name="noCode"
        message="???????????????????????????????????????"
        type="error"
        open={snackbar.noCode}
        close={closeSnackbar}
      />
      <CustomizedSnackbars
        name="findDone"
        message="??????????????????????????????????????????"
        type="success"
        open={snackbar.findDone}
        close={closeSnackbar}
      />
    </div>
  );
}

export default Navbar;