import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Base from "./Base";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import { signup } from "../auth/Auth";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from "../image/avatar.jpg"


const useStyles = makeStyles({
 
    root: {
      minWidth: 500,
      maxWidth:570,
      minHeight:300,
      borderRadius:'2%',
    },
    btn:{
      marginTop:18,
      backgroundColor:'green',
      width:"40%"  
    },
    input: {
      marginLeft:20,
        marginTop:15,
        width:'70%',
      },
    
});

export default function Signup() {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] =useState('')
  const [success,setSuccess] = useState(false)
  const [msg,setMsg] = useState('')
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    
    signup({name,email,password})
    .then(res =>{
      if(res.error){
        setError(res.error)
        setMsg('')
        return
      }
      else{
        setMsg("Account created successfully")
        setName('')
        setEmail('')
        setPassword('')
        setError('')
        console.log(res)
        return res;
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
  const redirect = () => {
    return history.push("/");
  };
  const avatarLogo = {
    width:'15%',
    borderRadius:'50%'

  }
  return (
    <Base>
      <div className="formstyle">
      <Card className={classes.root}> 
      <CardContent>
        <h2>Signup here</h2>
        <img style={avatarLogo} src={Avatar} alt ="avatar"/>
        <p style={{color:"red"}}>  {error}</p>
        <p style={{color:"green"}}>  {msg}</p>

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
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
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
            signup
          </Button>
          <br />
          <br />
        </form>
        </CardContent>
        </Card>
      </div>
    </Base>
  );
}
