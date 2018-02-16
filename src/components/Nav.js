import React from 'react';
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
    this.forceUpdate();
  }

  logout() {
    auth.logout();
    this.forceUpdate();
  }

  render() {
    const { isAuthenticated } = auth;

    return (
      <div
        style={{
          height: '50px'
        }}
      >
        <div
          style={{
            float: 'left',
            lineHeight: '37px',
            height: '37px'
          }}
        >
          <img src={logo} alt="Auth0" />
        </div>
        <div
          style={{
            float: 'right'
          }}
        >
          <a href="/"
             style={{
               boxShadow: 'none',
               lineHeight: '37px'
             }}
          >
            Home
          </a>
          <span> | </span>
          {
            !isAuthenticated() && (
              <a href="#"
                onClick={this.login.bind(this)}
                style={{
                  boxShadow: 'none',
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
                  lineHeight: '37px'
                }}
              >
                Log Out
                {
                  auth.getUserName() && (
                    <span> ({auth.getUserName()})</span>
                  )
                }
              </a>
            )
          }
        </div>
      </div>
    );
  }
}