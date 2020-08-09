import Page from '@components/page';
import Head from 'next/head';

const Currently = () => (
  <Page>
    <Head>
      <title>Kyle Cesmat - Currently</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <section className="p-5">
      <div className="py-20">
        <h1 className="text-4xl font-semibold">Here's what I'm doing currently.</h1>
        <div className="text-lg font-normal italic text-gray-700">
          What I'm focusing on, learning, or doing in my free time. Last updated August 2020.
        </div>
      </div>
    </section>
    <section className="p-10 bg-white">
      <h2 className="text-xl font-semibold">Currently Located</h2>
      <p>
        Right now trying to survive summer in Phoenix, AZ and looking forward to fall when I can
        enjoy my{' '}
        <a href="https://www.strava.com/athletes/5662858" target="_blank noreferrer noopener">
          bike rides
        </a>{' '}
        again.
      </p>
      <h2 className="text-xl font-semibold">Currently Building</h2>
      <p>
        I've been working full-time on a site re-platforming using NextJS and GraphQL, along with
        working through the various steps of productionability. I'm learning more about CDN caching
        strategy, how to optimize a server-rendered react app for +1M users, and maintaining lots of
        middleware to manage localization and business rules for a global deployment.
      </p>
      <h2 className="text-xl font-semibold">Currently Reading</h2>
      <p>
        These are a few of the books I am reading through currently. I also have 'Get Together' and
        'Working in Public' published by <a href="https://press.stripe.com/">Stripe Press</a> that I
        plan to pickup soon. I also purchased a kindle recently and read through{' '}
        <a
          href="https://www.goodreads.com/book/show/42046112-recursion"
          target="_blank noreferrer noopener"
        >
          Recursion
        </a>{' '}
        and really enjoyed it.
      </p>
      <img src="images/aug-2020-books.JPG" className="mb-4" />
      <h2 className="text-xl font-semibold">Newest Accomplishment</h2>
      <p>
        Despite being held inside during COVID and Phoenix summer, I've still managed to stay in
        great yoga & biking shape and finding ways to keep my mental health in check during these
        stay-at-home days.
      </p>
      <p>
        I've also been getting better at building things with my hands, and recently built a few
        hexagon shelves like these that I'm pretty proud of.
      </p>
    </section>
  </Page>
);

export default Currently;
