/**
 * Created by ASUS on 2017/8/29.
 */
myApp.controller('bProjectManagerCtrl',function($state,$scope,$rootScope,$http){
  //查看所有项目经理
  $("#nb-global-spinner").css('display','block');
  $scope.queryAllPM = function(){
    $http({
      url: boss +'wishome-web/rest/queryAllPM',
      method:'GET'
    }).success(function(data){
      $("#nb-global-spinner").css('display','none');
      var len = data.pm.length;
      for(var i=0;i<len;i++){
        if(data.pm[i].personalpicture === null || data.pm[i].personalpicture === ''){
          data.pm[i].personalpicture = "../images/projectList/wishome.png"
        }
      }
      $scope.data = data.pm;
    });
  };
  $scope.queryAllPM();

  //点击搜索
  $scope.Inquire = function(item){
    var name = {
      'username':item.keyWords
    };
    $http({
      url:yang +'wishome-web/rest/BossSearchBox',
      method:'GET',
      params:name
    }).success(function(data){
      var len = data.list.length;
      for(var i=0;i<len;i++){
        if(data.list[i].personalpicture === null || data.list[i].personalpicture === ''){
          data.list[i].personalpicture = "../images/projectList/wishome.png"
        }
      }
      $scope.data = data.list;
    });
  };
  //显示设计师之家
  $scope.homeRightBoxShow = function(data,index){
    $scope.home = [];
    for(var h=0;h<$scope.data.length;h++){
      $scope.home.push($scope.data[h]);
    }
    var userId = {
      'userId':$scope.home[data.$index].id
    };
    $scope.getHomeNameList(userId);

    var homeRightBox = $(".homeRightBox").eq(index);
    homeRightBox.slideDown();
    $(".homeRightBox").not(homeRightBox).slideUp();

    // var b_managerRightBoxHide = $(".b_managerRightBoxHide").eq(index);
    // b_managerRightBoxHide.slideUp();
    // $(".b_managerRightBoxHide").not(b_managerRightBoxHide).show();
    // data.managerRightBox = false;
    // data.homeRightBox = true;
  };

//  拿到设计师之家列表
  $scope.getHomeNameList = function(data){
    $http({
      url: boss +'wishome-web/rest/queryDesignerHome',
      method:'GET',
      params:data
    }).success(function(item){
      $scope.userHome = item.dh;
    });
  };

//  隐藏设计师之家
  $scope.hideHome = function(index){
    $scope.userHome = [];
    // $(".b_managerRightBoxHide").eq(index).show();
    $(".homeRightBox").eq(index).slideUp();
    // data.managerRightBox = true;
    // data.homeRightBox = false;
  };

//  删除设计师之家弹框
  $scope.delHome = function(data){
    $scope.deptId = data.Home.id;
    $scope.managerNameId = data.$parent.data.id;
    var homeName = data.Home.deptName;
    $scope.changeText(homeName);
    $scope.alertTextP = true;
    $scope.homeModelName = "删除设计师之家";
    $scope.selectHome = false;
    $scope.bossAlert = true;
  };

//  新增设计师之家
  $scope.addHome = function(item){
    var id = {
      'userId':item.data.id
    };
    $http({
      url: boss +'wishome-web/rest/queryNoPMDDesignerHome',
      method:'GET',
      params:id
    }).success(function(data){
      $scope.homeName = data.nodh;
      $scope.managerName = data.id;
    });
    $scope.homeModelName = "新增设计师之家";
    $scope.bossAlert = true;
    $scope.alertTextP = false;
    $scope.selectHome = true;
  };

//  删除设计师
  $scope.ajaxDelHome = function(data){
    $http({
      url: boss +'wishome-web/rest/deletePMDesignerHome',
      method:'GET',
      params:data
    }).success(function(){
      var id = {
        'userId':data.userId
      };
      $scope.getHomeNameList(id);
      $scope.bossAlert = false;
    });
  };

  //添加设计师
  $scope.ajaxAddHome = function(data){
    $http({
      url: boss +'wishome-web/rest/addPMDesignerHome',
      method:'GET',
      params:data
    }).success(function(){
      var id = {
        'userId':data.userId
      };
      $scope.getHomeNameList(id);
      $scope.bossAlert = false;
    });
  };

  //点击model确定
  $scope.bossDelHome = function(data){

    if($scope.homeModelName === "删除设计师之家"){
      var delId = {
        'userId':$scope.managerNameId,
        'deptId':$scope.deptId
      };
      $scope.ajaxDelHome(delId);

    }else if($scope.homeModelName === "新增设计师之家"){
      var index = $("#selectHomeName option:selected")[0].index;
      var addId = {
        'userId':$scope.managerName,
        'deptId':$scope.homeName[index].id
      };
      $scope.ajaxAddHome(addId);
    }
  };

//显示添加项目经理弹框
  $scope.showAddManagerModel = function(){
    var text = "添加项目经理";
    $scope.showAlertModel(text);
  };

//  添加项目经理

// //上传新增项目经理信息
//   $scope.setInformation = function(item){
//     $http({
//       method:'GET',
//       url:yang +'wishome-web/rest/BossAddSearchBox',
//       params: item
//     }).success(function(data){
//       $scope.queryAllPM();
//       $scope.addManager = false;
//     })
//   };
  // //图片上传
  // $scope.setPhone = function(item){
  //   $http({
  //     method:'POST',
  //     url:yang +'wishome-web/rest/BossfilePhoto',
  //     data: item,
  //     headers:{'Content-Type':undefined},
  //     transformRequest:angular.identity
  //   }).success(function(data){
  //     $scope.inputValue.personalpicture = data.url;
  //     $scope.setInformation($scope.inputValue);
  //   })
  // };

//  boss查看项目
  $scope.bossSeeProject = function(data){
    var id = $scope.data[data.$index].id;
    $state.go('typesetting.bSeeManagerProject',{id:id})
  }
});

