import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {

  const defaultImage = "https://dinarakasko.com/image/cache/catalog/basel-demo/blog-1140x700.png";
  const PF = "http://localhost:3000/images/"

  return (
    <div className="post">
      {post.photo ? (
        <img
        className="postImg"
        src={PF + post.photo}
        alt={post.title}
        />
      ) : <img
      className="postImg"
      src={defaultImage}
      alt={post.title}
      />}
      <div className="postInfo">
        <div className="postCats">
          {post.category.length > 0 && post.category.map((c)=>(
            <span className="postCat" key={post._id}>{c.name}</span>
          ))}
        </div>
        <Link to={`/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
       {post.desc}
      </p>
    </div>
  );
}
