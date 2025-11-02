import { FaGithub } from 'react-icons/fa';
import React from 'react';

import styles from './index.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/KarolinaPristupa/movie-app"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footerLink}
      >
        <FaGithub />
        GitHub
      </a>
    </footer>
  );
};

export default Footer;
