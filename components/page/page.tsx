import clsx from 'clsx';
import styles from './page.module.css';

const Page = ({ children }) => (
  <section>
    <div className="max-w-4xl my-0 mx-auto relative z-10">{children}</div>
    <div className={styles.bgTopo} />
  </section>
);

export default Page;
