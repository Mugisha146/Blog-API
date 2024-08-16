import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/App.css";

interface Post {
  id: number;
  title: string;
  author: string;
  content: string; 
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Post[]>("http://127.0.0.1:8000/api/blogs/")
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/blogs/${id}/`);
      setBlogs(blogs.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="bg-primary text-teal-sorrow">
      <h1 className="text-3xl font-bold">Blogs</h1>
      <Link to="/new" className="text-blue-500">
        Create New Post
      </Link>
      <ul>
        {blogs.map((post) => (
          <li key={post.id} className="mt-4">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <Link to={`/edit/${post.id}`} className="text-blue-500 ml-2">
              Edit
            </Link>
            <button
              onClick={() => handleDelete(post.id)}
              className="text-red-500 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
