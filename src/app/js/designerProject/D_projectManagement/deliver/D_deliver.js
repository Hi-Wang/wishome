/**
 * Created by ASUS on 2017/8/23.
 */
myApp.controller("deliverCtrl",function($scope,$http,$state,$rootScope,locals){
  var userid = {
    'userid':$rootScope.id
  };
  $(".UrlA").eq(4).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(4)).css("background","none");
  $scope.QueryDesignerInteractive = function(item){
    $http({
      url:designerY + 'wishome-web/rest/QueryDesignerInteractive',
      method:'GET',
      params:item
    }).success(function(data){
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
  $scope.QueryDesignerInteractive(userid);
  $scope.goSignedView = function(item){
    var id = item.data.prjtid;
    var name = "交付";
    locals.set('designerDownName',name);
    $state.go('typesetting.signedView',{id:id,name:name})
  }
});
