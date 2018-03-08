import React from 'react';
import Auth from '../utils/auth';
import Subscribe from './Subscribe';

import logo from '../assets/logo-100-blue.png';

const auth = new Auth();

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  login() {
    auth.login();

    this.setState({
      authenticated: auth.isAuthenticated()
    });
  }

  logout() {
    auth.logout();

    this.setState({
      authenticated: auth.isAuthenticated()
    });
  }

  componentDidMount() {
    this.setState({
      authenticated: auth.isAuthenticated()
    });
  }

  render() {
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
            !this.state.authenticated && (
              <span>
                <a href="#"
                  onClick={this.login.bind(this)}
                  style={{
                    boxShadow: 'none',
                    lineHeight: '37px'
                  }}
                >
                  Log In
                </a>
              </span>
            )
          }
          {
            this.state.authenticated && (
              <span>
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
                <span> | </span>
                <Subscribe />
              </span>
            )
          }
        </div>
      </div>
    );
  }
}