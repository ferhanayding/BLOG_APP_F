import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link ,useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation()
  const path = location.pathname.split("/")[2]
  const [post,setPost] = useState({})
  const {user} = useContext(Context)
  const PF ="http://localhost:5000/images/"
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [updateMode, setUpdateMode] = useState(false)
  
  
  useEffect(() => {
    const getPost = async () =>{
      const res = await axios.get("/posts/"+path)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()  
  },[path])

  const handleDelete = async () =>{
    try {
     await alert("are you sure delete this post ?")
       await axios.delete(`/posts/${post._id}`,{data: {
         username : user.username
       }})
       window.location.replace("/")

    } catch (error) {
      
    }
  }
  const cleanInput = () =>{
    setDesc("")
  }
  const handleUpdate = async () =>{
    try {
      await axios.put(`/posts/${post._id}`,
      {username : user.username, title,desc}
      )
      setUpdateMode(false)
        } catch (error) {
      
    }
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {
          post?.photo &&
          (
          <img
          className="singlePostImg"
          src={PF+post?.photo}
          alt=""
        />)}
        {
          updateMode ?
          <input type="text" className="editTitleArea" value = {title} 
          onChange={(e)=>{setTitle(e.target.value)}}
          /> :
 

        <h1 className="singlePostTitle">
          {title}
          {
            post.username === user?.username  &&
            <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick = {()=> setUpdateMode(true)} ></i>
            <i className="singlePostIcon far fa-trash-alt" onClick = {handleDelete} ></i>
          </div>
          }
        </h1>
            }
        <div className="singlePostInfo">
          <span>
            Author :  
            <Link className="link" to={`/?user=${post.username}`} >
             <b style = {{color : "#333"}} >{ "  "+post.username}</b>
            </Link>
            
            
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {
          updateMode ? (

            <div className = "postDescContainer" >

          <textarea  name = "" className = "postEditTextArea"
           cols="30" 
           rows="10"
           onChange={(e)=>{setDesc(e.target.value)}}
           value ={desc}
           >
              
          </textarea> 
          
          <button className = "cleanOldDescButton"
           onClick = {()=> cleanInput()} >
            Clean
          </button>
          <button
           className="singlePostButton"
            onClick = {handleUpdate}
            >
              Update
            </button>
           </div>
          ) 
          :
            <>
        <p className="singlePostDesc">
          {
            desc
          }
        </p>
        
          </>
        }
      </div>
    </div>
  );
}
