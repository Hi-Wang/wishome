myApp.controller('dataMainMaterialCtrl',function($scope,$http){
  //主材列表
  $scope.tdName = "主材";

  $scope.queryPrincipal = function(){
    $http({
      url: designerY + 'wishome-web/rest/queryPrincipal',
      method:'GET'
    }).success(function(data){
      $scope.dataList = [];
      var len = data.principalList.length;
      for(var i=0;i<len;i++){
        $scope.dataList.push({
          'id' : data.principalList[i].principalId,
          'name' : data.principalList[i].principalname
        })
      }
    });
  };
  $scope.queryPrincipal();
});

