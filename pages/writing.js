import Page from "../components/page";
import { Ul, Li, Heading } from "../components/typography";
import { posts } from "../content/posts.json";
import Link from "../components/link";
import { Panel } from "../components/panel";

export default () =>
  <Page>
    <Panel>
      <Heading weight="1">Writing</Heading>
      <Ul>
        {posts.map(({ id, date, title }) =>
          <Li key={id}>
            <Link href={`/${new Date(date).getFullYear()}/${id}`}>
              {title}
            </Link>
          </Li>
        )}
      </Ul>
    </Panel>
  </Page>;
