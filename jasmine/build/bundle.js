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
const invertedIndex = new InvertedIndex();
const book = require('../books.json');
const book1 = require('../testing.json');
const emptyBook = require('../emptyBook.json');
const wrongFormat = require('../wrongFormat.json');
const notFileType = require('../what');

invertedIndex.createIndex(book, 'books.json');

describe('Inverted Index', () => {
  describe('Read book data', () => {
    it('Should return false for empty JSON Array', () => {
      expect(InvertedIndex.isValidContent(emptyBook).status).toEqual(false);
    });

    it('Should return false for invalid JSON file', () => {
      expect(InvertedIndex.fileIsValid(notFileType).status).toEqual(false);
    });

    it('Should return false for wrong key json file', () => {
      expect(InvertedIndex.isValidContent(wrongFormat).status).toEqual(false);
    });

    describe('Populate Index', () => {
      it('Should create index once JSON file has been read', () => {
        expect(invertedIndex.getIndex('books.json')).toBeDefined();
      });

      it('Should ensure each key maps correct object', () => {
        expect(invertedIndex.getIndex('books.json').alice).toEqual([1]);
      });
    });

    describe('Search Index', () => {
      it('Should return correct index for an array of search terms', () => {
        expect(invertedIndex.searchIndex('books.json', 'alice')).toEqual({
          alice: [1]
        });
      });

      it('Should return correct index results for searched term', () => {
        expect(invertedIndex.searchIndex('books.json', 'alice and')).toEqual({
          alice: [1],
          and: [1, 2]
        });
      });
    });
  });
});

},{"../books.json":1,"../emptyBook.json":2,"../testing.json":4,"../what":5,"../wrongFormat.json":6}],4:[function(require,module,exports){
module.exports=[
  {
    "title": "seyi is a girl",
    "text": "Is seyi a boy or what?"

  },

  {
    "title": "Andela is a TIA",
    "text": "Is seyi a she?? or a he??, TIA, you mean"}
]
},{}],5:[function(require,module,exports){
const what = 'yyyy';

},{}],6:[function(require,module,exports){
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