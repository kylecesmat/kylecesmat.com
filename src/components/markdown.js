import React, { Component, PropTypes } from 'react';
import MarkdownIt from 'markdown-it';

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
        key={Date.now()}
        id={Date.now()}
        className="markdown"
        dangerouslySetInnerHTML={{ __html: this.md.render(this.props.markdown) }}
      />
    );
  }
}

Markdown.propTypes = { markdown: PropTypes.string.isRequired };
