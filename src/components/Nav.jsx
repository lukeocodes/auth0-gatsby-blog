import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import Auth from './Auth';

export default class Nav extends React.Component {
  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Auth0 - React</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}