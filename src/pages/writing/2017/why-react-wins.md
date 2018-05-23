---
path: "/writing/2017/pattern-libraries"
date: "2017-05-10"
title: "Why React Wins"
---

I'll be honest, I do not have a computer-science background and have not experiemented too far outside the realm of javascript. These thoughts are constructed with my knowledge of how the web works and how I have built some not-so-terrible applications for the web, and I truly believe
Javascript is the best tool for the job. React in particular, provides a great starting point to
build intuitive interfaces with a minimal cost. Cost here being, developer time, longterm
maintenance, user performance, and actual paper money. Let's break down these costs:

###Saving on Developer Time
It's a great time to be a developer for the web. Using `create-react-app` you are
able to quickly develop, and build a publishable bundle & get it online. Building a 'javascript
bundle' in the past often meant tracking down an opinionated boilerplate, copying & pasting gulp
scripts, setting up a developer environment with MAMP, etc. So much time had gone into setting
up a single build environment just to create a place to write code & build it - and with `create-react-app` beginners & experienced people alike can get started with a few
commands. I do understand it's not overly complex to create an html & css file by hand and get
that online, but integrating maintainable javascript to a project like that often entails an
uphill climb of various build tools & such as complexity grows.

### Saving on Longterm Maintenance

Modules are the future they say! In traditional MVC application development, the codepath for a
feature might be obscure & bi-directional, meaning over time legacy code can grow obtrusive and
hard to reason-about, especially when intertwined with modern features. React encourages
"modularized" development, often meaning that the bulk of a view could be comprised in a single
container that consumes a set of props. If you needed to remove a feature, you can detach this
container tree and all it's children pretty easily. Modernizing this code might entail replacing
the container and ensuring it's providing/consuming the same props, just now with all-new
internals. This "prop-based" API can make react modules easily interchangeable, shareable, and
testable. It's great!
<Heading weight="3">Saving on User Performance</Heading>
React is fast, we know this. We also know, it's not the fastest or the smallest library when
compared to projects like Preact, Vue, Inferno, Svetle, Elm, etc. However, the React ecosystem
has provided great tools and best-practices to enhance perceived user performance, and deliver
rendered DOM nodes to the browser as quickly as possible. [React Virtualized](https://github.com/bvaughn/react-virtualized) is a project aimed at solving a common front-end performance challenge: rendering large lists of
tabular data. The project achieves this goal by heavily utilizing pure components, functional
props, and higher-order components. Frontend bottlenecks are often caused by mutations or
operating on impure data which requires constant re-renderings, which React Virtualized avoids.
React also provides a built in `shouldComponentUpdate` API that many
performance-centric projects utilize to perform prop/state comparisons, blocking non-critical
rendering. For a more in-depth look on why Twitter chose React, and how they shipped a
high-performance web app, check out [Twitter Lite and High Performance React Progressive Web Apps at Scale](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3)

### Saving Actual Paper Money

This is the kicker for React, and why I think every team should bias towards using React. The
developer-overhead is pretty low for React, because:

1.  Components & prop-based APIs are easy to reason about. Teams can onboard and level up
    developers without too much friction. Designers have been known to contribute to React
    projects, as JSX is very resemblant to HTML.

2.  The ecosystem provides a fantastic array of solutions. It's likely that the next
    technical hurdle your team faces has been solved, and proven by a community-maintained
    module. Save on solving non-trivial problems, and help give back improvements by adopting an
    open-source React module.

3.  Cheap to deploy. React is pretty un-opinionated where it gets built, and can be configured
    to output to static HTML which can be served on a static CDN. More traditionally, a
    single-page app bundle can be generated & also be served by a static CDN. Integrating React
    into a server-generated environment can also be done with free, open-sourced tooling which
    doesn't lock you down to a specific hosting environment.

## You're learning more than just React</Heading>

Possibly the number-one reason why React wins, is because it's so closely-tied into modern
Javascript, and is a great tool to use for continued learning. In my experience, solving
problems using React allows me to utilize native browser APIs, and modern javascript programming
to solve a problem, while React is really only used to control the component lifecycle and
actual rendering. Other frameworks like Angular or Ember impose strict guidelines and
pre-ordained methodologies for writing code, while not exposing developers to much room for their
own decision making. Some view this as a strength, where they see a framework as a tool for
providing heavy-handed solutions, while I believe it's a limitation and ultimately limits the
developers creativity & toolbelt, and can also lead to developers becoming "framework experts".
I have no desire to brand myself as a "React Developer", nor do I want to be limited to only
using one tool to solve problems.
