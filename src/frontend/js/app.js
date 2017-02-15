angular.module('myApp', [])
  .controller('myctrl', ($scope) => {
    $scope.index = new InvertedIndex();

    $scope.fileName = [];
    $scope.uploadedFiles = {};
    $scope.documents = null;
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
      const fileCheck = ValidateFile.fileIsValid(file);
      if (!fileCheck.status) return swal('Oops', fileCheck.message);

      const reader = new FileReader();
      reader.onloadend = (event) => {
        this.data = JSON.parse(event.target.result);
        const check = ValidateFile.isValidContent(this.data);

        if (!check.status) return swal('Oops', check.message);
        swal('', 'successful upload');

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

      if ($scope.selectedFile === null) {
        swal('Oops', 'You have to upload and select a file before creating index');
        return;
      }

      $scope.index.createIndex($scope.uploadedFiles[$scope.selectedFile],
        $scope.selectedFile);
      $scope.documents = $scope.index.docNumber[$scope.selectedFile];
      $scope.result = $scope.index.getIndex($scope.selectedFile);
      $scope.showTable = true;
    };

    $scope.search = () => {
      if ($scope.query === undefined || $scope.searchFile === null) {
        swal('Oops', 'Please enter a search term and Select a File');
        return;
      }
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
