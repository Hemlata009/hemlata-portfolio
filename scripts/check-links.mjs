// Checks that every external https URL in the site data responds. Run: npm run check-links
import { readFileSync } from 'node:fs'

const files = ['src/data/profile.ts', 'src/data/projects.ts', 'src/data/experience.ts']
const GH = 'https://github.com/hemlata009'

const urls = new Set()
for (const f of files) {
  const text = readFileSync(new URL(`../${f}`, import.meta.url), 'utf8').replaceAll('${GH}', GH)
  for (const m of text.matchAll(/https:\/\/[^\s'"`)]+/g)) urls.add(m[0])
}

let failed = 0
for (const url of [...urls].sort()) {
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow' })
    // LinkedIn answers automated requests with 999 even for valid profiles.
    const ok = res.ok || (url.includes('linkedin.com') && res.status === 999)
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${res.status} ${url}`)
    if (!ok) failed++
  } catch (err) {
    console.log(`FAIL ERR ${url} (${err.message})`)
    failed++
  }
}
console.log(`${urls.size - failed}/${urls.size} links reachable`)
process.exit(failed ? 1 : 0)
