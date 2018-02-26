myApp.controller('dataConstitute_ProcessCtrl',function($scope,$http){
  $scope.tdName = '工艺';
  $scope.queryProcessTable = function(){
    $http({
      url:designerY + 'wishome-web/rest/queryProcessTable',
      method:'GET'
    }).success(function(data){
      $scope.backBtn = true;
      $scope.gongYiRadio = true;
      $scope.dataList = [];
      var len = data.list.length;
      var gongYiEdit;
      for(var i=0;i<len;i++){
        if(data.list[i].signId === 0){
          gongYiEdit = false
        }else if(data.list[i].signId === 1){
          gongYiEdit = true
        }
        $scope.dataList.push({
          'id' : data.list[i].id,
          'name' : data.list[i].processName,
          'signId' : data.list[i].signId,
          'gongYiEdit' : gongYiEdit
        });
      }
    });
  };
  $scope.queryProcessTable();
});
