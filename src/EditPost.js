import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate} from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import format from "date-fns/format";
import api from './api/posts';

const EditPost = () => {
  const { posts, setPosts } =
    useContext(DataContext);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const navigate = useNavigate();
    const handleEdit = async (id) => {
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      const updatedPost = { id, title: editTitle, datetime, body: editBody };
      try {
        const response = await api.put(`/posts/${id}`, updatedPost);
        setPosts(
          posts.map((post) => (post.id === id ? { ...response.data } : post))
        );
        setEditTitle("");
        setEditBody("");
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    };

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <main className="NewPost">
      {post && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editTitle">Post Title:</label>
            <input
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="editBody">Post:</label>
            <textarea
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="button" onClick={() => handleEdit(post.id)}>
              Edit
            </button>
          </form>
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
    </main>
  );
};

export default EditPost;
