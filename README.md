# Evaluate A News Article with Natural Language Processing

Fourth project of Udacity Front End Web Developer Nanodegree program.

> This project aims to build a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. When a user submits a URL of an article, the web page then dispalys sentiment analysis returned from [meaningcloud API](https://www.meaningcloud.com/products/sentiment-analysis), based on the contents of the article.

## Build Tools
* HTML
* CSS
* JavaScript
* Node
* Express
* Webpack
* meaningcloud API
* Jest
* Workbox

## Installation

- Install npm
```bash
npm install
```
- Install loaders and plugins
```bash
# Choose the necessary installation for your development mode
npm i -D @babel/core @babel/preset-env babel-loader
npm i -D style-loader node-sass css-loader sass-loader
npm i -D html-webpack-plugin
npm i -D mini-css-extract-plugin
npm i -D terser-webpack-plugin css-minimizer-webpack-plugin
```
- Sign up for an API key at [meaningcloud.com](https://www.meaningcloud.com/developer/create-account)

- Configure environment variables using dotenv package
	- Install the dotenv package
	```bash
	npm install dotenv
	```
	- Create a new `.env` file in the root of your project
	- Fill the `.env` file with your API key like this:
	```
	API_KEY=**************************
	```
- Start the project

|Command | Action|
|:------------: | :-------------:|
`npm run build-prod` | Build project
`npm start` | Run project

- Open browser at http://localhost:8081/
