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
