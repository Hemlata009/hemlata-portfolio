import About from '../components/About'
import Contact from '../components/Contact'
import Experience from '../components/Experience'
import Hero from '../components/Hero'
import Narrative from '../components/Narrative'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import { useSeo } from '../hooks/useSeo'

export default function Home() {
  useSeo(
    'Hemlata | Data, ML and AI Engineer',
    'Hemlata builds data pipelines, analytics, machine learning models and RAG applications. Case studies with verified results and source code.',
  )
  return (
    <>
      <Hero />
      <Narrative />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </>
  )
}
