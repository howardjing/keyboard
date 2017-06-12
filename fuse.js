const { WebIndexPlugin, FuseBox, EnvPlugin, BabelPlugin, UglifyJSPlugin, JSONPlugin } = require('fuse-box');

const buildFuse = (production) => {

  const plugins = [
    EnvPlugin({ NODE_ENV: production ? 'production' : 'development' }),
    WebIndexPlugin({
      template: './src/index.html',
    }),
    BabelPlugin({
      config: {
        presets: ['es2015']
      }
    }),
    JSONPlugin(),
  ];

  if (production) {
    plugins.push(UglifyJSPlugin());
  }

  return (
    FuseBox.init({
      homeDir: 'src',
      output: 'dist/$name.js',
      hash: production,
      cache: !production,
      plugins,
    })
  );
}

// bundle for prod
if (process.argv[2] === 'bundle-production') {
  const fuse = buildFuse(true);

  fuse
    .bundle('app')
    .instructions('>index.tsx');

  fuse.run();

// set up dev server
} else {
  const fuse = buildFuse(false);
  fuse.dev({});

  fuse.bundle('app')
    .watch()
    .hmr()
    .sourceMaps(true)
    .instructions('>index.tsx')

  fuse.run();
}
