import auth0 from 'auth0-js';
import createBrowserHistory from 'history/createBrowserHistory';
import { navigateTo } from "gatsby-link";

const history = createBrowserHistory();

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'blog-posts.eu.auth0.com',
    clientID: 'CunzU3aIUymzbK424hk5XoLHthP8ezyY',
    redirectUri: 'http://localhost:8000/callback',
    audience: 'https://blog-posts.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        // navigate to the home route
        navigateTo('/')
      } else if (err) {
        // navigate to the home route
        navigateTo('/')
        console.log(err);
      }
    });
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    navigateTo('/')
  }
}
