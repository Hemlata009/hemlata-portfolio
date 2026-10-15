import { Link } from 'react-router-dom'
import { profile } from '../data/profile'

export default function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <p className="eyebrow">
        {profile.name} · {profile.education.degree}, {profile.education.dates}
      </p>
      <h1 id="hero-title">{profile.headline}</h1>
      <p className="lede">{profile.intro}</p>
      <div className="actions">
        <Link className="btn btn-primary" to={{ pathname: '/', hash: '#projects' }}>
          See the projects
        </Link>
        <a className="btn" href={profile.github} rel="noopener noreferrer">
          GitHub
        </a>
        <a className="btn" href={profile.linkedin} rel="noopener noreferrer">
          LinkedIn
        </a>
        <Link className="btn" to={{ pathname: '/', hash: '#contact' }}>
          Contact
        </Link>
      </div>
      <p className="open-to">
        <span>Open to:</span> {profile.openTo.join(' · ')}
      </p>
    </section>
  )
}
