import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'

export default function NotFound() {
  useSeo('Page not found | Hemlata', 'This page does not exist.')
  return (
    <section className="container section not-found">
      <h1>Page not found</h1>
      <p>That address does not match anything on this site.</p>
      <Link className="btn btn-primary" to="/">
        Back to the portfolio
      </Link>
    </section>
  )
}
