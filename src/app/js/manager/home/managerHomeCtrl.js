/**
/**
 * Created by ASUS on 2017/10/13.
 */
myApp.controller('managerHomeCtrl',function($scope,$http,$state,$rootScope,locals){
  window.onbeforeunload = function(){
    return false;
  };
  $("#nb-global-spinner").css('display','block');
  var id = {
    'userId': locals.get('id')
  };
  $http({
    url:designerY + 'wishome-web/rest/QueryProjectManagerPersonalPage',
    method:'GET',
    params:id
  }).success(function(data){
    $("#nb-global-spinner").css('display','none');
    if(data.user.personalpicture === null ){
      data.user.personalpicture = '../images/projectList/wishome.png'
    }
    $scope.user = data.user;
    $scope.deptList = data.deptList;
  });

  //查看设计师之家
  $scope.goDesignerHome = function(data){
    var id = data.item.id;
    $state.go('typesetting.homeDesignerHome',{id:id})
  };
  $scope.data1 = [
    {'val':'待办事项','title':'它是一个比较帅气的男孩儿',"img":"img/img1.png","name":"标题"},
    {'val':'已办事项','title':'它有着一张跟年龄不服的脸庞',"img":"img/img2.png","name":"发送用户"}
  ];
//  修改个人信息
  $scope.changInfo = function(data){
    $state.go('typesetting.changeInfo')
  }
});



