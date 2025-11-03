import React from 'react';
import styles from './index.module.scss';

interface LoaderProps {
  fullscreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullscreen = false }) => {
  return (
    <div
      className={fullscreen ? styles.loaderOverlayFull : styles.loaderOverlay}
    >
      <div className={styles.neonLoader}></div>
    </div>
  );
};

export default Loader;
