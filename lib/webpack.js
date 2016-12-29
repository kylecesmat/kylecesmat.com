const spawn = require('cross-spawn');
const path = require('path');

const staticRoutes = (docs) => {
  const routes = [];

  docs.map((doc) => routes.push(doc.route));

  return routes;
};

module.exports = (docs, command) => {
  const env = process.env;
  env.POSTS = JSON.stringify(docs);
  env.STATIC_ROUTES = JSON.stringify(staticRoutes(docs));

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
