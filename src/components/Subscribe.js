import React from 'react';
import Auth from '../utils/auth';
import axios from 'axios';

const auth = new Auth();

export default class Subscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: this.isSubscribed()
    };
  }

  isSubscribed() {
    return (localStorage.getItem('subscribed') == 'true');
  }

  componentWillMount() {
    if (auth.getUser() && localStorage.getItem("subscribed") === null) {
      console.log('checking');
      const email = auth.getUser().email;
      axios.get(`https://wt-b374f39b442dc589a2d950057c95207e-0.run.webtask.io/auth0-newsletter-wt-api/subscribed/${email}`)
        .then(res => {
          localStorage.setItem('subscribed', res.data.subscribed)
          this.setState({
            subscribed: this.isSubscribed()
          })
        })
        .catch(console.error);
    }
  }

  subscribe() {
    if (auth.getUser()) {
      const email = auth.getUser().email;
      axios.post(`https://wt-b374f39b442dc589a2d950057c95207e-0.run.webtask.io/auth0-newsletter-wt-api/subscribe`, {email: email})
        .then(res => {
          localStorage.setItem('subscribed', 'true')
          this.setState({
            subscribed: this.isSubscribed()
          })
        })
        .catch(console.error);
    }
  }

  unsubscribe() {
    if (auth.getUser()) {
      const email = auth.getUser().email;
      axios.post(`https://wt-b374f39b442dc589a2d950057c95207e-0.run.webtask.io/auth0-newsletter-wt-api/unsubscribe`, {email: email})
        .then(res => {
          localStorage.removeItem('subscribed')
          this.setState({
            subscribed: false
          })
        })
        .catch(console.error);
    }
  }

  render() {
    if (this.state.subscribed) {
      return (
        <a href="#"
           onClick={this.unsubscribe.bind(this)}
        >Unsubscribe</a>
      )
    } else {
      return (
        <a href="#"
           onClick={this.subscribe.bind(this)}
        >Subscribe</a>
      )
    }
  }
}