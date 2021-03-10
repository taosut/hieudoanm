import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <Link href={'/'}>
          <a className="navbar-brand">HIEU</a>
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link href={'/github/languages'}>
              <a className="nav-link">Languages</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
