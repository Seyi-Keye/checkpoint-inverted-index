// /* eslint no-unused-vars: "off"*/
// /* eslint class-methods-use-this: "off"*/

// /**
//  * class ValidateFile
//  */
// class ValidateFile {

//   /**
//    * constructor
//   */
//   constructor() {
//     this.check = {};
//   }
//   /**
//    * Static fileIsValid tests for .json in file name
//    * @function
//    * @param {object} file
//    * @return {Boolean} true or false
//    */
//   static fileIsValid(file) {
//     if (!/\.json/i.test(file.name)) {
//     // if (!file.name.match(/\.json$/)) {
//       this.check = {
//         status: false,
//         message: 'This file is not a json file, upload a valid file!'
//       };
//     } else {
//       this.check = {
//         status: true,
//         message: 'Valid file'
//       };
//     }
//     return this.check;
//   }

//   /**
//    * Static isValidContent tests for valid file
//    * @function
//    * @param {Array} fileContent
//    * @return {Array} fileContent
//    */
//   static isValidContent(fileContent) {
//     try {
//       if (typeof fileContent !== 'object' || fileContent.length === 0) {
//         this.check = {
//           status: false,
//           message: 'This file is not a json file, upload a valid file!'
//         };
//       }
//       fileContent.forEach((document) => {
//         if (document.title === undefined && document.text === undefined) {
//           this.check = {
//             status: false,
//             message: 'Cannot find title/text keys in file! Please upload file with correct index'
//           };
//         }
//       });
//     } catch (error) {
//       this.check = {
//         status: false,
//         message: 'Invalid file!'
//       };
//     }
//     return this.check;
//   }
// }
