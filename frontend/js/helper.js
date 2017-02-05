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
  static isValidContent(fileContent) {
    if (typeof fileContent !== 'object' || fileContent.length === 0) {
      swal('Oops...', 'This file is empty, upload a valid file!');
      return false;
    } else {
      try {
        let error = true;
        fileContent.forEach((document) => {
          if (document.title === undefined && document.text === undefined) {
            swal('Oops...', 'Cannot find title/text keys in file! Please upload file with correct index');
            error = false;
          }
        });
        return error;
      } catch (error) {
        swal('Oops...', 'Invalid file!');
        return false;
      }
    }
  }
}




