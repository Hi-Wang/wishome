myApp.controller('dataConstitute_GongXuCtrl',function($scope,$http,$state){
  $scope.tdName = '工序';
  $scope.queryAllTimeNodes = function(){
    $http({
      url: designerY + 'wishome-web/rest/queryAllTimeNodes',
      method:'GET'
    }).success(function(data){
      console.log(data);
      $scope.backBtn = true;
      $scope.startEndTime = true;
      $scope.dataList = [];
      var len = data.list.length;
      for(var i=0;i<len;i++){
        if(data.list[i].st === null){
          data.list[i].st = 0
        }
        if(data.list[i].end === null){
          data.list[i].end = 0
        }
        $scope.dataList.push({
          'id' : data.list[i].id,
          'name' : data.list[i].name,
          'st' :  data.list[i].st,
          'end' :  data.list[i].end
        })
      }
    });
  };
  $scope.queryAllTimeNodes();
});
