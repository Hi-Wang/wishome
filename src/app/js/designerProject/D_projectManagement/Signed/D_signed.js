/**
 * Created by ASUS on 2017/8/23.
 */
myApp.controller("signedCtrl",function($scope,$http,$rootScope,$state,locals){
  var userid = {
    'userid':$rootScope.id
  };
  $(".UrlA").eq(2).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(2)).css("background","none");
  $scope.signedCtrl = function(item){
    $http({
      url:designerY + 'wishome-web/rest/QuerySig',
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

  //用户ID判断
  if($rootScope.id === undefined || null || ''){
    alert(1111)
  }else{
    $scope.signedCtrl(userid);
  }

  //模糊查询
  $scope.askSearch = function(){
    var ajax = 'QuerySignName';
    $scope.searchClick(ajax);
  };

//  查看签约
  $scope.goSignedView = function(data){
    var id = data.data.prjtid;
    var name = "签约";
    locals.set('designerDownName',"签约");
    $state.go('typesetting.signedView',{id:id,name:name})
  }
});

