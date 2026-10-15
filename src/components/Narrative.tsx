import { Link } from 'react-router-dom'
import { narrative } from '../data/profile'

export default function Narrative() {
  return (
    <section className="container narrative" aria-labelledby="narrative-title">
      <h2 id="narrative-title" className="section-title">
        One path, four stages
      </h2>
      <ol className="stages">
        {narrative.map((s, i) => (
          <li key={s.stage}>
            <span className="stage-num" aria-hidden="true">
              {i + 1}
            </span>
            <h3>
              <Link to={{ pathname: '/', search: `?cat=${s.category}`, hash: '#projects' }}>{s.stage}</Link>
            </h3>
            <p>{s.line}</p>
            <p className="proof">{s.proof}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
