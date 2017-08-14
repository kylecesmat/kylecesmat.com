import Page from "../components/page";
import { style } from "glamor";
import { Ul, Li, Heading } from "../components/typography";
import { posts } from "../content/posts.json";
import Link from "../components/link";
import { Panel } from "../components/panel";
import typography from "../style/typography";

const styles = {
  li: style({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "left",
    fontSize: 18,
    marginBottom: 25,
    "@media(min-width: 560px)": {
      flexDirection: "row",
      marginBottom: 15
    }
  }),
  date: style({
    fontFamily: typography.mono,
    fontSize: 12,
    "@media(min-width: 560px)": {
      flexBasis: 140
    }
  }),
  heading: style({
    textAlign: "center",
    "@media(min-width: 560px)": {
      textAlign: "left"
    }
  })
};

export default () =>
  <Page title="Writing">
    <Panel>
      <Heading className={styles.heading} weight="1">
        Writing
      </Heading>
      <Ul>
        {posts.map(({ id, date, title }) =>
          <Li className={styles.li} key={id}>
            <span className={styles.date}>
              {date}
            </span>
            <Link href={`/writing/${new Date(date).getFullYear()}/${id}`}>
              {title}
            </Link>
          </Li>
        )}
      </Ul>
    </Panel>
  </Page>;
