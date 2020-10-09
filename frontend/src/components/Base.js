import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import{Link,useHistory,withRouter} from "react-router-dom"
import { isAuthenticated,signout } from '../auth/Auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex:'1'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Base({
    title="my title",
    descriptiom="my description",
    children
}) {
  const history = useHistory()
  const classes = useStyles();
const linkStyle={
  textDecoration :"none",
  color:'#eee'
}
const logof=()=>{
  signout(()=>{
    history.push("/")
    alert("Logout successfully")
  })
  
}
  return (
    <div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}>
            Covid Tracker
          </Typography>
         
            {!isAuthenticated() && (<>
              <Link style={linkStyle}to="/signin"><Button color="inherit">Login</Button></Link>
              <Link style={linkStyle} to="/signup"> <Button color="inherit">signup</Button></Link>
            </>)}
          
         {isAuthenticated() && (<>
          <span onClick={logof}style={linkStyle}><Button color="inherit">Logout</Button></span>
         
         </>)}
          
          
        </Toolbar>
      </AppBar>
      {children}
      {/* <AppBar position="static" color="primary">
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}>
            Corona Tracker
          </Typography>
          <Link to="/signin"><Button color="inherit">Login</Button></Link>
          <Link to="/signup"> <Button color="inherit">signup</Button></Link>
         <Link to="/logout"><Button color="inherit">Logout</Button></Link>
          
          
        </Toolbar>
      </AppBar> */}
    </div>
  );
}