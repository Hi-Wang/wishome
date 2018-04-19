/**
 * Created by ASUS on 2017/9/11.
 */
myApp.controller('bSeeManagerProjectCtrl',function($scope,$state,$http,$stateParams){
  $scope.tableNav = [
    {'name':'报价项目'},
    {'name':'下单项目'},
    {'name':'进度项目'},
    {'name':'交付项目'}
  ];
  var user = $stateParams.id;
  var userId = {
    'UserId':user
  };
  $("#nb-global-spinner").css('display','block');
  //拉取 bseemanagerproject.html 的信息
  $scope.QueryBossSearchBox = function(){
    $http({
      url: yang +'wishome-web/rest/QueryBossSearchBox',
      method:'GET',
      params:userId
    }).success(function(data){
      $("#nb-global-spinner").css('display','none');
      if(data.list[0].personalpicture === null){
        data.list[0].personalpicture = '../images/projectList/wishome.png'
      }
      $scope.dataList = data.list[0];
      $scope.Input = data.list[0];
      $scope.ImgUrl = $scope.Input.personalpicture;
      $scope.tdList = data.pm;
      $('.styleTd').eq(0).css('background','#fff');
      var len = $scope.tdList.length;
      $scope.pageShow(len);
    });
  };
  $scope.QueryBossSearchBox();

//  修改项目经理信息
  $scope.changeManager = function(data){
    $scope.modelName = "修改项目经理信息";
    $scope.changeManagerModel = true
  };
//上传修改项目经理信息
  $scope.setInformation = function(item){
    $http({
      method:'GET',
      url:yang +'wishome-web/rest/BossUpdSearchBox',
      params: item
    }).success(function(data){
      $scope.QueryBossSearchBox();
      $scope.changeManagerModel = false;
    })
  };
  //图片上传
  $scope.setPhone = function(item){
    $http({
      method:'POST',
      url:yang +'wishome-web/rest/BossfilePhoto',
      data: item,
      headers:{'Content-Type':undefined},
      transformRequest:angular.identity
    }).success(function(data){
      $scope.inputValue.personalpicture = data.url;
      $scope.setInformation($scope.inputValue);
    })
  };

//  查看各个状态的项目
  $scope.getPrjtState = function(data,index){
    var c = $('.styleTd');
    $scope.changeNavStyle(c,index);
    var tdName = data.data.name;
    var userId = data.$parent.dataList.userId;
    var id = {};
    if(tdName === "报价项目"){
      id.UserId = userId;
      $scope.url = yang +'wishome-web/rest/queryBuildProject';
    }else if(tdName === "下单项目"){
      id.userId = userId;
      $scope.url = yang +'wishome-web/rest/queryOrderProject';
    }else if(tdName === "进度项目"){
      id.userId = userId;
      $scope.url = yang +'wishome-web/rest/queryProcessProjectPM';
    }else if(tdName === "交付项目"){
      id.userId = userId;
      $scope.url = yang +'wishome-web/rest/QueryBossSearchBox'
    }
    $http({
      url:$scope.url,
      method:'GET',
      params:id
    }).success(function(data){
      console.log(data);
      $scope.tdList = data.pm;
      var len = $scope.tdList.length;
      $scope.pageShow(len);
    });
  };

//  返回
  $scope.back = function(){
    $state.go('typesetting.bProjectManager')
  }

});
