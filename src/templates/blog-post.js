import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Link from '../components/link';
import Page from '../components/page';
import { Panel } from '../components/panel';

const Pagination = styled.ul`
  padding: 2em 0;
  display: flex;
`;

const PaginationLink = styled.li`
  flex: 1 1 50%;
  justify-content: ${(props) => (props.next ? 'flex-end' : null)};
  display: flex;
`;

const PubDate = styled.span`
  font-weight: 200;
  font-size: 12px;
  margin: 15px 0;
  display: block;
`;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pathContext;

    return (
      <Page>
        <Panel>
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
          <h1>{post.frontmatter.title}</h1>
          <PubDate>Published {post.frontmatter.date}</PubDate>
          <section>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </section>
          <Pagination>
            {previous && (
              <PaginationLink>
                <Link styled to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              </PaginationLink>
            )}

            {next && (
              <PaginationLink next>
                <Link styled to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              </PaginationLink>
            )}
          </Pagination>
        </Panel>
      </Page>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
