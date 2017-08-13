import React from 'react';

import styles from 'js/components/splash/style.pcss';

const Splash = () => (
  <div className={styles.splashScreen}>
    <span />
    <section className={styles.splashScreenContent}>
      <h1 className={styles.splashScreenTitle}>
        tapdown
      </h1>
      <a href="#" role="button" className={styles.splashScreenNewGameButton}>
        New Game
      </a>
    </section>
    <footer className={styles.splashScreenFooter}>
      <p>
        Made with
        <span className={styles.splashScreenHighlight}> ❤ </span>
        by <a
          className={styles.splashScreenHighlight}
          href="https://github.com/brennie"
        >
          brennie
        </a>.
      </p>
    </footer>
  </div>
);

export default Splash;
