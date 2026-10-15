import { Link, useParams } from 'react-router-dom'
import ModelTable from '../components/ModelTable'
import { getProject, projects } from '../data/projects'
import { CATEGORY_LABELS } from '../data/types'
import { useSeo } from '../hooks/useSeo'
import NotFound from './NotFound'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  useSeo(
    project ? `${project.title} | Hemlata` : 'Project not found | Hemlata',
    project ? project.summary : 'This project does not exist.',
  )

  if (!project) return <NotFound />

  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="container project">
      <p className="crumb">
        <Link to={{ pathname: '/', hash: '#projects' }}>← All projects</Link>
      </p>
      <p className="card-cats">{project.categories.map((c) => CATEGORY_LABELS[c]).join(' · ')}</p>
      <h1>{project.title}</h1>
      <p className="lede">{project.summary}</p>
      <ul className="tags" aria-label="Technologies">
        {project.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="actions">
        {project.repo ? (
          <a className="btn btn-primary" href={project.repo} rel="noopener noreferrer">
            View source on GitHub
          </a>
        ) : (
          <span className="note">Source code is not public yet.</span>
        )}
        {project.demo && (
          <a className="btn" href={project.demo} rel="noopener noreferrer">
            Live demo
          </a>
        )}
      </div>

      <section aria-labelledby="flow-title">
        <h2 id="flow-title">Workflow</h2>
        <ol className="flow">
          {project.workflow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <div className="case-grid">
        <section aria-labelledby="problem-title">
          <h2 id="problem-title">Problem</h2>
          <p>{project.problem}</p>
        </section>
        <section aria-labelledby="objective-title">
          <h2 id="objective-title">Objective</h2>
          <p>{project.objective}</p>
        </section>
        <section aria-labelledby="data-title">
          <h2 id="data-title">Data</h2>
          <p>{project.data}</p>
        </section>
      </div>

      <section aria-labelledby="approach-title">
        <h2 id="approach-title">Technical approach</h2>
        <ol className="steps">
          {project.approach.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="decisions-title">
        <h2 id="decisions-title">Key decisions</h2>
        <ul>
          {project.decisions.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="results-title">
        <h2 id="results-title">Results</h2>
        {project.results.length > 0 && (
          <dl className="metrics">
            {project.results.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
                {m.note && <dd className="metric-note">{m.note}</dd>}
              </div>
            ))}
          </dl>
        )}
        {project.modelTable && <ModelTable rows={project.modelTable} />}
        {project.resultsNote && <p className="results-note">{project.resultsNote}</p>}
      </section>

      <div className="case-grid two">
        <section aria-labelledby="limits-title">
          <h2 id="limits-title">Limitations</h2>
          <ul>
            {project.limitations.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="next-title">
          <h2 id="next-title">What I would do next</h2>
          <ul>
            {project.next.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      </div>

      <nav className="next-project" aria-label="Next project">
        <span>Next project</span>
        <Link to={`/projects/${next.slug}`}>{next.title} →</Link>
      </nav>
    </article>
  )
}
