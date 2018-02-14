import auth0 from 'auth0-js';
import { navigateTo } from "gatsby-link";

const AUTH0_DOMAIN = 'blog-posts.eu.auth0.com',
 AUTH0_CLIENT_ID = 'CunzU3aIUymzbK424hk5XoLHthP8ezyY',
 AUTH0_REDIRECT_URI = 'http://localhost:8000/callback',
 AUTH0_AUDIENCE = 'https://blog-posts.eu.auth0.com/userinfo',
 AUTH0_RESPONSE_TYPE = 'token id_token',
 AUTH0_SCOPE = 'openid profile';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_REDIRECT_URI,
    audience: AUTH0_AUDIENCE,
    responseType: AUTH0_RESPONSE_TYPE,
    scope: AUTH0_SCOPE
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
    localStorage.removeItem('user');
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

    this.auth0.client.userInfo(authResult.accessToken, function(err, user) {
      localStorage.setItem('user', JSON.stringify(user));
    })

    // navigate to the home route
    navigateTo('/')
  }

  getUser() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  getUserName() {
    return this.getUser().name;
  }
}
