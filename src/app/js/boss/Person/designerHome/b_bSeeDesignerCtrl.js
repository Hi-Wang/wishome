/**
 * Created by ASUS on 2017/9/12.
 */
myApp.controller('bSeeDesignerCtrl',function($scope,$http,$state,$stateParams){
  var id = {
    'id':$stateParams.id
  };
  //获取设计师之家的设计师们
  $scope.ajaxGetDesignerHome = function(item){
    $http({
      url:boss +'wishome-web/rest/queryAllDesigner',
      method:'GET',
      params:item
    }).success(function(data){
      for(var i=0;i<data.list.length;i++){
        if(data.list[i].personalpicture === null){
          data.list[i].personalpicture = '../images/projectList/wishome.png'
        }
      }
      $scope.dept = data.dept;
      $scope.designerList = data.list;
      $scope.Input = data.user;
      $scope.ImgUrl = $scope.Input.personalpicture;
      $scope.designerHome = data.user;
    });
  };
  $scope.ajaxGetDesignerHome(id);

//移除设计师
  $scope.delDesigner = function(data){
    var name = data.data.nickname;
    $scope.alertName(name);
    $scope.hideId = data.data.id;
    $scope.alertTextP = true;
    $scope.homeModelName = "移除设计师";
    $scope.alertDesignerHome = true
  };
  $scope.ajaxDelDesigner = function(item){
    $http({
      url:boss +'wishome-web/rest/deleteOneDesigner',
      method:'GET',
      params:item
    }).success(function(data){
      var id = {
        'id':data.oldDeptid
      };
      $scope.ajaxGetDesignerHome(id);
      $scope.alertDesignerHome = false;
    });
  };

//  变更设计师之家
  $scope.changeDesignerHomeName = function(data){
    var id = {
      'userId':data.data.id
    };
    $http({
      url:boss +'wishome-web/rest/queryOtherDesignHome',
      method:'GET',
      params:id
    }).success(function(data){
      $scope.designerHomeName = data.list;
      $scope.showHomeList($scope.designerHomeName);
    });
    $scope.hideId = data.data.id;
    $scope.alertTextP = false;
    $scope.selectHome = true;
    $scope.homeModelName = "变更设计师之家";
    $scope.alertDesignerHome = true
  };

  $scope.ajaxChangeDesignerHome = function(item){
    $http({
      url:boss +'wishome-web/rest/upDesignerDesignHome',
      method:'GET',
      params:item
    }).success(function(data){
      var id = {
        'id':data.oldDeptid
      };
      $scope.ajaxGetDesignerHome(id);
      $scope.alertDesignerHome = false;
    });
  };

  //上传修改设计师之家信息
  $scope.setInformation = function(item){
    $http({
      method:'GET',
      url:yang +'wishome-web/rest/BossUpdDesigner',
      params: item
    }).success(function(data){
      $scope.ajaxGetDesignerHome(id);
      $scope.changeDesignerHomeModel = false;
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
//  查看设计师的项目
  $scope.b_seeDesignerPrjtList = function(data){
    var id = data.data.id;
    $state.go('typesetting.bSeeDesignerPrjtList',{id:id})
  };
//返回
  $scope.back = function(){
    $state.go('typesetting.bDesignerHome')
  }
});
