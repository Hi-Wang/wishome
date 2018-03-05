/**
 * Created by ASUS on 2017/9/22.
 */
myApp.controller('fDeliverViewCtrl',function($scope,$http,$state,$rootScope){
  var user = {
    'deptId':$rootScope.deptId
  };
  $("#nb-global-spinner").css('display','block');
$scope.queryDeliverPrjt = function(item){
  $http({
    url: factoryY +'wishome-web/rest/queryDeliverPrjt',
    method:'GET',
    params:item
  }).success(function(data){
    $("#nb-global-spinner").css('display','none');
    $scope.tdList = data.list;
    $scope.prompt = data.newList;
    //温馨提示
    $scope.promptBox = [
      {'name':"项目总数:", 'num' : $scope.prompt.list1 + ' 个，'},
      {'name':"进度项目:", 'num' : $scope.prompt.list2 + ' 个，'},
      {'name':"交付项目:", 'num' : $scope.prompt.list3 + ' 个，'}
    ];
    $scope.list = [];
    for(var i=1;i<=Math.ceil($scope.tdList.length/$scope.pageCount);$scope.list.push(i++));
  })
};
  $scope.queryDeliverPrjt(user)

});
