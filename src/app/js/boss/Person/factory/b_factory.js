/**
 * Created by ASUS on 2017/9/13.
 */
myApp.controller('bFactoryCtrl',function($scope,$http,$state){
  //查看所有的工厂
  $scope.queryFactory = function(){
    $http({
      url:yang +'wishome-web/rest/queryFactory',
      method:'GET'
    }).success(function(data){
      var len = data.gc.length;
      for(var i=0;i<len;i++){
        if(data.gc[i].url === null || data.gc[i].url === ''){
          data.gc[i].url = '../images/projectList/wishome.png'
        }
      }
      $scope.factoryList = data.gc;
    });
  };
  $scope.queryFactory();

  //模糊查询
  $scope.askSearch = function(){
    var ajax = 'BossFactory';
    $scope.searchClick(ajax);
  };

//  添加工厂
  $scope.addFactory = function(){
    var text = "添加工厂";
    $scope.showAlertModel(text);
  };
  //上传工厂信息
  // $scope.setInformationFactory = function(item){
  //   $http({
  //     method:'GET',
  //     url:yang +'wishome-web/rest/addFactory',
  //     params: item
  //   }).success(function(data){
  //     $scope.queryFactory();
  //     $scope.alertAddFactoryModel = false;
  //   })
  // };
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
  //     $scope.setInformationFactory($scope.inputValue);
  //   })
  // };

//  删除工厂
  $scope.delFactory = function(data){
    var txt = data.data.deptName;
    $scope.changeText(txt);
    $scope.hideId = data.data.id;
    $scope.bossAlert = true;
    $scope.alertTextP = true;
    $scope.selectHome = false;
  };

  $scope.bossDelHome = function(item){
    var deptId = {
      'deptId': item.hideId
    };
    $http({
      method:'GET',
      url:yang +'wishome-web/rest/deleteFactory',
      params: deptId
    }).success(function(data){
      $scope.queryFactory();
      $scope.bossAlert = false;
    })
  };

//点击工厂跳转
  $scope.goFactoryPrjtList = function(data){
    var id = data.data.id;
    $state.go('typesetting.bFactoryPrjtList',{id:id})
  }

});
