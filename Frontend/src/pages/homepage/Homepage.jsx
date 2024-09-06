import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {

  const[posts, setPosts] = useState([]);
  const {search} = useLocation();
  useEffect(() =>{
    const fetchPost = async() =>{
      try
      {
        const res = await axios.get("http://localhost:3000/" + search);
        // const data = await res.json()
        // console.log(res.data)
        setPosts(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchPost();
    // console.log(posts)
  }, [search])
 
  return (
    <>
      <Header />
      <div className="home">
        {/* {posts && <Posts Post = {posts} />} */}
        {posts && posts.length > 0 && <Posts posts={posts}/>}
        <Sidebar />
      </div>
    </>
  );
}
