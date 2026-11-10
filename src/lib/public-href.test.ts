import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { navHref, publicHref } from './public-href.ts';

describe('publicHref', () => {
  it('accepts https and mailto', () => {
    assert.equal(publicHref('https://kylecesmat.com/'), 'https://kylecesmat.com/');
    assert.equal(publicHref('mailto:kylecesmat@gmail.com'), 'mailto:kylecesmat@gmail.com');
  });

  it('rejects other schemes and whitespace', () => {
    assert.throws(() => publicHref('http://example.com'));
    assert.throws(() => publicHref('javascript:alert(1)'));
    assert.throws(() => publicHref('https://example.com/a b'));
    assert.throws(() => publicHref('/current'));
  });
});

describe('navHref', () => {
  it('keeps a site path and still checks every other address', () => {
    assert.equal(navHref('/current'), '/current');
    assert.equal(navHref('https://x.com/kylecesmat'), 'https://x.com/kylecesmat');
    assert.equal(navHref('mailto:kylecesmat@gmail.com'), 'mailto:kylecesmat@gmail.com');
    assert.throws(() => navHref('//evil.example'));
    assert.throws(() => navHref('javascript:alert(1)'));
    assert.throws(() => navHref('/current\n'));
  });
});
