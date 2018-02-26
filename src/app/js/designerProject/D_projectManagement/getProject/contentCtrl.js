/**
 * Created by ASUS on 2017/11/3.
 */
myApp.controller('contentCtrl',function($scope,$http,$filter,$state,$rootScope,$ocLazyLoad,locals){

  var designerLocalsId = locals.get("id");
  var userId = {
    'userid': designerLocalsId
  };
  $(".UrlA").eq(0).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(0)).css("background","none");
  //拉取立项列表
  $scope.addList = function(item){
    $http({
      url: designerY + 'wishome-web/rest/QueryPrjtState',
      method:'GET',
      params:item
    }).success(function(data){
        $scope.prompt = data.newList;
        $scope.tdList = data.list;
        $scope.pm = data.pm;
        if($rootScope.Identity === '设计师'){
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
        }else if($rootScope.Identity === '未认证设计师'){
          $scope.promptBox = [
            {'name':"项目总数:", 'num' : $scope.prompt.list1 + ' 个，'},
            {'name':"立项项目:", 'num' : $scope.prompt.list2 + ' 个，'}
          ];
        }
        var len = $scope.tdList.length;
        $scope.pageShow(len);
    }).error(function(){
    });
  };
  //用户ID判断
  if(designerLocalsId === null || undefined || ''){
    alert("错误！")
  }else{
    $scope.addList(userId);
  }

  //模糊查询
  $scope.askSearch = function(){
    var ajax = 'QueryProjectName';
    $scope.searchClick(ajax);
  };

  //弹框消失时
  // $scope.modelHide = function(){
  //   $scope.modelError = false;
  //   $scope.prjtcode = "";
  //   $scope.prjtmemo = "";
  //   $scope.t1 = "项目类别";
  //   $scope.t2 = "户型";
  //   $scope.t3 = "主材";
  //   $scope.t4 = "板材";
  //   $scope.t5 = "五金品牌";
  //   $("#listnameValue").val();
  //   $("#listpcgValue option:selected").html();
  //   $("#prjthstp option:selected").html();
  //   $("#listpcValue option:selected").html();
  //   $("#listdValue option:selected").html();
  //   $("#listbValue option:selected").html();
  // };

  //新建项目弹出model
  $scope.getNewList = function() {
    $scope.t1 = "项目类别";
    $scope.t2 = "户型";
    $scope.t3 = "主材";
    $scope.t4 = "板材";
    $scope.t5 = "五金品牌";
    $http({
      url:zheng + 'wishome-web/rest/select',
      method: 'GET'
    }).success(function (data) {
      $scope.prjtcode = data.prjtcode;
      $scope.listb = data.listb;
      $scope.listd = data.listd;
      $scope.listpc = data.listpc;
      data.listpcg.push({'prjtcatename' : "自定义"});
      $scope.listpcg = data.listpcg;
      $scope.listphc = data.listphc;
      $scope.prjtcate = data.prjtcate;
      $scope.prjthstp = data.prjthstp;
      $scope.listpcValue = data.listpc[0];
      $scope.listbValue = data.listb[0];
      $scope.listpcgValue = data.listpcg[0];
      $scope.prjthstp = "自定义";
      var room = {
        "prjtCateName": data.listpcg[0].prjtcatename
      };
      $scope.getNextOption(room);
      // $scope.listpcgValue = "自定义";
      $scope.addproject = true
    })
  };
  //select change get option

// setThis 编辑
  $scope.setThis = function(data){
    var id = data.data.prjtid;
    var prjthstp = data.data.prjthstp;
    locals.set('designerDownName',"立项");
    locals.set("designerPrjtId",id);
    locals.set("designerPrjthstp",prjthstp);
    $state.go('typesetting.preSale');
  };

  $scope.updateList = function(count){
    var output = $filter('filter')($scope.tdList);
    var n = Math.ceil(output.length/count);
    $scope.list = [];
    for(var i=1;i<=n;$scope.list.push(i++));
    $scope.pageIndex = 1;
  };

});
