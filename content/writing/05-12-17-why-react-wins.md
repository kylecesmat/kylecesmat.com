# Why React Wins
I'll be honest, I do not have a computer-science background and have not expiremented too far outside the realm of javascript. These thoughts are constructed with my knowledge of how the web works and how I have built some not-so-terrible applications for the web, and I truly believe Javascript is the best tool for the job.

React in particular, provides a great starting point to build intuitive interfaces with a minimal cost. Cost here being, developer time, longterm maintenence, user performance, and actual paper money. Let's break down these costs:

### Saving on Developer Time
It's a great time to be a developer for the web. Using `create-react-app` you are able to quickly develop, and build a publishable bundle & get it online. Building a 'javascript bundle' in the past often meant tracking down an opinionated boilerplate, copying & pasting gulp scripts, setting up a developer environment with MAMP, etc. So much time had gone into setting up a single build environment just to create a place to write code & build it - and with `create-react-app` beginners & expirenced people alike can get started with a few commands.

I do understand it's not overly complex to create an html & css file by hand and get that online, but integrating maintainable javascript to a project like that often entails an uphill climb of various build tools & such as complexity grows.

### Saving on Longterm Maintenence
Modules are the future they say! In traditional MVC application development, the codepath for a feature might be obscure & bi-directional, meaning over time legacy code can grow obtrusive and hard to reason-about, especially when intertwined with modern features.

React encourages "modularized" development, often meaning that the bulk of a view could be comprised in a single container that consumes a set of props. If you needed to remove a feature, you can detatch this container tree and all it's children pretty easily. Modernizing this code might entail replacing the container and ensuring it's providing/consuming the same props, just now with all-new internals.

This "prop-based" API can make react modules easily interchangable, shareable, and testable. It's great!

### Saving on User Performance

### Saving Actual Paper Money

## You're learning more than just React
