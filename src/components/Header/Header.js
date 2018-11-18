import React from 'react';
import './Header.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const Header = () => {
    return(
        <div>
            <div className="Header">
            
            <Link to="/" className="title">University Comparer</Link>
            <Link to="/components/Search/Search.js">Search</Link>
            <Link to="/components/Profile/Profile.js">Profile</Link>
            <Link to="/components/Settings/Settings.js">Settings</Link>
            </div>
        </div>
    );
}

export default Header;
