import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useState, useEffect } from "react";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState(""); // State for the comment input
  const [comments, setComments] = useState([]); // State for managing comments

  // Load comments from local storage when component mounts
  useEffect(() => {
    const savedComments = localStorage.getItem(`post_${post.id}_comments`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [post.id]);

  // Save comments to local storage whenever comments state changes
  useEffect(() => {
    localStorage.setItem(`post_${post.id}_comments`, JSON.stringify(comments));
  }, [post.id, comments]);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const commentHandler = () => {
    if (comment.trim() !== "") {
      // Add the new comment to the comments state
      setComments([...comments, comment]);
      setComment(""); // Clear the comment input
    }
  };

  return (
    <div className="post">
        <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.photo} alt="" />
        </div>
      <div className="postBottom">
        <div className="postBottomLeft">
          <img
            className="likeIcon"
            src="assets/like.png"
            onClick={likeHandler}
            alt=""
          />
          <img
            className="likeIcon"
            src="assets/heart.png"
            onClick={likeHandler}
            alt=""
          />
          <span className="postLikeCounter">{like} people liked it</span>
        </div>
        <div className="postBottomRight">
          <span
            className="postCommentText"
          >{`${comments.length} comments`}</span>
        </div>
      </div>
      {/* New comment input field */}
      <div className="postAddComment">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={commentHandler}>Post</button>
      </div>
      {/* Display comments */}
      <div className="postComments">
        {comments.map((c, index) => (
          <p key={index}>{c}</p>
        ))}
      </div>
    </div>
    </div>
  );
}

