import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="flex justify-evenly items-center bg-indigo-600 text-white p-3 shadow-lg">
            <span className="text-xl font-semibold">
                <Link to="/" className="hover:text-yellow-300 transition-colors duration-200">
                    Home
                </Link>
            </span>
            <span className="text-xl font-semibold">
                <Link to="/addpost" className="hover:text-yellow-300 transition-colors duration-200">
                    Add Post
                </Link>
            </span>
        </nav>
    );
}
