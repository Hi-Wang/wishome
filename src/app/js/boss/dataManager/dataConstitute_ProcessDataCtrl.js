myApp.controller('dataConstitute_ProcessDataCtrl',function($scope,$stateParams,$http){
  $scope.tdName = "下拉数据";
  $scope.GongYi = "工艺：" + $stateParams.name + " -- ";

  $scope.queryContentByPtName = function(){
    var name = {
      'ptName' : $stateParams.name
    };
    $http({
      url: designerY + 'wishome-web/rest/queryContentByPtName',
      method:'GET',
      params: name
    }).success(function(data){
      $scope.backBtn = true;
      $scope.dataList = [];
      if(data.pt === null){
        $scope.dataList = [];
        return false
      }else{
        var len = data.pt.length;
        for(var i=0;i<len;i++){
          $scope.dataList.push({
            'name' : data.pt[i]
          })
        }
      }
    });
  };
  $scope.queryContentByPtName();
});
