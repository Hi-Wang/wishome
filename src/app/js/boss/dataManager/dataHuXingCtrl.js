myApp.controller('dataHuXingCtrl',function($scope,$http){
  $scope.tdName = "户型";
  $scope.queryHstpCate = function(){
    $http({
      url:designerY + 'wishome-web/rest/queryHstpCate',
      method:'GET'
    }).success(function(data){
      $scope.backBtn = true;
      $scope.dataList = [];
      var len = data.list.length;
      for(var i=0;i<len;i++){
        $scope.dataList.push({
          'id' : data.list[i].id,
          'name' : data.list[i].hastCateName
        })
      }
    });
  };
  $scope.queryHstpCate();
});
