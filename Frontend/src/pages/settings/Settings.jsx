import { useContext, useState } from "react";
import "./settings.css";
import { Context } from "../../context/Context";
import axios from "axios";


export default function Settings() {
  
  const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg";
  const { user } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try
    {

      const res = await axios.put("http://localhost:3000/user/" + user._id, {
        name,
        email,
        password
      });
      console.log(res);
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
              <img
                src={user.ProfilePic ? user.ProfilePic : defaultImage}
                alt=""
              />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={`${user.username}`} name="name" onChange={e=>{setName(e.target.value)}}/>
          <label>Email</label>
          <input type="email" placeholder={`${user.email}`} name="email" onChange={e=>{setEmail(e.target.value)}}/>
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={e=>{setPassword(e.target.value)}}/>
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
