/**
 * Created by ASUS on 2017/9/22.
 */
myApp.controller('fProjectOverViewCtrl',function($scope,$http,$state,$rootScope,locals){
  var deptId = {
    'deptId': locals.get('deptId')
  };
  $scope.select = [
    {'state':'进度'},
    {'state':'交付'}
  ];
  $scope.QueryFactoryAdministratorsCount = function(item){
    $http({
      url: factoryY + 'wishome-web/rest/QueryFactoryProjectCount',
      method:'GET',
      params:item
    }).success(function(data){
      $scope.prompt = data.newList;
      //温馨提示
      $scope.promptBox = [
        {'name':"项目总数:", 'num' : $scope.prompt.list1 + ' 个，'},
        {'name':"进度项目:", 'num' : $scope.prompt.list2 + ' 个，'},
        {'name':"交付项目:", 'num' : $scope.prompt.list3 + ' 个，'}
      ];
      $scope.tdList = data.list;
      $scope.list = [];
      for(var i=1;i<=Math.ceil($scope.tdList.length/$scope.pageCount);$scope.list.push(i++));
    }).error(function(){
    });
  };

  //用户ID判断

  if(locals.get('deptId') === undefined){
    alert('deptId是undefined')
  }else{
    $scope.QueryFactoryAdministratorsCount(deptId);
  }

  //模糊查询
  $scope.askSearch = function(){
    var ajax = 'FactoryAdministratorsCount';
    $scope.searchClick(ajax);
  };

//  点击查看
  $scope.setThis = function(data){
    var id = data.data.prjtid;
    var state = data.data.state;
    if(state === "进度"){
      $state.go('',{id:id})
    }else if(state === "交付"){
      $state.go('',{id:id})
    }
  }

});
