myApp.controller('dataImportedBrandCtrl',function($scope,$http){
  $scope.tdName = "进口品牌";
  $scope.queryImportBrand = function(){
    $http({
      url: designerY + 'wishome-web/rest/queryImportBrand',
      method:'GET'
    }).success(function(data){
      $scope.dataList = [];
      var len = data.queryImportBrandList.length;
      for(var i=0;i<len;i++){
        $scope.dataList.push({
          'id' : data.queryImportBrandList[i].importId,
          'name' : data.queryImportBrandList[i].importname
        })
      }
    });
  };
  $scope.queryImportBrand();

});
