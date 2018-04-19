myApp.directive('bigImg',function(){
  return{
    restrict:'E',
    replace:true,
    templateUrl:'public/bigImg.html',
    controller:function($scope){
      $scope.seeImg = function(item){
        $scope.bigImgUrl = item;
        $scope.flieInput = true;
        $scope.seeBigImgModel = true;
      };
      $scope.hideModel = function(){
        $scope.bigImgUrl = null;
        $scope.flieInput = false;
        $scope.seeBigImgModel = false;
      }
      //  查看大图
    }
  }
});
