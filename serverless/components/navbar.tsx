import Link from 'next/link';

export default function Navbar() {
  const navItems = [
    { link: '/apps/dev-to', text: 'DevTo' },
    { link: '/apps/github', text: 'GitHub' }
  ];
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <Link href={'/'}>
          <a className="navbar-brand">HIEU</a>
        </Link>
        <ul className="navbar-nav mr-auto">
          {navItems.map((item, index: number) => {
            const { link, text } = item;
            return (
              <li key={`nav-item-${index}`} className="nav-item">
                <Link href={link}>
                  <a className="nav-link">{text}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
