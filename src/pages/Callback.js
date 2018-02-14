import React from 'react';
import loading from '../assets/loading.svg';
import Auth from '../utils/auth';

class Callback extends React.Component {
  render() {
    const auth = new Auth();
    auth.handleAuthentication();
    return (
      <div>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default Callback;
