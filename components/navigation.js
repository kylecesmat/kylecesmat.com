import { style } from 'glamor'
import Link from './link';
import colors from '../style/colors';
import layout from '../style/layout';

export default () => (
  <nav className={styles.nav}>
    <ul className={styles.ul}>
      <li className={styles.li}>
        <Link custom activeClassName={styles.activeLink} href='/' className={styles.link}>
          About
        </Link>
      </li>
      <li className={styles.li}>
        <Link custom activeClassName={styles.activeLink} className={styles.link} href='/work'>
          Work
        </Link>
      </li>
      <li className={styles.li}>
        <Link custom activeClassName={styles.activeLink} className={styles.link} href='/writing'>
          Writing
        </Link>
      </li>
      <li className={styles.li}>
        <Link custom activeClassName={styles.activeLink} className={styles.link} href='/contact'>
          Contact
        </Link>
      </li>
    </ul>
  </nav>
)

const styles = {
  nav: style({
    display: 'flex',
    alignIems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkGray,
    color: colors.white
  }),
  ul: style({
    padding: 15,
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    flex: `0 1 420px`,
  }),
  li: style({
    listStyle: 'none',
  }),
  link: style({
    color: colors.darkGrayLight,
    textTransform: 'uppercase',
    padding: 10,
    fontSize: 14,
    fontWeight: 700,
    ':hover': {
      color: colors.white
    },
  }),
  activeLink: style({
    color: colors.white,
  })
}