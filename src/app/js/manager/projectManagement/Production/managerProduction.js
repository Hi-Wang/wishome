/**
 * Created by ASUS on 2017/8/16.
 */
myApp.controller('managerProductionCtrl',function($scope,$state,$http,$rootScope,locals){
  $(".UrlA").eq(1).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(1)).css("background","none");
  //项目经理看下单项目
    var user = {
      'userId': locals.get('id')
    };
    $http({
      url: managerY + 'wishome-web/rest/queryOrderProject',
      method:'GET',
      params:user
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

  //模糊查询
  $scope.askSearch = function(){
    var ajax = 'QueryProjectManagerPlaceAnOrder';
    $scope.searchClick(ajax);
  };

  $scope.seeProductionView = function(data){
    var id = data.data.prjtid;
    locals.set('managerDownName',"下单");
    $state.go('typesetting.mProductionView',{id:id})
  }
});


