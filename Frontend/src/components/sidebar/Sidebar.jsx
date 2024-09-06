import { Link } from "react-router-dom";
import "./sidebar.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Sidebar() {

  const [cat, setCat] = useState([]);
  useEffect(()=>{
    const fetchCat = async() =>{
      const res = await axios.get("http://localhost:3000/cat");
      setCat(res.data);
    }
    fetchCat();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Login ? about details of user: no about me:(
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
            {cat.map((c)=>(
              <li className="sidebarListItem" key={c._id}>
                <Link className="link" to={`?cat=${c.name}`}>{c.name}</Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
