/**
 * Created by ASUS on 2017/8/16.
 */
myApp.controller('managerScheduleCtrl',function($scope,$http,$state,$rootScope,locals){
  var user = {
    'userId': locals.get('id')
  };
  $(".UrlA").eq(2).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(2)).css("background","none");
  $scope.queryProcessProjectPM = function(item){
    $http({
      url: managerZ + 'wishome-web/rest/queryProcessProjectPM',
      method:'GET',
      params:item
    }).success(function(data){
      $scope.prompt = data.newList;
      //温馨提示
      $scope.promptBox = [
        {'name':"项目总数:", 'num' : $scope.prompt.list1 + ' 个，'},
        {'name':"报价项目:", 'num' : $scope.prompt.list2 + ' 个，'},
        {'name':"下单项目:", 'num' : $scope.prompt.list3 + ' 个，'},
        {'name':"进度项目:", 'num' : $scope.prompt.list4 + ' 个，'},
        {'name':"交付项目:", 'num' : $scope.prompt.list5 + ' 个，'}
      ];
      $scope.tdList = data.pm;
      var len = $scope.tdList.length;
      $scope.pageShow(len);
    });
  };
  //用户ID判断
  if($rootScope.id === null || undefined || ''){
    alert('失败')
  }else{
    $scope.queryProcessProjectPM(user);
  }

  //模糊查询
  $scope.askSearch = function(){
    var ajax = 'QueryProjectManagerSpeed';
    $scope.searchClick(ajax);
  };

  $scope.goManagerScheduleView = function(item){
    var id = item.data.prjtid;
    locals.set('managerDownName',"进度");
    $state.go('typesetting.managerScheduleView',{id:id})
  }
});
