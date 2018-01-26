import React from 'react';
import Link from 'gatsby-link'
import get from "lodash/get";
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import { rhythm } from '../utils/typography'

class IndexPage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const { data, pathContext } = this.props;
    const { group, nextPath, prevPath } = pathContext;

    return (
      <div>
        <Helmet title={siteTitle} />
        <Bio />
        {group.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
        <div>
          {prevPath.length > 0 &&
          <Link style={{
            boxShadow: 'none',
            float: 'left',
          }} to={prevPath}>
            &lt; Older posts
          </Link>
          }
          {nextPath.length > 0 &&
          <Link style={{
            boxShadow: 'none',
            float: 'right',
          }} to={prevPath}>
            Newer posts &gt;
          </Link>
          }
        </div>
      </div>
    )
  }
}

export default IndexPage;

