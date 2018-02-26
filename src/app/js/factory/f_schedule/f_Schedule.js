/**
 * Created by ASUS on 2017/9/22.
 */
myApp.controller('fScheduleCtrl',function($scope,$http,$state,$rootScope){
  var user = {
    'userId':$rootScope.id
  };
  var deptId = {
    'deptId': $rootScope.deptId
  };

  $scope.queryAllProgressPrjt = function(item){
    $http({
      url: factoryZ +'wishome-web/rest/queryAllProgressPrjt',
      method:'POST',
      params: item
    }).success(function(data){
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
  $scope.queryAllProgressPrjt(deptId);

//  页面跳转
  $scope.seeScheduleViewCtrl = function(data){
    var id = data.data.prjtid;
    $state.go('typesetting.fScheduleView',{id:id})
  }
});
