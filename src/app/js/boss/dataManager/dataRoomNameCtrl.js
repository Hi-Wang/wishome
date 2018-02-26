myApp.controller('dataRoomNameCtrl',function($scope,$http){
  $scope.tdName = "区域名称";
  $scope.backBtn = false;
  $scope.queryRegoinTable = function(){
    $http({
      url:designerY + 'wishome-web/rest/queryRegoinTable',
      method:'GET'
    }).success(function(data){
      $scope.backBtn = true;
      $scope.dataList = [];
      var len = data.list.length;
      for(var i=0;i<len;i++){
        $scope.dataList.push({
          'id' : data.list[i].id,
          'name' : data.list[i].regoinName
        })
      }
    });
  };
  $scope.queryRegoinTable();
});
