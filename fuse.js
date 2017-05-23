const { WebIndexPlugin, FuseBox } = require('fuse-box');

const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.js',
  plugins: [
    WebIndexPlugin({
      template: './src/index.html',
    }),
  ],
});

fuse.dev({});

fuse
  .bundle('app')
  .watch()
  .hmr()
  .sourceMaps(true)
  .instructions('>index.tsx');

fuse.run();
