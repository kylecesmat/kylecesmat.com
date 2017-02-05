import React, { Component, PropTypes } from 'react';
import MarkdownIt from 'markdown-it';
import Prism from 'prismjs';
/* eslint-disable no-unused-vars */
// add more language support
import jsx from 'prismjs/components/prism-jsx';
import sh from 'prismjs/components/prism-bash';
import yaml from 'prismjs/components/prism-yaml';
/* eslint-enable no-unused-vars */

import styles from './markdown.css';

export default class Markdown extends Component {
  componentWillMount() {
    this.setMarkdownRenderer();
  }

  componentDidMount() {
    Prism.highlightAll();
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
