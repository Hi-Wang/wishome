/**
 * Created by ASUS on 2017/8/23.
 */
myApp.controller("projectOverViewCtrl",function($scope,$http,$rootScope,$state,locals){
  var id = locals.get("id");
  var userId = {
    'userId': id
  };
  $(".UrlA").eq(2).css('background','none');
  $(".UrlA").not($(".UrlA").eq(2)).css("background","none");
  $("#nb-global-spinner").css('display','block');
  $scope.select = [
    {'state':'立项'},
    {'state':'询价'},
    {'state':'签约'},
    {'state':'进度'},
    {'state':'交付'},
    {'state':'售后'}
  ];
  $scope.getAllProject = function(){
    $http({
      url: designerY + 'wishome-web/rest/add',
      method:'GET',
      params:userId
    }).success(function(data){
      $("#nb-global-spinner").css('display','none');
      $scope.prompt = data.list;
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
      $scope.tdList = data.newList;
      var len = data.newList.length;
      $scope.edit = [];
      if(len < 5){
        $scope.page = false
      }else{
        $scope.page = true;
      }
      for(var e=0;e<len;e++){
        if(data.newList[e].prjtstate === "立项"){
          $scope.editProject = "编辑"
        }else{
          $scope.editProject = "查看";
        }
        var edit = {
          'editProject':$scope.editProject
        };
        $scope.edit.push(edit);
      }
      $scope.list = [];
      for(var i=1;i<=Math.ceil(len/$scope.pageCount);$scope.list.push(i++));
    }).error(function(){
    });
  };
  $scope.getAllProject();
//模糊查询
  $scope.searchClick = function(data){
    var state = $("#projectStatus option:selected").html();
    if(state === '所有项目状态'){
      state = ""
    }
    var user = {
      'userid':$rootScope.id,
      "prjtname": $scope.keyWords,
      'prjtstate':state
    };
    $http({
      url:managerY + 'wishome-web/rest/blur',
      method:'GET',
      params:user
    }).success(function(data){
      $scope.tdList = data.newList;
      var len = data.newList.length;
      $scope.edit = [];
      if(len < 5){
        $scope.page = false
      }else{
        $scope.page = true;
      }
      for(var e=0;e<len;e++){
        if(data.newList[e].prjtstate === "立项"){
          $scope.editProject = "编辑"
        }else{
          $scope.editProject = "查看";
        }
        var edit = {
          'editProject':$scope.editProject
        };
        $scope.edit.push(edit);
      }
      $scope.list = [];
      for(var i=1;i<=Math.ceil(len/$scope.pageCount);$scope.list.push(i++));
    });
  };

//  点击详情
  $scope.projectDetails = function(data){
    var downName = "总项目";
    var n = data.$parent.pageIndex;
    var index = parseInt(data.$index) + parseInt([5*(n - 1)]);
    var stateName = data.tdList[index].prjtstate;
    var id = data.tdList[index].prjtid;
    var prjthstp = data.tdList[index].prjthstp;

    //路由记录
    locals.set('designerDownName',"总项目");

    if(stateName === "立项"){
      locals.set("designerPrjtId",id);
      locals.set("designerPrjthstp",prjthstp);
      $state.go('typesetting.preSale');
    }else if(stateName === "询价"){
      locals.set('designerPrjtId',id);
      $state.go('typesetting.outPutList')
    }else if(stateName === "询价结束"){
      $state.go('typesetting.askPriceEnd',{id:id})
    }else if(stateName === "签约"){
      $state.go('typesetting.signedView',{id:id,name:downName})
    }else if(stateName === "进度"){
      locals.set('designerPrjtId',id);
      $state.go('typesetting.scheduleView',{id:id})
    }
  }

});
