/**
 * Created by ASUS on 2017/10/13.
 */
myApp.controller('homeDesignerHomeCtrl',function($scope,$http,$state,$stateParams){
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
      if(data.user.personalpicture === undefined ){
        data.user.personalpicture = '../images/projectList/wishome.png'
      }
      $scope.dept = data.dept;
      $scope.designerList = data.list;
      $scope.designerHome = data.user;
    });
  };
  $scope.ajaxGetDesignerHome(id);

  $scope.back = function(){
    $state.go('typesetting.managerAll')
  }
});
