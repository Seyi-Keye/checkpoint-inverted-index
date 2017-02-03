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
    this.index = {};
    this.docNumber = {};
  }
  /**
   * Create index
   * @function
   * @param {Array} fileContent
   * @param {string} fileName Name of the file being indexed
   * @return {string} Index created or not
   */
  createIndex(fileContent, fileName) {
    this.index = {}; // initialize empty object to empty this.index in the constructor
    this.docNum = [];
    fileContent.forEach((file, index) => {
      const title = file.title;
      const text = file.text;
      const docCount = index + 1;

      this.docNum.push(index + 1);
      const docConcat = `${title} ${text}`;
      const allWords = InvertedIndex.tokenize(docConcat);
      const word = new Set(allWords);

      this.assignIndex(word, docCount);
    });
    this.allFiles[fileName] = this.index;
    this.docNumber[fileName] = this.docNum;
  }
  /**
   * Assign Index
   * @function
   * @param {Array} item unique item to be indexed
   * @param {Array} docID file number
   * @return {void}
   */
  assignIndex(items, docID) {
    items.forEach((item) => {
      if (item in this.index) {
        this.index[item].push(docID);
      } else {
        this.index[item] = [docID];
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
   * Validate json Array
   * @function
   * @param {object} jsonArray
   * @return {Boolean} true or false
   */
  isValidJson(jsonArray) {
    if (typeof jsonArray !== 'object' || jsonArray.length === 0) {
      return false;
    }
    try {
      jsonArray.forEach((item) => {
        if (!(item.hasOwnProperty('title') && item.hasOwnProperty('text'))) {
          return false;
        }
      });

      return true;
    } catch (err) {
      return false;
    }
  }
  /**
   * Static tokenize gets unique word
   * @function
   * @param {Array} text
   * @return {Array} lowercase of unique words
   */
  static tokenize(text) {
    return text.toLowerCase().match(/\w+/g);
  }
  /**
   * searchIndex searches through created index
   * @param {string} fileName name of file to be searched
   * @param {string} query the set of input string to be searched
   * @return {object} searchResult
   */
  searchIndex(fileName, query) {
    let searchQuery = [];
    const searchResult = {};

    searchQuery = InvertedIndex.tokenize(query);

    if (fileName === 'all') {
      const all = Object.keys(this.allFiles);
      all.forEach((book) => {
        const result = {};
        searchQuery.forEach((word) => {
          if (word in this.allFiles[book]) {
            result[word] = this.allFiles[book];
            searchResult[book] = result;
          }
        });
      });
    } else {
      searchQuery.forEach((word) => {
        if (word in this.allFiles[fileName]) {
          searchResult[word] = this.allFiles[fileName][word];
        }
      });
    }
    return searchResult;
  }
}
