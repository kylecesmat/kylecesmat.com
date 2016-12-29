import React, { PropTypes } from 'react';

import styles from './page.css';

const Page = ({ children }) => (
  <main className={styles.wrapper}>
    <section className={styles.container}>
      {children}
    </section>
  </main>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
