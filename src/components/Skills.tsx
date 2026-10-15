import { skills } from '../data/experience'

export default function Skills() {
  return (
    <section id="skills" className="container section" aria-labelledby="skills-title">
      <h2 id="skills-title" className="section-title">
        Skills
      </h2>
      <p className="section-lede">Technologies I have used in the projects and roles on this page.</p>
      <dl className="skills">
        {skills.map((g) => (
          <div key={g.group}>
            <dt>{g.group}</dt>
            <dd>{g.items.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
