# Gatsby Blog with Auth0 Authentication

To run, clone this repository and follow the instructions below.

## Pre-requisites for Gatsby

### Node & NPM

```bash
node --version
```

```bash
npm --version
```

If you don’t have `node` and `npm` installed, check out [nodejs.org](https://nodejs.org/) and install the correct version for your operating system. 

### Install modules

```bash
npm install
```

## Auth0

### Sign Up for Auth0

You'll need an [Auth0](https://auth0.com) account to manage authentication. You can [sign up for a free Auth0 account here](https://auth0.com/signup). Next, set up an Auth0 Client so Auth0 can interface with your app.

### Set Up a Client App

1. Go to your [**Auth0 Dashboard**](https://manage.auth0.com/#/) and click the "[create a new client](https://manage.auth0.com/#/clients/create)" button. 
2. Name your new app, select "Single Page Web Applications", and click the "Create" button. 
3. In the **Settings** for your new Auth0 client app, add `http://localhost:8000/callback` to the **Allowed Callback URLs**.
4. Click the "Save Changes" button.
5. If you'd like, you can [set up some social connections](https://manage.auth0.com/#/connections/social). You can then enable them for your app in the **Client** options under the **Connections** tab. The example shown in the screenshot above utilizes username/password database, Facebook, Google, and Twitter.

> **Note:** Under the **OAuth** tab of **Advanced Settings** (at the bottom of the **Settings** section) you should see that the **JsonWebToken Signature Algorithm** is set to `RS256`. This is  the default for new clients. If it is set to `HS256`, please change it to `RS256`. You can [read more about RS256 vs. HS256 JWT signing algorithms here](https://community.auth0.com/questions/6942/jwt-signing-algorithms-rs256-vs-hs256).

### Modify auth util

Edit `src/utils/auth.js` and replace `<your-domain>` and `<your-client-id>` with your Auth0 domain prefix and your client ID, found on your [client dashboard](https://manage.auth0.com/#/clients).

## Run the app

```bash
gatsby develop
```