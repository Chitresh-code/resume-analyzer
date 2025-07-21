import {Link} from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
    const { auth } = usePuterStore();

    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient">RESUMIND</p>
            </Link>
            <div className="flex items-center gap-6">
                <Link to="/" className="text-dark-200 hover:text-black transition-colors font-medium">
                    Home
                </Link>
                <Link to="/wipe" className="text-dark-200 hover:text-black transition-colors font-medium">
                    Manage Data
                </Link>
                <Link to="/upload" className="primary-button w-fit">
                    Upload Resume
                </Link>
                {auth.isAuthenticated ? (
                    <button 
                        onClick={auth.signOut}
                        className="secondary-button w-fit"
                    >
                        Log Out
                    </button>
                ) : (
                    <Link to="/auth?next=/" className="secondary-button w-fit">
                        Log In
                    </Link>
                )}
            </div>
        </nav>
    )
}
export default Navbar