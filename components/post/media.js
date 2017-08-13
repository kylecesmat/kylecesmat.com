import { style } from "glamor";

const styles = {
  figure: style({
    padding: 8
  })
};

const Image = ({ src, alt, desc }) =>
  <figure className={styles.figure}>
    <img src={src} alt={alt} />
    {desc &&
      <p>
        {desc}
      </p>}
  </figure>;

export default { Image };
