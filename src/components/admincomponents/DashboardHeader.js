import React from "react";
import { useNavigate, Link } from "react-router-dom"; 

function DashboardHeader({onLogout}) {
    const navigate = useNavigate();
    const handleLogoutClick = () => {
        onLogout();
        navigate('/admin/login'); 

    }
    return (       
        <nav className="dashboard-nav">
                <div className="logo">
                    <a href="http://localhost:3000/">
                        <span className="fa fa-wordpress"></span>
                    </a>
                </div>
                <ul className="main-nav">
                    <li>
                        <Link to="/admin/dashboard">
                            <span className="fa fa-home"></span>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/projects">
                            <span className="fa fa-home"></span>
                            Projects
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/menus">
                            <span className="fa fa-home"></span>
                            Menus
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/testimonials">
                            <span className="fa fa-home"></span>
                            Testimonials
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/blogs">
                            <span className="fa fa-home"></span>
                            Blogs
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/settings">
                            <span className="fa fa-home"></span>
                            Settings
                        </Link>
                    </li>

                    <li>
                        <a onClick={handleLogoutClick} className="logout-btn">
                            <span className="fa fa-sign-out"></span>
                            Logout
                        </a>
                    </li>                   
                </ul>
            </nav>
    );
}

export default DashboardHeader;
