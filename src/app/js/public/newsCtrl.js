myApp.controller('newsCtrl',function($scope,$http,$timeout,$interval,$state,$stateParams,locals){
  $timeout(function(){
    // $(".newLi").eq(0).slideUp(600);
    // $(".newLi").eq(1).slideUp(800);
    // $(".newLi").eq(2).slideUp(1000);
  },10000);

  $scope.getNews = function(){
    var id = {
      'dhId' : locals.get('id')
    };
    $http({
      url: managerY +  'wishome-web/rest/queryUnReadMessage',
      method:'get',
      params:id
    }).success(function(data){
      console.log(data);
      $scope.newList = data.list;
      $scope.newsNum = data.msgNum;
      // 1. 子 Ctrl1 中数据改变之后触发 dataChanged 事件
      $scope.$emit('dataChanged', $scope.newsNum);
      $scope.$on('changeData', function(event, data){
        $scope.newsNum = data.msgNum;
      });
      //
      $timeout(function(){
        $(".newLi").eq(0).slideDown(600);
        $(".newLi").eq(1).slideDown(800);
        $(".newLi").eq(2).slideDown(1000);
        $(".newLi").eq(3).slideDown(1000);
        $(".newLi").eq(4).slideDown(1000);
      },1000);
    })
  };
  $scope.getNews();
  $interval(function(){
    $scope.getNews();
  },20000);

  $scope.hideNewLi = function(item,index){
    var data = {
      'msgId' : item.messageId
    };
    $http({
      url: managerY +  'wishome-web/rest/ignoreMessage',
      method:'get',
      params:data
    }).success(function(){
      $scope.newList.splice(index,1)
    });
  };

  $scope.goOnlyOneView = function(item){
    console.log(item);
    return false
    var dataS = item.list.messageId;
    console.log(dataS);
    // $state.go('typesetting.newsListView.onlyOneNews',{data:dataS});
    $state.go('typesetting.newsListView',{ num:num,id:dataS});
  }
});

