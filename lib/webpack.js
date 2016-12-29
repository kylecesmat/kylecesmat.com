const spawn = require('cross-spawn');
const path = require('path');
const STATIC_ROUTES = require('../static-routes');

const getRoutes = (posts) => {
  let staticRoutes = STATIC_ROUTES;
  staticRoutes = staticRoutes.concat();

  posts.map((post) => staticRoutes.push(post.route));

  return staticRoutes;
};

module.exports = (posts, command) => {
  const env = process.env;
  env.POSTS = JSON.stringify(posts);
  env.STATIC_ROUTES = JSON.stringify(getRoutes(posts));

  // run build script
  const child = spawn('npm', ['run', command], {
    cwd: path.resolve(__dirname),
    stdio: [null, null, null, null],
    detached: true,
    env,
  });

  // @TODO improve output
  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`Webpack ${command} finished with with code ${code}`);
  });
};
