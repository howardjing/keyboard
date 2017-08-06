const { WebIndexPlugin, FuseBox, EnvPlugin, BabelPlugin, UglifyJSPlugin, JSONPlugin, CopyPlugin } = require('fuse-box');
const path = require('path');
const express = require('express');

const DEV_OUTPUT_DIR = 'dist';

/**
 * env: production | development
 */
const buildFuse = ({ env }) => {

  // TODO: figure out how to store google analytics key in a variable
  // so only one index.html is necessary
  const production = env === 'production';
  const index = production ? 'index.prod.html' : 'index.dev.html';
  const config = production ? 'config.prod.js' : 'config.dev.js';
  const outputDir = production ? 'dist-prod' : DEV_OUTPUT_DIR;

  const CONFIG = require(`./${config}`);
  const plugins = [
    EnvPlugin({ NODE_ENV: env, CONFIG }),
    WebIndexPlugin({
      template: `./src/${index}`,
    }),
    BabelPlugin({
      config: {
        presets: ['es2015']
      }
    }),
    JSONPlugin(),
    CopyPlugin({ files: ['*.ico'], dest: 'assets' })
  ];

  if (production) {
    plugins.push(UglifyJSPlugin());
  }

  return (
    FuseBox.init({
      homeDir: 'src',
      output: `${outputDir}/$name.js`,
      hash: production,
      cache: !production,
      plugins,
    })
  );
}

// bundle for prod
if (process.argv[2] === 'bundle-production') {
  const fuse = buildFuse({ env: 'production' });

  fuse
    .bundle('app')
    .instructions('>index.tsx')
    .target('browser');

  fuse.run();

// set up dev server
} else {
  const fuse = buildFuse({ env: 'development' });
  fuse.dev({}, server => {
    const dist = path.resolve(`./${DEV_OUTPUT_DIR}`);
    const app = server.httpServer.app;

    // serve static files
    app.use(express.static(dist));

    // fall back to index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(dist, 'index.html'));
    })
  });

  fuse.bundle('app')
    .watch()
    .sourceMaps(true)
    .instructions('>index.tsx')
    .target('browser');

  fuse.run();
}
