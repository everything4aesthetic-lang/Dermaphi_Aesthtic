const path = require('node:path');
const esbuild = require('esbuild');

function buildAeroShards() {
  esbuild.buildSync({
    entryPoints: [path.join(__dirname, 'AeroShards.jsx')],
    bundle: true,
    outfile: path.join(__dirname, 'assets/aero-shards.js'),
    format: 'iife',
    globalName: 'DermaphiAeroShards',
    alias: {
      'react': path.join(__dirname, 'react-shim.js')
    },
    loader: { '.jsx': 'jsx', '.css': 'text' },
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  });
  console.log('Built assets/aero-shards.js bundle synchronously using alias.');
}

if (require.main === module) {
  buildAeroShards();
}

module.exports = { buildAeroShards };
