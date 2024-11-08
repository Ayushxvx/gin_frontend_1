// PostDetail.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PostDetail() {
    const { id } = useParams(); 
    console.log("ID = ",id)
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`https://gin-server-1.onrender.com/${id}`); // Adjust the URL as necessary
                if (!response.ok) {
                    throw new Error("Failed to fetch post.");
                }
                const data = await response.json();
                setPost(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!post) {
        return <div>No post found.</div>;
    }

    return (
        <div className="p-4 bg-white shadow-md m-2 transition-transform transform hover:scale-105 rounded-lg border-4 border-solid border-gray-950">
        <div className="bg-gray-800 rounded-lg p-2">
        <h2 className="text-lg font-semibold italic underline text-center text-red-500 rounded-lg">{post.title}</h2>
        <h3 className="font-semibold text-center text-green-500 rounded-lg">{post.content}</h3>
        <h4 className="font-mono text-center text-white rounded-lg">{post.author}</h4>
        <h5 className="font-mono text-center text-white rounded-lg">{post.createdat}</h5>
        </div>
    </div>
    );
}
