import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Post {
  title: string;
  content: string;
  author: string;
}

const Modify: React.FC<{ isEditing: boolean }> = ({ isEditing }) => {
  const [post, setPost] = useState<Post>({
    title: "",
    content: "",
    author: "",
  });
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (isEditing) {
      axios
        .get<Post>(`/api/blogs/${id}/`)
        .then((response) => setPost(response.data))
        .catch((error) => console.error("Error fetching post:", error));
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.patch(`/api/blogs/${id}/`, post);
      } else {
        await axios.post("/api/blogs/", post);
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="bg-primary text-teal-sorrow">
      <h1 className="text-3xl font-bold">
        {isEditing ? "Edit Post" : "New Post"}
      </h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <label htmlFor="title" className="block text-lg">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
          className="block border rounded p-2"
        />
        <label htmlFor="content" className="block text-lg mt-2">
          Content:
        </label>
        <textarea
          id="content"
          name="content"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
          className="block border rounded p-2"
        />
        <label htmlFor="author" className="block text-lg mt-2">
          Author:
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={post.author}
          onChange={(e) => setPost({ ...post, author: e.target.value })}
          required
          className="block border rounded p-2"
        />
        <button
          type="submit"
          className="mt-4 bg-teal-500 text-white py-2 px-4 rounded"
        >
          {isEditing ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default Modify;
