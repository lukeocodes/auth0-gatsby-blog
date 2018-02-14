import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from '../assets/profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Kyle Mathews`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(3),
            height: rhythm(3),
            borderRadius: '50%'
          }}
        />
        <p>
          <strong>Luke Oliff</strong> is a Technical Writer working for <a href="https://auth0.com">Auth0</a> in the UK.
          <br/>
          <a href="https://twitter.com/mroliff">
            Follow him on Twitter
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
