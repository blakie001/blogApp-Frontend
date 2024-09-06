import { Link } from "react-router-dom";
import "./login.css";
import { useContext, useRef, useState } from "react";
import axios from "axios"
import { Context } from "../../context/Context";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(Context);
  const [error, setError] = useState("");

  const handleSubmit =  async(e) =>{
    e.preventDefault();
    setError(false);
    dispatch({ type: "LOGIN_START" })
    try
    {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      })
      localStorage.setItem("user", res.data)
      
      dispatch({type: "LOGIN_SUCCESS", payload: res.data});
      console.log(res.data)
      res.data && window.location.replace("/");
    }
    catch(err)
    {
      setError(true);
      dispatch({type: "LOGIN_FAILURE"});
    }
  }
  
  return (
    <div className="login" >
      <span className="loginTitle">Log In</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input className="loginInput" type="email" placeholder="Enter your Email..." onChange={e=>{setEmail(e.target.value)}}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." onChange={e=>{setPassword(e.target.value)}}/>
        <button className="loginButton" type="submit">Login</button>
      </form>
      <span>New to blogApp? <button className="registerButton"><Link className="link" to={"/register"}>Sign Up</Link></button></span>
        {/* <button className="loginRegisterButton"></button> */}
        <br />
        {error && <span style={{color:"red"}}>Invalid Credentials :(</span>}
    </div>
  );
}
