myApp.controller('dataPaintingBrandCtrl',function($scope,$http){
  $scope.tdName = "涂装品牌";
  $scope.queryCoatingMaterialBrandTable = function(){
    $http({
      url: designerY + 'wishome-web/rest/queryCoatingMaterialBrandTable',
      method:'GET'
    }).success(function(data){
      $scope.dataList = [];
      var len = data.queryCoatingMaterialBrandTableList.length;
      for(var i=0;i<len;i++){
        $scope.dataList.push({
          'id' : data.queryCoatingMaterialBrandTableList[i].coatingId,
          'name' : data.queryCoatingMaterialBrandTableList[i].coatingname
        })
      }
    });
  };
  $scope.queryCoatingMaterialBrandTable();
});
