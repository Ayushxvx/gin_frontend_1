import { useState } from 'react';

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!title || !content || !author) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/addpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, author }),
            });

            if (!response.ok) {
                throw new Error('Failed to add post.');
            }

            const data = await response.json();
            setSuccess('Post added successfully!');
            // Optionally reset the form
            setTitle('');
            setContent('');
            setAuthor('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Add a New Post</h2>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            {success && <div className="mb-4 text-green-600">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter post title"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter post content"
                        rows="4"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Post
                    </button>
                </div>
            </form>
        </div>
    );
}