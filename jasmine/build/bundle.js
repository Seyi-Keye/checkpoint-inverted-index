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

invertedIndex.createIndex('books.json', book);
invertedIndex.createIndex('testing.json', book1);

describe('Inverted Index', () => {
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

    describe('Populate Index', () => {
      it(`should verify that the index is created once the JSON
    file has been read`, () => {
      invertedIndex.createIndex('note.json', [
          {"title": "New start",
        "text": "This is a testcase" },
        {"title": "Very well",
      "text": "This is TIA"}]);
      expect(Object.prototype.hasOwnProperty.call(invertedIndex.allFiles, 'note.json'))
      .toEqual(true);
      expect(Object.keys(invertedIndex.allFiles['note.json']).length).not.toEqual(0);
    });



      it('Should create index once JSON file has been read', () => {
        invertedIndex.createIndex('note.json',
        [
          {"title": "New start",
        "text": "This is a testcase" },
        {"title": "Very well",
      "text": "This is TIA"}])
      expect(invertedIndex.allFiles['note.json']).toEqual(
           {
            this: [1, 2],
            is: [1, 2],
            a: [1],
            testcase: [1],
            tia: [2]
      });
      });

      it('Should ensure each key maps correct object', () => {
        expect(invertedIndex.getIndex('books.json').alice).toEqual([1]);
      });
    });

    describe('Search Index', () => {
      it('Should return correct index for search terms', () => {
        expect(invertedIndex.searchIndex('alice, a , of', 'books.json')).toEqual({
          'books.json': {
            alice: [1],
            a: [1, 2],
            of: [1, 2]
          }
        });
      });

      it('should return search result if an array is passed in as search term', () => {
        expect(invertedIndex.searchIndex(['alice', 'man'], 'books.json')).toEqual({
          'books.json': {
            alice: [1],
            man: [2]
          }
        });

        expect(invertedIndex.searchIndex(['seyi', 'in', 'amity'], 'testing.json')).toEqual({
          'testing.json': {
            seyi: [1, 2],
            in: [],
            amity: []
          }
        });
      });

      it('Should return correct index results for searched term', () => {
        expect(invertedIndex.searchIndex('alice a', 'testing.json')).toEqual({
          'testing.json': {
            alice: [],
            a: [1, 2]
          }
        });
      });

      it('should go through all indexed files if a filename is not passed', () => {
        expect(invertedIndex.searchIndex('alice a')).toEqual({
          'books.json': {
            alice: [1],
            a: [1, 2]
          },
          'testing.json': {
            alice: [],
            a: [1, 2]
          },
          'note.json': {
            alice: [  ],
            a: [ 1 ]
          }

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