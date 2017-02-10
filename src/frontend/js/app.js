angular.module('myApp', [])
  .controller('myctrl', ($scope) => {
    $scope.index = new InvertedIndex();
    const messages = [
      'This file is not a json file, upload a valid file!',
      'Cannot find title/text keys in file! Please upload file with correct index',
      'Invalid file!'
    ];
    $scope.fileName = [];
    $scope.uploadedFiles = {};
    $scope.documents;
    $scope.showTable = false;
    $scope.singleTable = true;


    document.getElementById('json-file').addEventListener('change', (event) => {
      const file = event.target.files;
      for (let i = 0; i < file.length; i++) {
        $scope.upload(file[i]);
      }
      $scope.$apply();
    });
    $scope.upload = (file) => {
      const checkFile = ValidateFile.fileIsValid(file);
      if (!checkFile) {
        return;
      }
      const reader = new FileReader();
      reader.onloadend = (event) => {
        this.data = JSON.parse(event.target.result);
        const code = ValidateFile.isValidJson(this.data);
        if (code !== 3) {
          swal('Oops', messages[code]);
          return;
        } else {
          swal('', 'successful upload');
        }
        $scope.$apply(() => {
          $scope.fileName.push(file.name);
          $scope.uploadedFiles[file.name] = this.data;
        });
      };
      reader.readAsText(file);

    };


    $scope.checkInvalid = (content) => {
      if (content.hasOwnProperty('undefined')) {
        return true;
      }
    };


    $scope.createIndex = () => {
      $scope.singleTable = true;
      $scope.allTable = false;
      $scope.index.createIndex($scope.uploadedFiles[$scope.selectedFile],
        $scope.selectedFile);
      $scope.documents = $scope.index.docNumber[$scope.selectedFile];
      $scope.result = $scope.index.getIndex($scope.selectedFile);
      $scope.showTable = true;
    };


    $scope.search = () => {
      if ($scope.searchFile === 'all') {
        $scope.singleTable = false;
        $scope.allTable = true;
        $scope.documents = $scope.index.docNumber;
      } else {
        $scope.singleTable = true;
        $scope.allTable = false;
        $scope.documents = $scope.index.docNumber[$scope.searchFile];
      }
      $scope.result = $scope.index.searchIndex($scope.searchFile, $scope.query);
    };
  });
