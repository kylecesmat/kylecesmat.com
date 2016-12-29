import React, { PropTypes } from 'react';

import styles from './page.css';

const Page = ({ children, title }) => (
  <main className={styles.wrapper}>
    <section className={styles.container}>
      {title && <h1 className={styles.heading}>{title}</h1>}
      {children}
    </section>
  </main>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
