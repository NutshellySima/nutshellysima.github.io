// Guard against drift between the SKILL.md in the repo and the copy embedded in
// the Cloudflare worker (the worker serves it, and both compute the index digest).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const worker = read('cloudflare/agent-discovery-worker.js');
const match = worker.match(/const skillMarkdown = \[([\s\S]*?)\]\.join\('\\n'\)/);
if (!match) {
  console.error('Could not find skillMarkdown in cloudflare/agent-discovery-worker.js');
  process.exit(1);
}

const embedded = new Function(`return [${match[1]}].join('\\n')`)();
const source = read('.well-known/agent-skills/chijun-sima-profile/SKILL.md');

if (embedded !== source) {
  console.error('SKILL.md and the copy embedded in cloudflare/agent-discovery-worker.js differ.');
  console.error('Update the worker copy so the published digest matches the static file.');
  process.exit(1);
}

console.log('Agent skill copies are in sync.');
