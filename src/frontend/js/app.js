angular.module('myApp', [])
  .controller('myctrl', ($scope) => {
    $scope.index = new InvertedIndex();

    $scope.fileName = [];
    $scope.uploadedFiles = {};
    $scope.documents = {};
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
      if (!InvertedIndex.fileIsValid(file)) {
        return swal('Oops', 'This file is not a json file, upload a valid file!');
      }

      const reader = new FileReader();
      reader.onloadend = (event) => {
        const data = JSON.parse(event.target.result);
        const status = InvertedIndex.isValidContent(data);
        $scope.uploadedFiles[file.name] = data;
        if (!status) return swal('Oops', 'file content must have objects with title and text keys');
        swal('Success', 'successful upload');

        $scope.$apply(() => {
          $scope.fileName.push(file.name);
          $scope.uploadedFiles[file.name] = data;
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

      if ($scope.selectedFile === null) {
        swal('Oops', 'You have to upload and select a file before creating index');
        return;
      }

      $scope.index.createIndex($scope.uploadedFiles[$scope.selectedFile],
        $scope.selectedFile);
      $scope.documents = $scope.uploadedFiles[$scope.selectedFile];
      $scope.result = $scope.index.getIndex($scope.selectedFile);
      $scope.showTable = true;
    };

    $scope.search = () => {
      $scope.documents = {};
      if ($scope.query === '') {
        swal('Oops', 'Please enter a search term and Select a File');
        return;
      }

      if ($scope.searchFile === '') {
        $scope.documents = $scope.uploadedFiles;
        $scope.result = $scope.index.searchIndex(null, $scope.query);
      } else {
        $scope.result = $scope.index.searchIndex($scope.searchFile, $scope.query);
        $scope.documents[$scope.searchFile] = $scope.uploadedFiles[$scope.searchFile];
      }
      $scope.singleTable = false;
      $scope.allTable = true;
    };
  });
