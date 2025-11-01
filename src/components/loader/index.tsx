import React from 'react';
import styles from './index.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles['neon-loader']}>
      <div className={styles.ring}></div>
      <div className={styles.ring}></div>
      <div className={styles.ring}></div>
    </div>
  );
};

export default Loader;
