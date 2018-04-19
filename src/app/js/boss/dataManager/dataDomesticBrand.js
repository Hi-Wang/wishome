myApp.controller('dataDomesticBrandCtrl',function ($scope,$http) {

  $scope.tdName = "国产品牌";
  $scope.queryDomesticBrand = function(){
    $http({
      url: designerY + 'wishome-web/rest/queryDomesticBrand',
      method:'GET'
    }).success(function(data){
      $scope.dataList = [];
      var len = data.queryDomesticBrandList.length;
      for(var i=0;i<len;i++){
        $scope.dataList.push({
          'id' : data.queryDomesticBrandList[i].domesticId,
          'name' : data.queryDomesticBrandList[i].domesticname
        })
      }
    });
  };
  $scope.queryDomesticBrand();

});
