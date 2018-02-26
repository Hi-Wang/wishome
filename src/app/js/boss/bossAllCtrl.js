/**
 * Created by ASUS on 2017/10/17.
 */
myApp.controller('bossAllCtrl',function($scope,$http,$state,locals){
  var id = {
    'userId': locals.get("id")
  };
  $scope.QueryAdminPersonalPage = function(item){
    $http({
      url:bossY + 'wishome-web/rest/QueryAdminPersonalPage',
      method:'GET',
      params:item
    }).success(function(data){
      if(data.user.personalpicture === null || '' || undefined ){
        data.user.personalpicture = '../images/projectList/wishome.png'
      }
      $scope.user = data.user;
    })
  };
  $scope.QueryAdminPersonalPage(id);

  //goManager
  $scope.goManager = function(){
    $state.go('typesetting.bProjectManager')
  };
  //goDesignerHome
  $scope.goDesignerHome = function(){
    $state.go('typesetting.bDesignerHome')
  };
  //goFactory
  $scope.goFactory = function(){
    $state.go('typesetting.bFactory')
  };

  $scope.data1 = [
    {'val':'待办事项','title':'它是一个比较帅气的男孩儿',"img":"img/img1.png","name":"标题"},
    {'val':'已办事项','title':'它有着一张跟年龄不服的脸庞',"img":"img/img2.png","name":"发送用户"}
  ];
//  查看更多
  $scope.changeInfo = function(data){
    $state.go('typesetting.changeInfo')
  }
});
