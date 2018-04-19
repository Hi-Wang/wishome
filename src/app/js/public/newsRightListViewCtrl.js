myApp.controller('newsRightListViewCtrl',function($scope,$rootScope,$state,$http,$stateParams,locals){
  $scope.pUser=$scope.newsListTab;
  $scope.obj={
    pUser:$scope.newsListTab
  };
  $scope.newsListTabStyly = function(index,name,item){
    $scope.obj.pUser(index,name,item);
  };

//  查看具体信息
  $scope.seeOneNews = function(data,item){
    var dataS = data.messageId;
      $state.go('typesetting.newsListView.onlyOneNews',{data:dataS});
   };
});


