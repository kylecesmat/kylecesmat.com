import React from 'react';
import { Link } from 'react-router';

import styles from './header-footer.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <Link to="/" className={styles.heading}>Kyle Cesmat</Link>
      <nav role="menu">
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link
              activeClassName={styles.menuItemLinkActive}
              className={styles.menuItemLink}
              to="/"
            >
                Posts
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link
              activeClassName={styles.menuItemLinkActive}
              className={styles.menuItemLink}
              to="/about"
            >
                About
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link
              activeClassName={styles.menuItemLinkActive}
              className={styles.menuItemLink}
              to="/contact"
            >
                Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
