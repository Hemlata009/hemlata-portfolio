import { experience } from '../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="container section" aria-labelledby="exp-title">
      <h2 id="exp-title" className="section-title">
        Experience
      </h2>
      <ol className="timeline">
        {experience.map((r) => (
          <li key={r.company}>
            <div className="role-head">
              <h3>{r.title}</h3>
              <p className="role-meta">
                {r.type} · {r.dates}
              </p>
            </div>
            <p className="company">
              {r.company} · {r.place}
            </p>
            <ul>
              {r.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
