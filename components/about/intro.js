import { style } from "glamor";
import colors from "../../style/colors";
import { loadIn } from "../../style/animation";
import Panel from "../panel";

const imageSize = 100;

const styles = {
  container: style({
    opacity: 0,
    margin: "0 auto",
    width: "100%",
    animation: `350ms ease-in 50ms forwards ${loadIn}`
  }),
  panel: style({
    padding: `${imageSize / 2 + 10}px 20px 20px`,
    marginTop: imageSize / 2,
    textAlign: "center"
  }),
  img: style({
    width: imageSize,
    height: imageSize,
    position: "absolute",
    top: -(imageSize / 2) + 10,
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: 200
  }),
  h1: style({
    margin: 0,
    fontSize: 42,
    fontWeight: 600
  }),
  p: style({
    fontWeight: 200
  })
};

export default () =>
  <section className={styles.container}>
    <img className={styles.img} src="/static/me.jpg" alt="kyle cesmat" />
    <Panel className={styles.panel}>
      <h1 className={styles.h1}>Kyle Cesmat</h1>
      <p className={styles.p}>
        I am a UI Engineer at Formidable, currently exploring Seattle with my
        wife & pup.
      </p>
      <p className={styles.p}>
        I make software with Node & React, and am an amateur chef, brewer, and
        breadmaker in my free time.{" "}
      </p>
    </Panel>
  </section>;
