import { useContext, useEffect, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const { user } = useContext(Context)

  const defaultImage = "https://dinarakasko.com/image/cache/catalog/basel-demo/blog-1140x700.png";

  const handleSubmit = async (e) =>{
    e.preventDefault();
      const newPost = {
        username: user.username,
        title,
        desc,
      }
      if(file){
        const data = new FormData();
        const fileName = Date.now() + file.name;
        // const fileName = `${Date.now()}-${path.extname(file.originalname)}`
        data.append("name", fileName);
        data.append("file", file);
        newPost.photo = fileName;
        try{
          const newPhoto = await axios.post("http://localhost:3000/api/upload", data);
          console.log(newPhoto)
        } catch (err){
          return res.status(500).json("Failed to Publish.", err);
        }
      }
      try{ //else
        const res = await axios.post("http://localhost:3000/" + user._id, newPost);
        window.location.replace("/" + res.data._id);
      } catch(err){
        return res.status(500).json("Failed to Publish.", err);
      }
  }

  return (
    <div className="write">
        <img
        className="writeImg"
        src={file ? URL.createObjectURL(file) : defaultImage}
        alt=""
        />
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={e=>{setFile(e.target.files[0])}} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e=>{setTitle(e.target.value)}}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e=>{setDesc(e.target.value)}}
          />
        </div>
        <button className="writeSubmit" type="submit" >
          Publish
        </button>
      </form>
    </div>
  );
}
