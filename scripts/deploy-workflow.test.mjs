import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

const deploy = readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8');
const ci = readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');

describe('deploy workflow', () => {
  it('deploys master only and does not forward a pull request branch', () => {
    assert.equal(deploy.includes('pull_request:'), false);
    assert.equal(deploy.includes('head_ref'), false);
    assert.equal(deploy.includes('--branch=master'), true);
    assert.equal(deploy.includes("github.ref == 'refs/heads/master'"), true);
    assert.equal(deploy.includes('persist-credentials: false'), true);
    assert.equal(deploy.includes('x-access-token:${'), false);
    assert.equal(deploy.includes('contents: write'), true);
  });

  it('gives the publish job the write token and the deploy job a read token', () => {
    const deployJob = deploy.slice(deploy.indexOf('jobs:'), deploy.indexOf('publish-github-pages:'));
    const publishJob = deploy.slice(deploy.indexOf('publish-github-pages:'));
    assert.equal(deployJob.includes('contents: read'), true);
    assert.equal(deployJob.includes('contents: write'), false);
    assert.equal(publishJob.includes('contents: write'), true);
    assert.match(publishJob, /needs: deploy/);
  });
});

describe('ci workflow', () => {
  it('checks out pull requests without a write token', () => {
    assert.equal(ci.includes('contents: read'), true);
    assert.equal(ci.includes('contents: write'), false);
    assert.equal(ci.includes('persist-credentials: false'), true);
    assert.equal(ci.includes('actions/checkout@v4'), false);
  });
});
