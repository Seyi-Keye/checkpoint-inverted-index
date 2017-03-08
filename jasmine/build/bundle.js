(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[{
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]
},{}],2:[function(require,module,exports){
module.exports=[]
},{}],3:[function(require,module,exports){
module.exports=[
  {"title": "New start",
  "text": "This is a testcase"
  },
  {"title": "Very well",
  "text": "This is TIA"
  }
]
},{}],4:[function(require,module,exports){
/* eslint import/no-unresolved: 2*/
const invertedIndex = new InvertedIndex();
const books = require('../books');
const testing = require('../testing');
const emptyBook = require('../emptyBook');
const wrongFormat = require('../wrongFormat');
const note = require('../note');
const notFileType = require('../what');

describe('Read book data', () => {
  it('Should return false for empty JSON Array', () => {
    expect(InvertedIndex.isValidContent(emptyBook)).toEqual(false);
  });

  it('Should return false for invalid JSON file', () => {
    expect(InvertedIndex.fileIsValid(notFileType)).toEqual(false);
  });

  it('Should return false for wrong key json file', () => {
    expect(InvertedIndex.isValidContent(wrongFormat)).toEqual(false);
  });
});

describe('Populate Index', () => {
  it('should verify that index is created once JSON file has been read',
    () => {
      invertedIndex.createIndex('note', note);
      expect(Object.prototype.hasOwnProperty.call(invertedIndex.allFiles,
        'note')).toEqual(true);
      expect(Object.keys(invertedIndex.getIndex('note')).length).not.toEqual(0);
      expect(invertedIndex.getIndex('note')).toEqual({
        this: [0, 1],
        is: [0, 1],
        a: [0],
        testcase: [0],
        tia: [1]
      });
    });

  it('Should ensure each key maps correct object', () => {
    invertedIndex.createIndex('books', books);
    expect(invertedIndex.getIndex('books').alice).toEqual([0]);
  });
});

describe('Search Index', () => {
  it('Should return correct index for search terms', () => {
    expect(invertedIndex.searchIndex('alice a of', 'books')).toEqual({
      books: {
        alice: [0],
        a: [0, 1],
        of: [0, 1]
      }
    });
  });

  it('should return search result if an array is passed in as search term',
    () => {
      invertedIndex.createIndex('testing', testing);
      expect(invertedIndex.searchIndex(['alice', 'man'], 'books')).toEqual({
        books: {
          alice: [0],
          man: [1]
        }
      });

      expect(invertedIndex.searchIndex(['seyi', 'in', 'amity'],
        'testing')).toEqual({
          testing: {
            seyi: [0, 1],
            in: [],
            amity: []
          }
        });
    });

  it('Should return correct index results for searched term', () => {
    expect(invertedIndex.searchIndex('alice a', 'testing')).toEqual({
      testing: {
        alice: [],
        a: [0, 1]
      }
    });
  });

  it('should go through all indexed files if a filename is not passed',
    () => {
      expect(invertedIndex.searchIndex('alice a')).toEqual({
        books: {
          alice: [0],
          a: [0, 1]
        },
        testing: {
          alice: [],
          a: [0, 1]
        },
        note: {
          alice: [],
          a: [0]
        }
      });
    });
});

},{"../books":1,"../emptyBook":2,"../note":3,"../testing":5,"../what":6,"../wrongFormat":7}],5:[function(require,module,exports){
module.exports=[
  {
    "title": "seyi is a girl",
    "text": "Is seyi a boy or what?"

  },

  {
    "title": "Andela is a TIA",
    "text": "Is seyi a she?? or a he??, TIA, you mean"}
]
},{}],6:[function(require,module,exports){
const what = 'welcome to Andela';

},{}],7:[function(require,module,exports){
module.exports=[
  {
    "book": "see see see, I can see a bird ",
    "look": "My look book "
  },
  {
    "TTL": "Andela Andela Andela",
    "debrief": "TIA TIA TIA "
  }]
},{}]},{},[4])