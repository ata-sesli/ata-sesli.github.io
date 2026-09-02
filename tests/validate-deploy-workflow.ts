import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const workflow = await readFile('.github/workflows/deploy.yml', 'utf8');

assert.match(workflow, /schedule:/);
assert.match(workflow, /workflow_dispatch:/);
assert.match(workflow, /branches:\s*\n\s*- main/);
assert.match(workflow, /bun run build/);
assert.match(workflow, /actions\/upload-pages-artifact@v4/);
assert.match(workflow, /actions\/deploy-pages@v4/);
assert.doesNotMatch(workflow, /GITHUB_TOKEN|Authorization:/);

console.log('GitHub Pages deployment workflow is valid.');
