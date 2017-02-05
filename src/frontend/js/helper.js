/**
 * class ValidateFile
 */
class ValidateFile {
  /**
   * Static fileIsValid tests for .json in file name
   * @function
   * @param {object} file
   * @return {Boolean} true or false
   */
  static fileIsValid(file) {
    if (!file.name.match(/\.json$/)) {
      swal('Oops...', 'This file is not a json file, upload a valid file!');
      return false;
    } else {
      return true;
    }
  }

  /**
   * Static isValidContent tests for valid file
   * @function
   * @param {Array} fileContent
   * @return {Array} fileContent
   */
  static isValidJson(fileContent) {
    if (typeof fileContent !== 'object' || fileContent.length === 0) {
      return 0;
    } else {
      try {
        let code = 3;
        fileContent.forEach((document) => {
          if (document.title === undefined && document.text === undefined) {
            code = 1;
          }
        });
        return code;
      } catch (error) {
        return 2;
      }
    }
  }
}
