/**
 * Created by ASUS on 2017/9/13.
 */
myApp.controller('bSeeDesignerPrjtListCtrl',function($scope,$state,$http,$stateParams){
  // alert($stateParams.id);
  $scope.tableNav = [
    {'name':'立项项目'},
    {'name':'询价项目'},
    {'name':'签约项目'},
    {'name':'进度项目'},
    {'name':'交付项目'}
  ];
  var id = [];
  $("#nb-global-spinner").css('display','block');
  id.UserId = $stateParams.id;
  $http({
    url:yang +'wishome-web/rest/QueryDesigner',
    method:'GET',
    params:id
  }).success(function(data){
    $("#nb-global-spinner").css('display','none');
    $scope.dataList = data.list[0];
    $scope.deptId = data.deptId;
    $scope.tdList = data.prjtlist;
    $('.styleTd').eq(0).css('background','#fff');
    $scope.list = [];
    for(var i=1;i<=Math.ceil($scope.tdList.length/$scope.pageCount);$scope.list.push(i++));
  });

//  获取设计师各个状态项目列表
  $scope.getDesignerPrjtList = function(data,index){
    var c = $('.styleTd');
    $scope.changeNavStyle(c,index);
    var name = data.data.name;
    if(name === "立项项目"){
      id.userid = $stateParams.id;
      $scope.url =  yang +'wishome-web/rest/QueryPrjtState'
    }else if(name === "询价项目"){
      id.userid = $stateParams.id;
      $scope.url =  yang +'wishome-web/rest/QueryInquiryTableState'
    }else if(name === "签约项目"){
      id.userid = $stateParams.id;
      $scope.url =  yang +'wishome-web/rest/QuerySig'
    }else if(name === "进度项目"){
      id.userid = $stateParams.id;
      $scope.url =  yang +'wishome-web/rest/QueryDesignerSpeed'
    }else if(name === "交付项目"){
      id.userid = $stateParams.id;
      $scope.url =  yang +'wishome-web/rest/QueryDesignerInteractive'
    }
    $http({
      url:$scope.url,
      method:'GET',
      params:id
    }).success(function(data){
      $scope.tdList = data.list;
      $scope.list = [];
      for(var i=1;i<=Math.ceil($scope.tdList.length/$scope.pageCount);$scope.list.push(i++));
    });
  };



//  返回上级
  $scope.back = function(data){
    $state.go("typesetting.bSeeDesigner",{id:$scope.deptId})
  }
});
