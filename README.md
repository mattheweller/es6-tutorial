## ES6 Tutorial

Start the tutorial [here](http://ccoenraets.github.io/es6-tutorial).

### Set Up Babel

As you just saw, the current version of the application runs in current browsers without compilation: it is written in pure ECMAScript 5. In this section, we set up Babel so that we can start using ECMAScript 6 features in the next unit.

Open a command prompt, and navigate (cd) to the es6-tutorial directory.

 - Type the following command to create a package.json file:

`npm init`

Press the Return key in response to all the questions to accept the default values.

- Type the following command to install the babel-cli and babel-core modules:

`npm install babel-cli babel-core --save-dev`

There are different ways to install and run Babel. For example, you could also install Babel globally and run it from the command line. Refer to the Babel documentation for more information.

Type the following command to install the ECMAScript 2015 preset:

`npm install babel-preset-es2015 --save-dev`

In Babel 6, every transformer is a plugin that can be installed separately. A preset is a group of related plugins. Using a preset, you don’t have to install and update dozens of plugins individually.
Install http-server in your project. http-server is a lightweight web server we use to run the application locally during development.

`npm install http-server --save-dev`

We are using a local web server because some parts of this tutorial require the application to be loaded using the http protocol and will not work if loaded using the file protocol.

Open package.json in your favorite code editor. In the scripts section, remove the test script, and add two new scripts: a script named babel that compiles main.js to a version of ECMAScript that can run in current browsers, and a script named start that starts the local web server. The scripts section should now look like this:

```
"scripts": {
"babel": "babel --presets es2015 js/main.js -o build/main.bundle.js",
"start": "http-server"
},
```

In the es6-tutorial directory, create a build directory to host the compiled version of the application.

### Build and Run

On the command line, make sure you are in the es6-tutorial directory, and type the following command to run the babel script and compile main.js:

 `npm run babel`

Open index.html in your code editor, and modify the `<script>` tag as follows to load build/main.bundle.js, the compiled version of js/main.js:

`<script src="build/main.bundle.js"></script>`

Open a new command prompt. Navigate (cd) to the es6-tutorial directory, and type the following command to start http-server:

`npm start`

If port 8080 is already in use on your computer, modify the start script in package.json and specify a port that is available on your computer. For example:


```
"scripts": {
"babel": "babel --presets es2015 js/main.js -o build/main.bundle.js",
"start": "http-server -p 9000"
},
```
Open a browser and access http://localhost:8080

Click the Calculate button to calculate the monthly payment for the mortgage.

Open build/main.bundle.js in your code editor and notice that the generated code is virtually identical to the source code (js/main.js). This is because the current code in main.js doesn’t include any ECMAScript 6 feature. With this setup in place, we are now ready to start using ECMAScript 6 features in the next unit.


# Setting Up Webpack


Modules have been available in JavaScript through third-party libraries. ECMAScript 6 adds native support for modules to JavaScript. When you compile a modular ECMAScript 6 application to ECMASCript 5, the compiler relies on a third party library to implement modules in ECMAScript 5. Webpack and Browserify are two popular options, and Babel supports both (and others). We use Webpack in this tutorial.

In this unit, you add Webpack to your development environment.

### Set Up Webpack

On the command line, make sure you are in the es6-tutorial directory and install the babel-loader and webpack modules:

`npm install babel-loader webpack --save-dev`

Open package.json in your code editor, and add a webpack script (right after the babel script). The scripts section should now look like this:

`"scripts": {
    "babel": "babel --presets es2015 js/main.js -o build/main.bundle.js",
    "start": "http-server",
    "webpack": "webpack"
},`

In the es6-tutorial directory, create a new file named `webpack.config.js` defined as follows:


 `var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: './js/main.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'main.bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };`

## Build Using Webpack

On the command line, make sure you are in the es6-tutorial directory and type the following command:

npm run webpack
Webpack uses Babel behind the scenes to compile your application. You can build an application using Webpack even if that application is not using ECMAScript 6 modules. In other words, the babel script in package.json is not needed anymore.
Open a browser, access http://localhost:8080, and click the Calculate button.
