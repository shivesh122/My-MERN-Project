import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post('http://localhost:3000/create-post', formData)
            .then((res) => {
                navigate('/feed');
            })
            .catch((err) => {
                console.error("Error creating post:", err);
                alert('Failed to create post.');
            });
    }

  return (
    <section className="create-post-section">  {/* Changed Section to section */}
        <h1>Create a New Post</h1>
        <form onSubmit={handleSubmit}>
            <input type="file" name="postImage" accept="image/*" placeholder="Post Image" required />
            <input type="text" name="caption" placeholder="Enter The Caption" required/>
            <button type="submit">Create Post</button>
        </form>
    </section>  
  )
}

export default CreatePost