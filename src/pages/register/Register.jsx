import axios from "axios"
import { useState } from "react"
import "./register.css"

export default function Register() {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState(false)


  const handleSubmit = async(e) => {
    e.preventDefault()
    setError(true)
    try{
      const res = await axios.post("/auth/register",{
        username,
        email,
        password
      })
      res.data && window.location.replace("/login")
    }catch(err){
      setError(true)
    }
  }
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="name" minLength="2" placeholder="Enter your username..."
         onChange={e=> setUsername(e.target.value)} />
        <label>Email</label>
        <input className="registerInput" type="email" placeholder="Enter your email..."
        onChange={e=> setEmail(e.target.value)} />
        <label>Password</label>
        <input className="registerInput" type="password"  placeholder="Enter your password..."
        onChange={e=> setPassword(e.target.value)} minLength="6" />
        <button className="registerButton" type = "submit">Register</button>
      </form>
        <button className="registerLoginButton">Login</button>
      { error && <span className="errorText">Somenthing went wrong!</span>}
    </div>
    )
}
