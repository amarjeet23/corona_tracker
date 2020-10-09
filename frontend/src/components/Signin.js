import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Base from "./Base";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import { signin ,authenticate} from "../auth/Auth";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from "../image/avatar.jpg"

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    maxWidth:550,
    minHeight:300,
    borderRadius:'2%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  input:{
    marginLeft:20,
    marginTop:15,
    width:'70%',
  },
  btn:{
    marginTop:18,
    backgroundColor:'green',
    width:"40%"
    
  }
});

export default function Signin() {
  const classes = useStyles();
  const [email, setEmail] = useState("ar@gmail.com");
  const [password, setPassword] = useState("ar123");
  const [error ,setError] = useState('')
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    signin({email,password})
    .then(res =>{
      if(res.data.error){
        return setError(res.data.error)
      }else{
      console.log(res)
      authenticate(res.data,()=>{
       console.log(res)
      })
      history.push("/")
    }
      
    })
    .catch(err =>console.log(err))
  };
  const back = {
    position: "absolute",
    top: "0px",
    right: "0px",
    fontSize: "14px",
  };
  const avatarLogo = {
    width:'20%',
    borderRadius:'50%'

  }
  const redirect = () => {
    return history.push("/");
  };
  return (
    <Base>
      <div className="formstyle">
      <Card className={classes.root}> 
      <CardContent>
        <h2>login here</h2>
        <img style={avatarLogo} src={Avatar} alt ="avatar"/>
        {/* <p onClick={redirect}style={back}>X</p> */}
        <p style={{color:"red"}}>  {error}</p>
        <Button
          style={back}
          variant="contained"
          color="secondary"
          onClick={redirect}
        >
          X
        </Button>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField className={classes.input}
            id="outlined-basic"
            label="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <TextField className={classes.input}
            id="outlined-basic"
            type="password"
            label="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button className={classes.btn}
            variant="contained"
            color="primary"
            onClick={(e) => onSubmit(e)}
          >
            signin
          </Button>
          <br />
          <br />
          Don,t have an account ?
          <Link
            style={{ color: "blue", fontSize: "19px", textDecoration: "none" }}
            to="/signup"
          >
            signup{" "}
          </Link>
          here
        </form>
        
        </CardContent>
        </Card>
      </div>
    </Base>
  );
}
