import { Link } from "react-router-dom";
import "./singlePost.css";
import {useLocation} from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { user } = useContext(Context);
  const PF = "http://localhost:3000/images/";
  const defaultImage = "https://dinarakasko.com/image/cache/catalog/basel-demo/blog-1140x700.png";

  const [post, setPost] = useState({});
  useEffect(()=>{
    const getPost = async() =>{
      try{
        const res = await axios.get("http://localhost:3000/" + path)
        setPost(res.data)
      } catch(err){
        console.log(err);
      }
    }
    getPost();
  }, [path])

  const handleDelete = async() =>{
    await axios.delete("http://localhost:3000/" + path)
    window.location.replace("/")
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo ? (
          <img
            className="singlePostImg"
            src={PF + post.photo}
            alt=""
          />
        ) : <img
        className="singlePostImg"
        src={defaultImage}
        alt=""
        />}
        <h1 className="singlePostTitle">
          {post.title}
          {post.username === user?.username && (  // token
            <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit"></i>
              <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
            </div>
          )}
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?username=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {post.desc}
        </p>
      </div>
    </div>
  );
}
