const webpack = require('webpack');
const { addBabelPlugin } = require('customize-cra');

module.exports = function override(config) { 
		const fallback = config.resolve.fallback || {}; 
    addBabelPlugin('babel-plugin-styled-components'),

		Object.assign(fallback, { 
    	"crypto": require.resolve("crypto-browserify"), 
      "stream": require.resolve("stream-browserify"), 
      "assert": require.resolve("assert"), 
      "http": require.resolve("stream-http"), 
      "https": require.resolve("https-browserify"), 
      "os": require.resolve("os-browserify"), 
      "url": require.resolve("url"),

      "path": require.resolve("path-browserify"),
      "fs": false,
      "zlib": require.resolve("browserify-zlib"),
      "net": false,
      "child_process": false,
      "tls": false,


      }) 
   config.resolve.fallback = fallback; 
   config.plugins = (config.plugins || []).concat([ 
   	new webpack.ProvidePlugin({ 
    	process: 'process/browser', 
      Buffer: ['buffer', 'Buffer'] 
    }) 
   ]) 
   return config; }