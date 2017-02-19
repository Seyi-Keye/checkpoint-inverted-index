/**
 * InvertedIndex class with constructor
 */
class InvertedIndex {
  /**
   * class constructor
   * @constructor
   */
  constructor() {
    this.allFiles = {};
  }
  /**
   * Create index
   * @function
   * @param {string} fileName Name of the file being indexed
   * @param {Array} fileContent array content
   * @return {void}
   */
  createIndex(fileName, fileContent) {
    const index = {};
    this.allFiles[fileName] = {};
    fileContent.forEach((book, index) => {
      const allWords = new Set(InvertedIndex.tokenize(`${book.text}`));
      this.assignIndex(allWords, index + 1, fileName);
    });
  }

  /**
   * Assign Index
   * @function
   * @param {Array} tokens unique items to be indexed
   * @param {Integer} bookIndex file number
   * @param {String} filename file number
   * @return {void}
   */
  assignIndex(tokens, bookIndex, filename) {
    tokens.forEach((token) => {
      if (this.allFiles[filename][token]) {
        this.allFiles[filename][token].push(bookIndex);
      } else {
        this.allFiles[filename][token] = [bookIndex];
      }
    });
  }
  /**
   * gets the Index
   * @param {string} fileName fileName is the name of the file to be searched
   * @return {object} all unique words in document with correct index
   */
  getIndex(fileName) {
    return this.allFiles[fileName];
  }
  /**
   * Static tokenize gets all words
   * @function
   * @param {string} text
   * @return {array} array of words in lowercase
   */
  static tokenize(text) {
    return text.toLowerCase().match(/\w+/g);
  }

  /**
   * searchIndex searches through created index
   * @param {string} query the set of input string to be searched
   * @param {string} fileName name of file to be searched
   * @return {object} searchResult
   */
  searchIndex(query, fileName) {
    const searchResult = {};
    const searchQuery = InvertedIndex.tokenize(query.toString());
    if (!fileName) {
      const all = Object.keys(this.allFiles);
      all.forEach((filename) => {
        searchResult[filename] = {};
        searchQuery.forEach((word) => {
          if (this.allFiles[filename][word]) {
            searchResult[filename][word] = this.allFiles[filename][word];
          } else {
            searchResult[filename][word] = [];
          }
        });
      });
    } else {
      searchResult[fileName] = {};
      searchQuery.forEach((word) => {
        if (this.allFiles[fileName][word]) {
          searchResult[fileName][word] = this.allFiles[fileName][word];
        } else {
          searchResult[fileName][word] = [];
        }
      });
    }
    return searchResult;
  }

  /**
   * Static fileIsValid tests for .json in file name
   * @function
   * @param {object} file
   * @return {Boolean} true or false
   */
  static fileIsValid(file) {
    return /application\/json/.test(file.type);
  }

  /**
   * Static isValidContent tests for valid file
   * @function
   * @param {Array} fileContent
   * @return {Array} fileContent
   */
  static isValidContent(fileContent) {
    let status = true;
    if (!Array.isArray(fileContent) || fileContent.length === 0) {
      status = false;
    }
    fileContent.forEach((book) => {
      if (book.title === undefined && book.text === undefined) {
        status = false;
      }
    });
    return status;
  }
}
