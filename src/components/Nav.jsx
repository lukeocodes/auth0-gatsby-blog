import React from 'react';
// import { Navbar, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { navigateTo } from "gatsby-link";

import logo from '../assets/logo-100-blue.png';

const auth = new Auth();

export default class Nav extends React.Component {
  goTo(route) {
    navigateTo(`/${route}`);
  }

  login() {
    auth.login();
  }

  logout() {
    auth.logout();
    this.forceUpdate();
  }

  render() {
    const { isAuthenticated } = auth;

    return (
      <div>
            <a href="#" style={{
              boxShadow: 'none',
              textDecoration: 'none'
            }}>
              <img src={logo} alt="Auth0"/>
            </a>
        {
          !isAuthenticated() && (
            <a href="#"
              onClick={this.login.bind(this)}
              style={{
                boxShadow: 'none',
                float: 'right',
                lineHeight: '37px'
              }}
            >
              Log In
            </a>
          )
        }
        {
          isAuthenticated() && (
            <a href="#"
              onClick={this.logout.bind(this)}
              style={{
                boxShadow: 'none',
                float: 'right',
                lineHeight: '37px'
              }}
            >
              Log Out ({auth.getUserName()})
            </a>
          )
        }
      </div>
    );
  }
}