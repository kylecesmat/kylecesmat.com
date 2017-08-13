import { style } from "glamor";

const styles = {
  figure: style({
    padding: 8
  }),
  image: style({
    width: "100%"
  })
};

export const Image = ({ src, alt, desc }) =>
  <figure className={styles.figure}>
    <img className={styles.image} src={src} alt={alt} />
    {desc &&
      <p>
        {desc}
      </p>}
  </figure>;

export default { Image };
