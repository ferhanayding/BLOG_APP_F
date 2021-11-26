import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
  const PF ="http://localhost:5000/images/"

  return (
    <div className="post">
      {
        post.photo && 
        <img
        className="postImg"
        src={PF+post.photo}
        alt={post.username + "'s photo"}
        />
       
      }
      <div className="postInfo">
        <div className="postCats">
          {
            post.categories.map(c =>(
              <span className="postCat">
            <Link key = {c._id} className="link">
              {c.name}
            </Link>
          </span>
            )) 
          }
        
        </div>
          <Link to={`/post/${post._id}`} className="link">
        <span className="postTitle">
            {post.title}
        </span>
          </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {
          post.desc
        }
      </p>
    </div>
  );
}
