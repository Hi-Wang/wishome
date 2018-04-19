myApp.controller('dataPlateCtrl',function ($scope,$http) {
  $scope.tdName = "板材";
  $scope.queryBoard = function(){
    $http({
      url: designerY + 'wishome-web/rest/queryBoard',
      method:'GET'
    }).success(function(data){
      $scope.dataList = [];
      var len = data.queryBoardList.length;
      for(var i=0;i<len;i++){
        $scope.dataList.push({
          'id' : data.queryBoardList[i].boardId ,
          'name' : data.queryBoardList[i].boardname
        })
      }
    });
  };
  $scope.queryBoard();
});
