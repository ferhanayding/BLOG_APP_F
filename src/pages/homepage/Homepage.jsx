import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios"
export default function Homepage() {
  const [posts , setPosts] = useState([]);
  const {search} = useLocation()
//  fetching for posts
  const fetchPosts = async () =>{
    const response = await axios.get("/posts/"+search)

    // console.log(response)
    setPosts(response.data)
  }
  
  useEffect(() => {
    
    fetchPosts();

  }, [])
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts = {posts} />
        <Sidebar />
      </div>
    </>
  );
}
