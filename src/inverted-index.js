class InvertedIndex {
  constructor() {
    this.allFiles = {};
    this.index = {};
    this.docNumber = {};
  }

  createIndex(file, fileName) {
    this.index = {};
    this.docNum = [];
    if (this.isValidJson(file)) {
      file.forEach((file, index) => {
        const title = file.title;
        const text = file.text;
        const docCount = index + 1;

        this.docNum.push(docCount);
        const docConcat = `${title} ${text}`;
        const tokens = InvertedIndex.tokenize(docConcat);
        const term = new Set(tokens);

        this.assignIndex(term, docCount);
      });
      this.allFiles[fileName] = this.index;
      this.docNumber[fileName] = this.docNum;
      return 'Index created';
    }
    return 'Index not created';
  }

  assignIndex(item, docID) {
    item.forEach((item) => {
      if (item in this.index) {
        this.index[item].push(docID);
      } else {
        this.index[item] = [docID];
      }
    });
  }

  getIndex(fileName) {
    return this.allFiles[fileName];
  }

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

  static tokenize(text) {
    // Utility method
    return text.toLowerCase().match(/\w+/g);
  }

  searchIndex(fileName, query) {
    let searchQuery = [];
    const searchResult = {};

    searchQuery = InvertedIndex.tokenize(query);
    searchQuery.forEach((word) => {
      if (word in this.allFiles[fileName]) {
        searchResult[word] = this.allFiles[fileName][word];
      }
    });

    return searchResult;
  }
}
