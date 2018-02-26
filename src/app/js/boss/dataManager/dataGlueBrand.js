myApp.controller('dataGlueBrandCtrl',function($scope,$http){
  $scope.tdName = "胶水品牌";
  $scope.queryGlueBrand = function(){
    $http({
      url: designerY + 'wishome-web/rest/queryGlueBrand',
      method:'GET'
    }).success(function(data){
      $scope.dataList = [];
      var len = data.queryGlueBrandList.length;
      for(var i=0;i<len;i++){
        $scope.dataList.push({
          'id' : data.queryGlueBrandList[i].glueId,
          'name' : data.queryGlueBrandList[i].gluename
        })
      }
    });
  };
  $scope.queryGlueBrand();

});
