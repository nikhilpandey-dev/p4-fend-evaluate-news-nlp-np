# Webpack Concepts

## [Source URL](https://webpack.js.org/concepts/)

## dependency-graph

Any time one file depends on another, webpack treats this as a dependency. This allows webpack to take non-code assets, such as images or web fonts, and also provide them as dependencies for your application.

When webpack processes your application, it starts from a list of modules defined on the command line or in its configuration file. Starting from these entry points, webpack recursively builds a dependency graph that includes every module your application needs, then bundles all of those modules into a small number of bundles - often, only one - to be loaded by the browser.

## Webpack Core Concepts

At its core, **webpack** is a *static module bundler* for modern JavaScript applications. When webpack processes your application, it internally build a [dependency graph](#dependency-graph) from one or more entry points and then combines every module your project needs into one or more bundles, which are static assets to serve your content from. 

The Core concepts of webpack are:
- Entry
- Output
- Loaders
- Plugins
- Mode
- Browser Compatibility

## Entry
<span style="text-decoration: underline;">An **entry point** indicates which module webpack should use to begin bundling out its internal dependency graph.</span> Webpack will figure out which other modules and libraries that entry point depends on (directly or indirectly).

By default its value is `./src/index.js`, but you can specify a different (or multiple entry points) by setting an entry property in the webpack configuration. For example:

```javascript
// webpack.config.js

module.exports = {
    entry: "./path/to/my/entry/file.js"
}

```

## Output

The output property tells webpack where to emit the bundles it creates and how to name these files. It defaults to `./dist/main.js` for the main output file and to the `.dist` folder for any other generated file. 

You can configure this part of the process by specifying an `output` field in your configuration:

```javascript
// webpack.config.js

const path = require('path');

module.exports = {
    entry: './path/to/my/entry/file.js'
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js',
    
    },

};

```

In the example above, we use the `output.filename` and the `output.path` properties to tell webpack the name of our bundles and where we want it to be emitted to. In case you're wondering about the path module being imported at the top, it is a core Node.js module thay gets used to manipulate file paths.

## Loaders

Out of the box, webpack only understands JavaScript and JSON files. **Loaders** allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph. 

At the high level loaders have two properties in your webpack configuration:

1. The `test` property identifies which file or files should be transformed.
1.The `use` property indicates which loaders should be used to do the transforming.

**webpack.config.js**

```javascript
//one 
const path = require('path');

module.exports = {
    output: {
        filename: 'my-first-webpack.bundle.js'
    },
    modules: {
        rules: [{ test: /\.txt$/, use: 'raw-loader' }]
    },
};

```

The configuration above has defined a `rules` property for a single module with two required properties: `test` and `use`. This tells webpack's compiler the following:

> Hey webpack compiler, when  you come across a path that resolves to a `.txt` file inside of a `require() / import` statement, use the `raw-loader` to transform it before you add it to the bundle.

## Plugins

While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

In order to use a plugin, you need to `require()`it and add it to the `plugins` array. Most plugins are customizable through options, you need to create an instance of it by calling it with the `new` operator. 

Plugins are the backbone of webpack. Webpack itself is built on the same plugin system that you use in your webpack configuration!

They also serve the purpose of doing anything else that a [loader](https://webpack.js.org/concepts/loaders/) can not do. Webpack provides many such plugins out of the box.

**webpack.config.js**

```javascript

const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built in plugins

module.exports = {
    module: {
        rules: [{ test: /\.txt$/, use: 'raw-loader'}],
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html'})],

};
        
```

In the example above, the `html-webpack-plugin`generates HTML file for your application and automatically injects all your generated bundles into this file.

Using plugins in your webpack configuration is straightforward. However, there are many use cases that are worth further exploration. For more refer to the [Plugin section of the webpack documentation](https://webpack.js.org/concepts/plugins/).

## Mode

By setting the `mode` parameter to either `development`, `production` or `none`, you can enable webpack's built-in optimization that corresponds to each environment. The default value is `production`.

```javascript

module.exports = {
    mode: 'production',
};

```

For more refer to the [mode configuration section of webpack documentation](https://webpack.js.org/configuration/mode/) and what optimization take place on each value.

## Browser Compatibility

Webpack supports all browser that are [ES5-compliant](https://kangax.github.io/compat-table/es5/) (IE8 and below are not supported). Webpack needs `Promise` for [`import()`](https://webpack.js.org/guides/code-splitting/#dynamic-imports) and [`require.ensure()`](https://webpack.js.org/guides/code-splitting/#dynamic-imports). If you want to support older browser you will need to load a polyfill before using these expressions.

## Environment

Webpack 5 runs on Node.js version 10.13.0+.

# Udacity Notes

## Lesson 2: Basics of Webpack

### Install Webpack

### Output and Loaders

What's currently wrong:
1. The distribution folder has no connection whatsoever to our app. If you start the express server, our app is still functioning exactly the same way it did in part 0.
1. The `main.js` file of our distribution folder contains none of the javascript or othets wrtoe for our webpage.

The "output" of webpack is the distribution (`dist`) folder. It is where webpack drops or "outputs" the neat bundles of assets it creates from the individual files we point it to.

`dist` stands for distribtuion and it stands really next to `src` folder. 
