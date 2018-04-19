myApp.directive('loadingModel',function(){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'public/loading.html',
    controller: function($scope){
      $scope.loaddingShow = function(text){
        $scope.loaddingText = text;
        $scope.loaddingModelShow = true;
      };

      $scope.loaddingHide = function(){
        $scope.loaddingModelShow = false;
      };

      console.log("loadingModel")
    }
  }
});
