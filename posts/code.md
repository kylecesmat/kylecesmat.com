---
title: Code Example
date: '2016-12-29T06:47:04+00:00'
description: Some example code!
---
Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.

Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna.

Sed posuere consectetur est at lobortis. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur.

This will be some example code:

```
const getMarkdown = (docPath, enc) => new Promise((fulfill, reject) => {
  fs.readFile(docPath, enc, (err, md) => {
    if (err) {
      reject(err);
    } else {
      const parsedMarkdown = fm(md);
      fulfill(parsedMarkdown);
    }
  });
});
```

```js
const getMarkdown = (docPath, enc) => new Promise((fulfill, reject) => {
  fs.readFile(docPath, enc, (err, md) => {
    if (err) {
      reject(err);
    } else {
      const parsedMarkdown = fm(md);
      fulfill(parsedMarkdown);
    }
  });
});
```

And here is some `inline` code. And `const example = new Date()` is another one.
