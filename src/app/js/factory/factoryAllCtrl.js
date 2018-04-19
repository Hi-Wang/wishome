/**
 * Created by ASUS on 2017/10/17.
 */
myApp.controller('factoryAllCtrl',function($scope,$http,$state,locals){
  $("#nb-global-spinner").css('display','block');
  var id = {
    'userId':locals.get('id')
  };
  $scope.QueryFactoryPersonalPage = function(item){
    $http({
      url: factoryY +'wishome-web/rest/QueryFactoryPersonalPage',
      method:'GET',
      params:item
    }).success(function(data){
      $("#nb-global-spinner").css('display','none');
      if(data.user.personalpicture === null || '' || undefined ){
        data.user.personalpicture = '../images/projectList/wishome.png'
      }
      $scope.deptName = data.deptName;
      $scope.user = data.user;
    })
  };
  $scope.QueryFactoryPersonalPage(id);

  $scope.data1 = [
    {'val':'待办事项','title':'它是一个比较帅气的男孩儿',"img":"img/img1.png","name":"标题"},
    {'val':'已办事项','title':'它有着一张跟年龄不服的脸庞',"img":"img/img2.png","name":"发送用户"}
  ];

  //  查看更多
  $scope.changeInfo = function(data){
    $state.go('typesetting.changeInfo')
  }

});
