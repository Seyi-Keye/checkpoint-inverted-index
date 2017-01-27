(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],2:[function(require,module,exports){
module.exports=[
  {
    " ": " ",
    " ": " "
  },
  {
    " ": " ",
    " ": " "
  },
  {
    " ": " ",
    " ": " "
  },
  {
    " ": " ",
    " ": " "
  }
]
},{}],3:[function(require,module,exports){
const InvertedIndex = require('../src/inverted-index');
const correctBook = require('../books.json');
const wrongBook = require('../wrongFormat.json');
const emptyBook = require('../emptyBook.json');
const invertedIndex = new InvertedIndex();
invertedIndex.createIndex(correctBook, 'books.json');

describe('Read book data', () => {
  it('Should return false for empty JSON Array', () => {
    expect(invertedIndex.validateFile(emptyBook)[0]).toEqual(false);
  });

  it('Should return true for valid JSON Array', () => {
    expect(invertedIndex.validateFile(correctBook)[0]).toEqual(true);
  });

  it('Should return false for wrong key json file', () => {
    expect(invertedIndex.validateFile(invalidBook)[0]).toEqual(false);
  });
});

describe('Populate Index',() => {
  it('Should create index once JSON file has been read', () => {
    expect().toEqual();
  });

  it('Should ensure each key maps correct object', () => {
    expect(invertedIndex.getIndex('books.json').alice).toEqual([1]);
  });
});

describe('Search Index', () => {
  it('Should return correct index for an array of search terms', () => {
    expect(invertedIndex.searchIndex('books.json', ['alice']).toEqual(
      {'books.json':
    {'alice': [1]}
  }));
  });

  it('Should return correct index results for searched term', () => {
    expect(invertedIndex.searchIndex('books.json','alice and')).toEqual({'alice': [1], 'and': [1,2]});
  });
});
},{"../books.json":1,"../emptyBook.json":2,"../src/inverted-index":4,"../wrongFormat.json":5}],4:[function(require,module,exports){
class InvertedIndex {
  constructor() {
    this.allFiles = {};
    this.index = {};
    this.docNumber = {};
  }

  createIndex(file, fileName) {
    this.index={};
    this.docNum = []
    file.forEach((file, index) => {
      let title = file.title;
      let text = file.text;
      let docCount = index + 1;
      this.docNum.push(docCount);
      let docConcat = (`${title} ${text}`);
      let tokens = InvertedIndex.tokenize(docConcat);
      let term = new Set(tokens);
      this.assignIndex(term, docCount);
      });
    this.allFiles[fileName] = this.index;
    this.docNumber[fileName] = this.docNum;
    }

    assignIndex(item, docID) {
      item.forEach(item => {
        if (item in this.index) {
          this.index[item].push(docID);
        } else {
           this.index[item] = [docID];
           }
        });
    }

  getIndex(fileName) {
    return this.allFiles[fileName];
  }

  static tokenize(text) { // utility method
    return text.toLowerCase().match(/\w+/g)
  }

  searchIndex(fileName,query) {
    let searchQuery = [];
    let searchResult = {};
    searchQuery = InvertedIndex.tokenize(query);
    searchQuery.forEach(word => {
      if(word in this.allFiles[fileName]) {
        searchResult[word] = this.allFiles[fileName][word];
      }
    });
    return searchResult;
  }
}
module.exports = InvertedIndex;

},{}],5:[function(require,module,exports){
module.exports=[
  {
    "book": "see see see, I can see a bird ",
    "look": "My look book "
  },
  {
    "TTL": "Andela Andela Andela",
    "debrief": "TIA TIA TIA "
  }]
},{}]},{},[3])