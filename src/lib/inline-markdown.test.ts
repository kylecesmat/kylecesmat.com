import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { absoluteLinks, inlineMarkdown } from './inline-markdown.ts';

describe('inlineMarkdown', () => {
  it('links a path on this site and an https URL', () => {
    assert.match(inlineMarkdown('[now](/current)'), /href="\/current"/);
    assert.match(
      inlineMarkdown('[site](https://example.com/a)'),
      /href="https:\/\/example\.com\/a"/,
    );
  });

  it('does not turn a backslash path into a protocol-relative URL', () => {
    const html = inlineMarkdown('[go](/\\evil.com)');
    assert.equal(html.includes('href='), false);
    assert.match(html, /go/);
  });

  it('drops javascript and protocol-relative targets', () => {
    assert.equal(inlineMarkdown('[x](javascript:alert(1))').includes('href='), false);
    assert.equal(inlineMarkdown('[x](//evil.com)').includes('href='), false);
  });
});

describe('absoluteLinks', () => {
  it('rewrites only a site path', () => {
    const site = new URL('https://kylecesmat.com/');
    assert.equal(absoluteLinks('[now](/current)', site), '[now](https://kylecesmat.com/current)');
    assert.equal(absoluteLinks('[go](/\\evil.com)', site), '[go](/\\evil.com)');
  });
});
