

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/App.css";

interface Post {
  id: number;
  title: string;
  author: string;
}

const Blog: React.FC = () => {
  const [blogs, setblogs] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get<Post[]>("http://127.0.0.1:8000/api/blogs/")
      .then((response) => setblogs(response.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/blogs/${id}/`);
      setblogs(blogs.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="bg-primary text-teal-sorrow">
      <h1 className="text-3xl font-bold">blogs</h1>
      <Link to="/new" className="text-blue-500">
        Create New Post
      </Link>
      <ul>
        {blogs.map((post) => (
          <li key={post.id} className="mt-4">
            {post.title} by {post.author}
            <Link
              to={`http://127.0.0.1:8000/edit/${post.id}`}
              className="text-blue-500 ml-2"
            >
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



