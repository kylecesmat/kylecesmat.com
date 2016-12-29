import React, { Component, PropTypes } from 'react';
import MarkdownIt from 'markdown-it';

import styles from './markdown.css';

export default class Markdown extends Component {
  componentWillMount() {
    this.setMarkdownRenderer();
  }

  setMarkdownRenderer() {
    const md = new MarkdownIt({ html: true });

    this.md = md;
  }

  render() {
    return (
      <div
        className={styles.markdown}
        dangerouslySetInnerHTML={{ __html: this.md.render(this.props.markdown) }}
      />
    );
  }
}

Markdown.propTypes = { markdown: PropTypes.string.isRequired };
