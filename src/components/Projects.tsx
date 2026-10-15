import { Link, useSearchParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { CATEGORY_LABELS, type Category } from '../data/types'

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[]

function isCategory(v: string | null): v is Category {
  return v !== null && (CATEGORIES as string[]).includes(v)
}

export default function Projects() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('cat')
  const active = isCategory(raw) ? raw : null
  const visible = active ? projects.filter((p) => p.categories.includes(active)) : projects

  function choose(cat: Category | null) {
    const next = new URLSearchParams(params)
    if (cat) next.set('cat', cat)
    else next.delete('cat')
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <section id="projects" className="container section" aria-labelledby="projects-title">
      <h2 id="projects-title" className="section-title">
        Projects
      </h2>
      <p className="section-lede">
        Each project has a case study with the problem, approach, measured results and limitations.
      </p>
      <div className="filters" role="group" aria-label="Filter projects by category">
        <button type="button" aria-pressed={active === null} onClick={() => choose(null)}>
          All
        </button>
        {CATEGORIES.map((c) => (
          <button key={c} type="button" aria-pressed={active === c} onClick={() => choose(c)}>
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} projects shown
      </p>
      {visible.length === 0 ? (
        <p className="empty">No projects in this category yet.</p>
      ) : (
        <ul className="cards">
          {visible.map((p) => (
            <li key={p.slug} className="card">
              <p className="card-cats">{p.categories.map((c) => CATEGORY_LABELS[c]).join(' · ')}</p>
              <h3>
                <Link to={`/projects/${p.slug}`}>{p.title}</Link>
              </h3>
              <p>{p.summary}</p>
              <ul className="tags" aria-label="Technologies">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="card-links">
                <Link to={`/projects/${p.slug}`}>Case study</Link>
                {p.repo && (
                  <a href={p.repo} rel="noopener noreferrer">
                    Source code
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
