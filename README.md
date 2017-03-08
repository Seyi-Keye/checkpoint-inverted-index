# inverted-index

[![Build Status](https://travis-ci.org/andela-oaromokeye/checkpoint-inverted-index.svg?branch=staging)](https://travis-ci.org/andela-oaromokeye/checkpoint-inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-oaromokeye/checkpoint-inverted-index/badge.svg?branch=staging)](https://coveralls.io/github/andela-oaromokeye/checkpoint-inverted-index?branch=staging)
[![Code Climate](https://codeclimate.com/github/andela-oaromokeye/checkpoint-inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-oaromokeye/checkpoint-inverted-index)

## Introduction
Inverted index takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.
## About the Application
To use this application, upload any JSON file of your choice that has the format below:
```
[
  {
    'title': 'Harry Potter',
    'text': 'A young orphan becomes a powerful wizard'
  },
  {
    'title': 'James Bond',
    'text': 'A British spy takes on dangerous criminal organizations'
  }
]
```
This application creates an Inverted Index from each text property of the JSON file. After creating the index, you can search for a word (or multiple words) in a single file or all files.


## How can I get started with the app
#### Local installation
This app can be installed and run locally. Follow the steps below
- Clone this repo
```
git clone https://github.com/andela-oaromokeye/checkpoint-inverted-index.git
```
- Install dependencies (Ensure you have [Node.js] (nodejs.org) installed first)
```
npm install
```
- Run tests
```
npm test
```
- To start the application, run the following command
```
npm start
```
This launches the app on your default browser on http://localhost:3000

- Upload file to be indexed using the upload button
- Select file to be indexed using the dropdown box
- Click create index button to output the index of the particular file
- Full text search can be made at the top right corner of the page.
#### Online
This application is hosted on Heroku and can be accessed through this [link] (https://seyi-keye-inverted-index.herokuapp.com/)

## External dependencies for the app
 - Node.js
 - EcmaScript 6 (JavaScript 2015)
 - Jasmine
 - Karma
- AngularJS

## Testing the app
 - Install npm dependencies `npm install`
 - To test the app run: `gulp watch`
 - To run the tests run: `npm test`

## Limitation
- This application can only create index for one file at a time and not multiply files at once.

## Contributing
 1. Fork this repository to your account.
 2. Clone to your repository: `git clone git@github.com:your-username/checkpoint-inverted-index.git`
 3. Create your feature branch: `git checkout -b new-feature`
 4. Commit your changes: `git commit -m "did something"`
 5. Push to the remote branch: `git push origin new-feature`

This is a link to the app on [heroku](https://seyi-keye-inverted-index.herokuapp.com/)
