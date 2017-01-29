const book = [
  {
    title: 'Alice in Wonderland',
    text: 'Alice falls into a rabbit hole and enters a world full of imagination.'
  },

  {
    title: 'The Lord of the Rings: The Fellowship of the Ring.',
    text: 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
  }
];

const invertedIndex = new InvertedIndex();
invertedIndex.createIndex(book, 'books.json');

describe('Read book data', () => {
  it('Should return false for empty JSON Array', () => {
    expect(invertedIndex.isValidJson([])).toBeFalsy();
  });

  it('Should return true for valid JSON Array', () => {
    expect(invertedIndex.isValidJson(book)).toBeTruthy();
  });

  it('Should return false for wrong key json file', () => {
    expect(invertedIndex.isValidJson('invalidBook')).toBeFalsy();
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
    expect(invertedIndex.searchIndex('books.json', 'alice')).toEqual(
      { alice: [1]
      });
  });

  it('Should return correct index results for searched term', () => {
    expect(invertedIndex.searchIndex('books.json', 'alice and')).toEqual({ alice: [1], and: [1, 2] });
  });
});
