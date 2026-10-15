import { describe, expect, it } from 'vitest'
import { experience, skills } from './experience'
import { profile } from './profile'
import { projects } from './projects'
import { CATEGORY_LABELS } from './types'

const urlOk = (u: string) => /^https:\/\/[^\s]+$/.test(u)

describe('project data', () => {
  it('has unique slugs and titles', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length)
    expect(new Set(projects.map((p) => p.title)).size).toBe(projects.length)
  })

  it('has between four and six featured projects', () => {
    expect(projects.length).toBeGreaterThanOrEqual(4)
    expect(projects.length).toBeLessThanOrEqual(6)
  })

  it('fills every case-study field', () => {
    for (const p of projects) {
      for (const field of ['summary', 'problem', 'objective', 'data'] as const) {
        expect(p[field].length, `${p.slug}.${field}`).toBeGreaterThan(20)
      }
      for (const list of ['approach', 'workflow', 'decisions', 'limitations', 'next', 'stack'] as const) {
        expect(p[list].length, `${p.slug}.${list}`).toBeGreaterThan(0)
      }
    }
  })

  it('uses known categories and covers all four', () => {
    const used = new Set(projects.flatMap((p) => p.categories))
    for (const c of used) expect(CATEGORY_LABELS).toHaveProperty(c)
    expect([...used].sort()).toEqual(Object.keys(CATEGORY_LABELS).sort())
  })

  it('only links to https GitHub repos owned by the profile, or null', () => {
    for (const p of projects) {
      if (p.repo === null) continue
      expect(urlOk(p.repo)).toBe(true)
      expect(p.repo.startsWith(`${profile.github}/`)).toBe(true)
    }
  })

  it('has no demo link unless it is https', () => {
    for (const p of projects) if (p.demo) expect(urlOk(p.demo)).toBe(true)
  })

  it('does not publish unverified claims', () => {
    const text = JSON.stringify(projects)
    expect(text).not.toMatch(/R² ?> ?0\.85/)
    expect(text).not.toMatch(/250,000/)
    expect(text).not.toMatch(/production-ready/i)
  })

  it('keeps the model table consistent with the headline metrics', () => {
    const logistics = projects.find((p) => p.slug === 'delivery-time-prediction')
    const best = logistics?.modelTable?.[0]
    expect(best?.model).toBe('LightGBM')
    const byLabel = Object.fromEntries((logistics?.results ?? []).map((m) => [m.label, m.value]))
    expect(byLabel['MAE']).toBe(`${best?.mae.toFixed(2)} min`)
    expect(byLabel['R²']).toBe(best?.r2.toFixed(2))
  })
})

describe('profile data', () => {
  it('does not expose a phone number', () => {
    expect(JSON.stringify({ profile, experience, skills })).not.toMatch(/\b\d{3}[-\s]?\d{3}[-\s]?\d{4}\b/)
  })

  it('has valid profile links and email', () => {
    expect(urlOk(profile.github)).toBe(true)
    expect(urlOk(profile.linkedin)).toBe(true)
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  })
})
