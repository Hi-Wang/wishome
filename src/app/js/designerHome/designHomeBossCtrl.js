myApp.controller("designHomeBossCtrl",function($scope,$rootScope,$http,$state,locals){
  var id = {
    'userId':$rootScope.id
  };
  $http({
    url: designerY + 'wishome-web/rest/QueryDesignerHousePersonalPage',
    method:'GET',
    params:id
  }).success(function(data){
    if(data.user.personalpicture === null){
      data.user.personalpicture = '../images/projectList/wishome.png'
    }
    if(data.use.personalpicture === null){
      data.use.personalpicture = '../images/projectList/wishome.png'
    }
    $scope.designerHome = data.deptName;
    $scope.queryDesignerHouse = data.queryDesignerHouse;
    $scope.manager = data.use;
    $scope.designer = data.user;
  });

  //查看设计师之家
  $scope.seeDesigner = function (item) {
    $state.go('typesetting.D_Home_designer');
  };

  //关闭查看设计师之家
  $scope.designerHomeDel = function(data){
    data.designerAndManager = true;
    data.seeDesignerHome = false;
  };
  //查看项目经理
  $scope.showManager = function(data){
    data.designerAndManager = false;
    data.seeManager = true;
  };
  //关闭查看项目经理
  $scope.managerDel = function(data){
    data.designerAndManager = true;
    data.seeManager = false;
  };

  //编辑资料
  $scope.changeInfo = function(item){
    $state.go('typesetting.changeInfo')
  };

  $scope.data1 = [
    {'val':'待办事项','title':'它是一个比较帅气的男孩儿',"img":"img/img1.png","name":"标题"},
    {'val':'已办事项','title':'它有着一张跟年龄不服的脸庞',"img":"img/img2.png","name":"发送用户"}
  ];

});
