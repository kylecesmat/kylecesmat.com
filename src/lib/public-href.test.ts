import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { publicHref } from './public-href.ts';

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
