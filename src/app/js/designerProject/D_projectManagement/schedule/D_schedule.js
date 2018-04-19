/**
 * Created by ASUS on 2017/8/23.
 */
myApp.controller('scheduleCtrl',function($scope,$rootScope,$state,$http,locals){
  var userId = {
    'userid': locals.get('id')
  };
  $(".UrlA").eq(3).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(3)).css("background","none");
  $("#nb-global-spinner").css('display','block');
  $scope.signedCtrl = function(item){
    $http({
      url:designerY + 'wishome-web/rest/QueryDesignerSpeed',
      method:'GET',
      params:item
    }).success(function(data){
      $("#nb-global-spinner").css('display','none');
      $scope.prompt = data.newList;
      //温馨提示
      $scope.promptBox = [
        {'name':"项目总数:", 'num' : $scope.prompt.list1 + ' 个，'},
        {'name':"立项项目:", 'num' : $scope.prompt.list2 + ' 个，'},
        {'name':"询价项目:", 'num' : $scope.prompt.list3 + ' 个，'},
        {'name':"签约项目:", 'num' : $scope.prompt.list4 + ' 个，'},
        {'name':"进度项目:", 'num' : $scope.prompt.list5 + ' 个，'},
        {'name':"交付项目:", 'num' : $scope.prompt.list6 + ' 个，'},
        {'name':"本月新增项目:", 'num' : $scope.prompt.list7 + ' 个，'},
        {'name':"本月完工项目:", 'num' : $scope.prompt.list8 + ' 个。'}
      ];
      $scope.tdList = data.list;
      $scope.pm = data.pm;
      var len = $scope.tdList.length;
      $scope.pageShow(len);
    }).error(function(){
    });
  };
  $scope.signedCtrl(userId);

//  查看进度页面
  $scope.goScheduleView = function(item){
    var id = item.data.prjtid;
    locals.set('designerDownName',"进度");
    locals.set('designerPrjtId',id);
    $state.go('typesetting.scheduleView',{id:id})
  }
});
