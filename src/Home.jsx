import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await fetch("http://localhost:8000");
                if (!response.ok) {
                    throw new Error("Failed to fetch posts.");
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        getPosts();
    }, []);

    return (
        <>
            {loading ? (
                <div className="p-2 bg-blue-600 text-white rounded-lg text-center m-2">
                    Loading, please wait...
                </div>
            ) : null}

            {error ? (
                <div className="p-2 bg-red-600 text-white rounded-lg text-center m-2">
                    Error: {error}
                </div>
            ) : null}

            <div>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div key={index} className="p-4 bg-white shadow-md m-2 transition-transform transform hover:scale-105 rounded-lg border-4 border-solid border-gray-950">
                            <div className="bg-gray-800 rounded-lg p-2">
                            <Link to={`detail/${post.id}`}>
                            <h2 className="text-lg font-semibold italic underline text-center text-red-500 rounded-lg">{post.title}</h2>
                            </Link>
                            <h3 className="font-semibold text-center text-green-500 rounded-lg">{post.contentlimited}...</h3>
                            <h4 className="font-mono text-center text-white rounded-lg">{post.author}</h4>
                            <h5 className="font-mono text-center text-white rounded-lg">{post.createdat}</h5>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-2 bg-yellow-300 text-black rounded-lg text-center m-2">
                        No posts available.
                    </div>
                )}
            </div>
        </>
    );
}