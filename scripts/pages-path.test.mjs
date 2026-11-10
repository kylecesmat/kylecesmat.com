import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { indexDirectory } from './pages-path.mjs';

describe('indexDirectory', () => {
  it('keeps a page inside the artifact', () => {
    const folder = indexDirectory('/tmp/dist-pages', 'current.html');
    assert.equal(folder, '/tmp/dist-pages/current');
  });

  it('refuses a name that climbs out of the artifact', () => {
    assert.throws(() => indexDirectory('/tmp/dist-pages', '...html'));
    assert.throws(() => indexDirectory('/tmp/dist-pages/nested', '../../secret.html'));
  });
});
