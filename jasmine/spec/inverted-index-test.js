const invertedIndex = new InvertedIndex();

describe('Inverted Index', () => {
  beforeEach(() => {
    invertedIndex.createIndex(book, 'books.json');
  });

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
