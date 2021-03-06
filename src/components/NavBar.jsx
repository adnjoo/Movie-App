import React from 'react';
// import { Link } from "react-router-dom";
import {
  Nav, Navbar, Container, NavDropdown,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const logo = require('../assets/logo.png');

function UserNav({ logout }) {
  return (
    <>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/movies">Movies</Nav.Link>
          <Nav.Link href="/television">TV Shows</Nav.Link>
          <Nav.Link href="/dashboard">My Movies</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown
            align="end"
            flip
            title={<FontAwesomeIcon icon={faUserCircle} size="2x" />}
            id="basic-nav-dropdown"
            style={{ paddingRight: '20px' }}
          >
            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
            <NavDropdown.Item
              onClick={(e) => {
                logout(e);
                localStorage.removeItem('login_time');
              }}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </>
  );
}

function GuestNav() {
  return (
    <Nav>
      <Nav.Link href="/login" style={{ paddingRight: '20px' }}>
        Login
      </Nav.Link>
    </Nav>
  );
}

export function LoggedNav({ isAuth, logout }) {
  // console.log('loggednav isauth', isAuth)
  if (isAuth) {
    return <UserNav logout={logout} />;
  }
  return <GuestNav />;
}

function NavBar({ setAuth, isAuth }) {
  // logout function
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Logged out successfully.');
  };

  return (
    <Navbar className="primarycolor" variant="dark" expand="md" id="top-header">
      <Container>
        <Navbar.Brand href="/" style={{ paddingLeft: '20px' }}>
          <img
            alt=""
            src={logo.default}
            width="30"
            height="30"
            className="d-inline-block align-top rounded-circle"
          />
          {' '}
          Movie App
        </Navbar.Brand>
        <LoggedNav isAuth={isAuth} logout={logout} />
      </Container>
    </Navbar>
  );
}

export default NavBar;
