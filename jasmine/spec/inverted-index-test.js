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