/**
 * Created by ASUS on 2017/9/12.
 */
myApp.controller('bDesignerHomeCtrl',function($scope,$http,$state,$stateParams){
//  查看所有设计师之家
  $scope.queryAllDesignHome = function(){
    $http({
      url:boss +'wishome-web/rest/queryAllDesignHome',
      method:'GET'
    }).success(function(data){
      var len = data.dh.length;
      for(var i=0;i<len;i++){
        if(data.dh[i].url === null || data.dh[i].url === ''){
          data.dh[i].url = '../images/projectList/wishome.png'
        }
      }
      $scope.designerHome = data.dh;
    });
  };
  $scope.queryAllDesignHome();

  //点击搜索
  $scope.Inquire = function(item){
    var name = {
      'deptName':item.keyWords
    };
    $http({
      url:yang +'wishome-web/rest/BossDesignerHouse',
      method:'GET',
      params:name
    }).success(function(data){
      $scope.designerHome = data.list;
    });
  };

//  新增设计师之家
  $scope.addDesignerHome = function(data){
    var text = "添加设计师之家";
    $scope.showAlertModel(text);
    // data.inputDesignerHomeName = true;
    // $scope.addDesignerHomeModel = true
  };
// 查看项目经理信息
  $scope.d_bossSeeManager = function(data,index){
    var id = {
      'id':data.data.id
    };
    $http({
      url:boss +'wishome-web/rest/queryOnePm',
      method:'GET',
      params:id
    }).success(function(data){
      if(data.pm.personalpicture === null){
        data.pm.personalpicture = '../images/projectList/wishome.png'
      }
      $scope.d_Manager = data.pm;
      var showThis = $('.seeManagerDiv').eq(index);
      showThis.slideDown();
      $('.seeManagerDiv').not(showThis).slideUp(200);
    });
    // data.d_homeRightBox = false;
    // data.d_managerRightBox = true;
  };
//  关闭项目经理信息
  $scope.d_bossHide = function(data,index){
    var showThis = $('.seeManagerDiv').eq(index);
    showThis.slideUp();
  };

// //没有添加照片时，上传添加设计师之家信息
//   $scope.setInformationHome = function(item){
//     $http({
//       method:'GET',
//       url:boss +'wishome-web/rest/addDesignHome',
//       params: item
//     }).success(function(data){
//       $scope.queryAllDesignHome();
//       $scope.addDesignerHomeModel = false;
//     })
//   };

  //图片上传
  // $scope.setPhone = function(item){
  //   $http({
  //     method:'POST',
  //     url:yang +'wishome-web/rest/BossfilePhoto',
  //     data: item,
  //     headers:{'Content-Type':undefined},
  //     transformRequest:angular.identity
  //   }).success(function(data){
  //     $scope.inputValue.personalpicture = data.url;
  //     $scope.setInformationHome($scope.inputValue);
  //   })
  // };

//  删除设计师之家
  $scope.delDesignerHome = function(data){
    $scope.delDesignerHomeId = data.data.id;
    var text = data.data.deptName;
    $scope.changeText(text);
    $scope.alertTextP = true;
    $scope.selectHome = false;
    $scope.bossAlert = true;
  };
$scope.bossDelHome = function(){
  var item = {
    'id': $scope.delDesignerHomeId
  };
  $http({
    method:'GET',
    url:boss +'wishome-web/rest/deleteDesignHome',
    params: item
  }).success(function(){
    $scope.bossAlert = false;
    $scope.queryAllDesignHome();
  })
};
//  查看设计师们
  $scope.b_seeDesignerList = function(data){
    var id = data.data.id;
    $state.go('typesetting.bSeeDesigner',{id:id})
  }
});
