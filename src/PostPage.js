import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import api from './api/posts';

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    const filteredPosts = posts.filter((post) => post.id !== id);
    try {
      await api.delete(`/posts/${id}`);
      setPosts(filteredPosts);
    } catch (err) {
      console.log(err);
    }
    setPosts(filteredPosts);
    navigate("/");
  };
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDateTime">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post not found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit our homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
