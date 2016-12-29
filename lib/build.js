const path = require('path');
const fs = require('fs-extra');
const fm = require('front-matter');
const webpack = require('./webpack');

const SRC = process.cwd();

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

const buildRoute = (fileName) => {
  if (fileName === 'index') {
    return '/';
  }

  return fileName;
};

const readPosts = (docsDir) => {
  const promiseArray = [];
  const docsPages = [];

  return new Promise((fulfill) => {
    fs.walk(docsDir)
      .on('data', (item) => {
        if (!item.stats.isFile()) {
          return;
        }

        const route = buildRoute(path.basename(item.path, '.md'));

        promiseArray.push(getMarkdown(item.path, 'utf8').then((parsedMarkdown) => {
          docsPages.push({
            route,
            title: parsedMarkdown.attributes.title,
            description: parsedMarkdown.attributes.description,
            markdown: parsedMarkdown.body,
          });
        }));
      }).on('end', () => {
        Promise.all(promiseArray).then(() => {
          fulfill(docsPages);
        });
      });
  });
};

readPosts(path.join(SRC, 'posts')).then((docs) => webpack(docs, process.argv[2]));
