import { profile } from '../data/profile'

export default function Contact() {
  const roles = profile.openTo.map((r) => r.toLowerCase())
  const last = roles[roles.length - 1]
  return (
    <section id="contact" className="container section" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-title">
        Contact
      </h2>
      <p className="section-lede">
        The quickest way to reach me is email. I am looking for {roles.slice(0, -1).join(', ')} and {last} roles.
      </p>
      <ul className="contact-list">
        <li>
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </li>
        <li>
          <a className="btn" href={profile.linkedin} rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a className="btn" href={profile.github} rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a className="btn" href={profile.kaggle} rel="noopener noreferrer">
            Kaggle
          </a>
        </li>
      </ul>
    </section>
  )
}
