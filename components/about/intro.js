import { style, css } from 'glamor';
import colors from '../../style/colors';

export default () => (
  <section className={styles.container}>
    <img className={styles.img} src="/static/me.jpg" />
    <div className={styles.panel}>
      <h1 className={styles.h1}>Kyle Cesmat</h1>
      <p className={styles.p}>I am a UI Engineer at Formidable, currently exploring Seattle with my wife & pup.</p>
      <p className={styles.p}>I make software with Node & React, and am an amateur chef, brewer, and breadmaker in my free time. </p>
    </div>
  </section>
)

const imageSize = 100;

const loadIn = css.keyframes('loadIn', {
  '0%': { transform: 'translateY(40px)', opacity: 0 },
  '70%': { transform: 'translateY(10px)', opacity: 0.8 },
  '100%': { transform: 'translateY(0)', opacity: 1 }
});

const styles = {
  container: style({
    margin: '0 auto',
    width: '100%',
    animation: `350ms ease-in 50ms forwards ${loadIn}`,
  }),
  panel: style({
    backgroundColor: colors.white,
    padding: `${(imageSize / 2) + 10}px 20px 20px`,
    marginTop: imageSize/2,
    textAlign: 'center',
    borderRadius: 4,
    color: colors.darkGray,
  }),
  img: style({
    width: imageSize,
    height: imageSize,
    position: 'absolute',
    top: -(imageSize / 2) + 10,
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: 200,
  }),
  h1: style({
    margin: 0,
    fontSize: 42,
    fontWeight: 600,
  }),
  p: style({
    fontWeight: 200,
  }),
};