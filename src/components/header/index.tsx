import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './index.module.scss';

type NavItem = { to: string; label: string };

const items: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/favorites', label: 'Favorites' },
];

const Header: React.FC = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const active =
      list.querySelector<HTMLAnchorElement>('a.' + styles.isActive) ||
      list.querySelector<HTMLAnchorElement>('a[aria-current="page"]');
    if (!active) return;

    const listRect = list.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();

    const left = aRect.left - listRect.left;
    const width = aRect.width;

    list.style.setProperty('--indicator-x', `${left}px`);
    list.style.setProperty('--indicator-w', `${width}px`);
  }, [pathname]);

  return (
    <header className={styles.header} role="banner">
      <nav className={styles.nav} aria-label="main navigation">
        <ul className={styles.navList} role="list" ref={listRef}>
          {items.map((item) => (
            <li key={item.to} className={styles.navItem}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.isActive}`
                    : styles.navLink
                }
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <span className={styles.indicator} aria-hidden="true" />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
