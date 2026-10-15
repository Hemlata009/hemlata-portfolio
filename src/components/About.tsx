import { achievements, profile } from '../data/profile'

export default function About() {
  return (
    <section id="about" className="container section" aria-labelledby="about-title">
      <h2 id="about-title" className="section-title">
        About
      </h2>
      <div className="two-col">
        <div>
          <p>
            I studied Smart Manufacturing at IIITDM Jabalpur and moved toward data because I like problems where a number
            has to be trusted. I start with the question and the data, build the simplest thing that answers it, and
            compare it against alternatives before reporting a result.
          </p>
          <p>
            My internships covered business reporting at IVISH AI Quantum and Airflow, PySpark and SQL pipelines at
            Care.fi. Outside work I build projects that connect those pieces, from dashboards to a retrieval-augmented
            chatbot with its own evaluation harness.
          </p>
          <h3>Education</h3>
          <p>
            {profile.education.school}
            <br />
            {profile.education.degree}, {profile.education.dates}
          </p>
        </div>
        <div>
          <h3>Positions and achievements</h3>
          <ul className="plain">
            {achievements.map((a) => (
              <li key={a.title}>
                <strong>{a.title}.</strong> {a.detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
