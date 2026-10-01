// Offline smoke test for cloudflare/agent-discovery-worker.js. No network:
// only requests the worker answers itself are exercised.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const worker = (await import(pathToFileURL(path.join(root, 'cloudflare/agent-discovery-worker.js')).href)).default;

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};
const call = (url, init) => worker.fetch(new Request(url, init));

// Bare domain redirects to www, keeping path and query.
const apex = await call('https://chijunsima.com/llms.txt?a=1');
expect(apex.status === 301, `apex status ${apex.status}, expected 301`);
expect(
  apex.headers.get('Location') === 'https://www.chijunsima.com/llms.txt?a=1',
  `apex Location ${apex.headers.get('Location')}`
);

// Retired pages redirect with a real 301.
const moved = await call('https://www.chijunsima.com/deep-dive.html');
expect(moved.status === 301, `deep-dive status ${moved.status}, expected 301`);
expect(moved.headers.get('Location') === 'https://www.chijunsima.com/', `deep-dive Location ${moved.headers.get('Location')}`);

// The service worker script is never cached (checked against a stubbed origin).
const realFetch = globalThis.fetch;
globalThis.fetch = async () => new Response('// sw', { headers: { 'Cache-Control': 'max-age=14400' } });
const sw = await call('https://www.chijunsima.com/sw.js');
globalThis.fetch = realFetch;
expect((sw.headers.get('Cache-Control') ?? '').includes('no-cache'), `sw.js Cache-Control ${sw.headers.get('Cache-Control')}`);

// API catalog is served as a linkset.
const catalog = await call('https://www.chijunsima.com/.well-known/api-catalog');
expect(catalog.status === 200, `api-catalog status ${catalog.status}`);
expect(
  (catalog.headers.get('Content-Type') ?? '').startsWith('application/linkset+json'),
  `api-catalog type ${catalog.headers.get('Content-Type')}`
);
expect(catalog.headers.get('X-Frame-Options') === 'DENY', 'api-catalog is missing security headers');

// The digest the worker publishes matches the static SKILL.md.
const index = await (await call('https://www.chijunsima.com/.well-known/agent-skills/index.json')).json();
const skill = fs.readFileSync(path.join(root, '.well-known/agent-skills/chijun-sima-profile/SKILL.md'));
const digest = `sha256:${crypto.createHash('sha256').update(skill).digest('hex')}`;
expect(index.skills?.[0]?.digest === digest, 'agent-skills digest differs from SKILL.md');

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}
console.log('Worker smoke test passed.');
