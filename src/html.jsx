import React from 'react';
import Nav from './components/Nav';

export default class HTML extends React.Component {
  render() {
    return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        {this.props.headComponents}
      </head>
      <body>
      <Nav />
      <div
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: this.props.body }}
      />
      {this.props.postBodyComponents}
      </body>
      </html>
    );
  }
}