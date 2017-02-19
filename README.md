# inverted-index

[![Build Status](https://travis-ci.org/andela-oaromokeye/checkpoint-inverted-index.svg?branch=master)](https://travis-ci.org/andela-oaromokeye/checkpoint-inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-oaromokeye/checkpoint-inverted-index/badge.svg?branch=staging)](https://coveralls.io/github/andela-oaromokeye/checkpoint-inverted-index?branch=staging)
[![Code Climate](https://codeclimate.com/github/andela-oaromokeye/checkpoint-inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-oaromokeye/checkpoint-inverted-index)

## Introduction
Inverted index takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.

## How can I get started with the app
- Upload file to be indexed using the upload button
- Select file to be indexed using the dropdown box
- Click create index button to output the index of the particular file
- Full text search can be made at the top left corner of the page.


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
- This application can only create an index for a file at a particular time and not multiply files at once.

## Contributing
 1. Fork this repository to your account.
 2. Clone to your repository: `git clone git@github.com:your-username/checkpoint-inverted-index.git`
 3. Create your feature branch: `git checkout -b new-feature`
 4. Commit your changes: `git commit -m "did something"`
 5. Push to the remote branch: `git push origin new-feature`
