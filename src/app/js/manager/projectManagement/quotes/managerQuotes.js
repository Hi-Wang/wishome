/**
 * Created by ASUS on 2017/8/16.
 */
myApp.controller('managerQuotesCtrl',function($scope,$http,$state,$rootScope,locals){
  //项目经理看报价项目
  var user = {
    'userId': locals.get('id')
  };
  $(".UrlA").eq(0).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(0)).css("background","none");
  $scope.Quotes = function(item){
    $http({
      url: managerY +'wishome-web/rest/queryBuildProject',
      method:'POST',
      params:item
    }).success(function(data){
      var len = data.pm.length;
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
      $scope.list = [];
      $scope.edit = [];
      for(var e=0;e<len;e++){
        if($scope.tdList[e].prjtstate === "报价"){
          $scope.editProject = "编辑"
        }else{
          $scope.editProject = "查看";
        }
        var edit = {
          'editProject':$scope.editProject
        };
        $scope.edit.push(edit);
      }
      $scope.pageShow(len);
      // for(var i=1;i<=Math.ceil($scope.tdList.length/$scope.pageCount);$scope.list.push(i++));
    }).error(function(){
    })
  };

  //用户ID判断
  if($rootScope.id === null || undefined || ''){
    alert('失败')
  }else{
    $scope.Quotes(user);
  }

  //模糊查询
  $scope.askSearch = function(){
    var ajax = 'QueryProjectManagerOffer';
    var user = {
      'userid':$scope.rootId,
      "prjtname":$scope.keyWords
    };
    $http({
      url:managerY + 'wishome-web/rest/' + ajax,
      method:'GET',
      params:user
    }).success(function(data){
      $scope.tdList = data.pm;
      $scope.list = [];
      $scope.edit = [];
      for(var e=0;e<$scope.tdList.length;e++){
        if($scope.tdList[e].prjtstate === "报价"){
          $scope.editProject = "编辑"
        }else{
          $scope.editProject = "查看";
        }
        var edit = {
          'editProject':$scope.editProject
        };
        $scope.edit.push(edit);
      }
      for(var i=1;i<=Math.ceil($scope.tdList.length/$scope.pageCount);$scope.list.push(i++));
    });
  };
  //监听键盘
  $scope.myKeyup = function(e){
    var keycode = window.event?e.keyCode:e.which;
    if(keycode===13){
      $scope.askSearch();
    }
  };

  $scope.goQuotesView = function(data){
    locals.set('managerDownName',"报价");
    var n = data.$parent.pageIndex;
    var index = parseInt(data.$index) + parseInt([5*(n - 1)]);
    var stateName = data.tdList[index].prjtstate;
    var id = id = data.tdList[index].prjtid;
    if(stateName === "报价结束"){
      $state.go("typesetting.mQuotesViewSave",{id:id})
    }else if(stateName === "报价"){
      $state.go('typesetting.mQuotesView',{id: id})
    }
  }
});


