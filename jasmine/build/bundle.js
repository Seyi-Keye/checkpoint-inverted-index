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
module.exports=[]
},{}],3:[function(require,module,exports){
const invertedIndex = new InvertedIndex();
// const isValid = new ValidateFile();
const book = require('../books.json');
const emptyBook = require('../emptyBook.json');
const wrongFormat = require('../wrongFormat.json');

describe('Inverted Index', () => {
  describe('Read book data', () => {
    it('Should return 0 for empty JSON Array', () => {
      expect(ValidateFile.isValidJson(emptyBook)).toEqual(0);
    });

    it('Should return true for valid JSON Array', () => {
      expect(ValidateFile.isValidJson(book)).toBeTruthy();
    });

    it('Should return 1 for wrong key json file', () => {
      expect(ValidateFile.isValidJson(wrongFormat)).toEqual(1);
    });

    it('Should return 3 for a valid Json Array', () => {
      expect(ValidateFile.isValidJson(book)).toEqual(3);
    });

    it('Should return 2 for a valid Json Array', () => {
      expect(ValidateFile.isValidJson({})).toEqual(2);
    });
  });

  describe('Populate Index', () => {
    it('Should create index once JSON file has been read', () => {
      expect(Object.keys(invertedIndex.getIndex('books.json')).length).toBeGreaterThan(0);
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

},{"../books.json":1,"../emptyBook.json":2,"../wrongFormat.json":4}],4:[function(require,module,exports){
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