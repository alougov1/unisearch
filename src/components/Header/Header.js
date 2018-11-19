import React from 'react';
import './Header.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap';

const Header = () => {
    return( 
        <div>

            <Navbar className="Header"> 
                <Navbar.Header className="Head"> 
                    <a href="/">University Comparer</a>
                </Navbar.Header>

                <Nav pullRight>
                    <NavItem href="/components/Search/Search.js">
                        Search
                    </NavItem>
                    <NavItem href="/components/Profile/Profile.js">
                        Profile
                    </NavItem>
                    <NavItem href="/components/Settings/Settings.js">
                        Settings
                    </NavItem>
                </Nav>
            </Navbar>

        
        </div>
    );
}

export default Header;
