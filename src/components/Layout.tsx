import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { profile } from '../data/profile'

const NAV = [
  { label: 'Projects', hash: '#projects' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Skills', hash: '#skills' },
  { label: 'About', hash: '#about' },
  { label: 'Contact', hash: '#contact' },
]

export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="Hemlata, home">
            Hemlata
          </Link>
          <nav aria-label="Primary">
            <ul className="nav-list">
              {NAV.map((n) => (
                <li key={n.hash}>
                  <NavLink to={{ pathname: '/', hash: n.hash }} end>
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <ul className="footer-links">
            <li>
              <a href={profile.github} rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.kaggle} rel="noopener noreferrer">
                Kaggle
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>Email</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}
