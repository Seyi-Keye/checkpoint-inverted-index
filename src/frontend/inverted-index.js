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
    this.check = {};
  }
  /**
   * Create index
   * @function
   * @param {Object} fileContent
   * @param {string} fileName Name of the file being indexed
   * @return {string} Index created or not
   */
  createIndex(fileContent, fileName) {
    this.index = {};
    this.docNum = [];

    fileContent.forEach((file, index) => {
      const title = file.title;
      const text = file.text;
      const documentCount = index + 1;

      this.docNum.push(documentCount);
      const docConcat = `${title} ${text}`;
      const allWords = InvertedIndex.tokenize(docConcat);
      const word = new Set(allWords);

      this.assignIndex(word, documentCount);
    });
    this.allFiles[fileName] = this.index;
    this.docNumber[fileName] = this.docNum;
  }

  /**
   * Assign Index
   * @function
   * @param {Array} items unique item to be indexed
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
    console.log(fileName);
    return this.allFiles[fileName];
  }
  /**
   * Static tokenize gets unique word
   * @function
   * @param {string} text
   * @return {string} lowercase of unique words
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

  /**
   * Static fileIsValid tests for .json in file name
   * @function
   * @param {object} file
   * @return {Boolean} true or false
   */
  static fileIsValid(file) {
    let check = { status: true, message: 'Valid file!' };
    if (!/application\/json/.test(file.type)) {
      check = {
        status: false,
        message: 'This file is not a json file, upload a valid file!'
      };
    }
    return check;
  }

  /**
   * Static isValidContent tests for valid file
   * @function
   * @param {Array} fileContent
   * @return {Array} fileContent
   */
  static isValidContent(fileContent) {
    let check = { status: true, message: 'Valid file!' };
    try {
      if (typeof fileContent !== 'object' || fileContent.length === 0) {
        check = {
          status: false,
          message: 'This file is Empty, upload a valid file!'
        };
      }
      fileContent.forEach((document) => {
        if (document.title === undefined && document.text === undefined) {
          check = {
            status: false,
            message: 'Cannot find title/text keys in file! Please upload file with correct content'
          };
        }
      });
    } catch (error) {
      check = {
        status: false,
        message: 'Invalid file!'
      };
    }
    return check;
  }


}
