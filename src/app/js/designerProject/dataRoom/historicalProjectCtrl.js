myApp.controller('historicalProjectCtrl',function($scope,$http,$rootScope,$state,locals){
  $("#nb-global-spinner").css('display','block');
  var userid = {
    'userId': locals.get('id')
  };
  $scope.queryDesignerHistoryProject = function(item){
    $http({
      url:designerY + 'wishome-web/rest/queryDesignerHistoryProject',
      method:'GET',
      params:item
    }).success(function(data){
      $("#nb-global-spinner").css('display','none');
      $scope.prompt = data.newList;
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
      $scope.tdList = data.HistoryList;
      $scope.pm = data.pm;
      var len = $scope.tdList.length;
      $scope.pageShow(len);
    }).error(function(){
    });
  };
  $scope.queryDesignerHistoryProject(userid);

  //模糊查询
  $scope.askSearch = function(){
    var ajax = 'QueryHistoryProjectName';
    $scope.searchClick(ajax);
  };

  //  查看历史项目详情
  $scope.goSignedView = function(data){
    var id = data.data.prjtid;
    var name = "历史";
    locals.set('designerDownName',"历史");
    $state.go('typesetting.signedView',{id:id,name:name})
  }

});
