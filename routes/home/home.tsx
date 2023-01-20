import React from 'react';
import Link from 'next/link';
import Page from '@components/page';
import Timeline from '@components/timeline';
import Head from 'next/head';

const RecentProjectTimelineItems = [
  {
    title: 'Global eCommerce Re-Platforming',
    description: 'NextJS / Graphql / Node',
    secondaryDescription: 'Oct 2019 - Ongoing',
  },
  {
    title: 'Realtime Trading Terminal',
    description: 'Websocket / Redux / Typescript',
    secondaryDescription: 'Sept 2018 - Oct 2019',
  },
  {
    title: 'Corporate Software Licensing Tool',
    description: 'Redux / Node / SQL / Lerna',
    secondaryDescription: 'May 2018 - Sept 2018',
  },
  {
    title: 'Speedtest.net Data Visualization',
    description: 'SVG / Redux / Mapbox',
    secondaryDescription: 'July 2018 - May 2017',
  },
  {
    title: 'Medical Outcome Tracker',
    description: 'Devops / SVG / Redux',
    secondaryDescription: 'March 2017 - July 2018',
  },
  {
    title: 'Geospatial Analysis for Agriculture',
    description: 'Redux / Mapbox / Flow',
    secondaryDescription: 'November 2016 - March 2017',
  },
  {
    title: 'Speedtest Custom',
    description: 'Websocket / Pattern Library / SQL',
    secondaryDescription: 'June 2016 - November 2016',
  },
];

const SpeakingTimelineItems = [
  {
    title: 'Realtime Data With Hooks',
    description: 'PHX ReactJS Meetup - Feb 2019',
    secondaryDescription: (
      <a href="https://github.com/kylecesmat/phxreact-realtime-hooks">View on Github</a>
    ),
  },
  {
    title: 'Introduction to Svelte',
    description: 'PhoenixJS Meetup - Jan 2019',
    secondaryDescription: '',
  },
  {
    title: 'Questionable Decisions w/ React.Context',
    description: 'PHX ReactJS Meetup - May 2018',
    secondaryDescription: (
      <a href="https://github.com/kylecesmat/phxreact-context-may-2018">View on Github</a>
    ),
  },
  {
    title: 'Progressive Webapps With ReactJS',
    description: 'PHX ReactJS Meetup - Dec 2017',
    secondaryDescription: (
      <a href="https://github.com/kylecesmat/phxreactjs-progressive-webapps">View on Github</a>
    ),
  },
];

const Home = () => (
  <Page>
    <Head>
      <title>Kyle Cesmat - Home</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <section className="p-5">
      <div className="py-20">
        <h1 className="text-4xl sm:text-5xl font-semibold">Kyle Cesmat</h1>
        <div className="text-2xl mb-2">Software Engineer</div>
        <div className="text-lg font-normal italic text-gray-700">
          I lead teams and build experiences for the modern web.
        </div>
      </div>
    </section>
    <section className="p-10 bg-white">
      <p>
        I am a software person who works with teams large & small to solve technical problems on the
        web. At Formidable I focus primarily on front-end expierences, optimizing application
        performance, building sustainable components & patterns for teams, and trying not to break
        too many things along the way!
      </p>

      <p>
        I balance my time with hiking, biking, reading, and traveling. I like all things food & bev,
        cooking, and baking bread. On the weekends I like road trips and camping in the woods with
        my wife & my dog.
      </p>
      <Link href="/currently">
        <a>See what I'm up to currently →</a>
      </Link>
    </section>
    <section className="p-10">
      <h2 className="text-center text-2xl font-semibold mb-2">Recent Projects</h2>
      <p className="mb-10 text-center">
        This is a handful of the projects I have worked on for the last four years at{' '}
        <a href="https://formidable.com/" target="_blank nofollow noreferrer">
          Formidable
        </a>
        . Being that I am a consultant, and am often bound by an NDA, details of the projects are
        light.
      </p>
      <Timeline items={RecentProjectTimelineItems} />
    </section>
    <section className="p-10">
      <h2 className="text-center text-2xl font-semibold mb-2">Speaking</h2>
      <p className="mb-10 text-center">
        I enjoy sharing in the open, and have gotten the opportunity to share at a few local
        meetups.
      </p>
      <Timeline items={SpeakingTimelineItems} />
    </section>
  </Page>
);

export default Home;
