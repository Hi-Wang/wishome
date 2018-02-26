myApp.controller('D_Home_designerCtrl',function($scope,$rootScope,$state,$http){

  $scope.queryAllDesigner = function(){
    var id = {
      'id':$rootScope.deptId
    };
    $http({
      url: designerY + 'wishome-web/rest/queryAllDesigner',
      method:'GET',
      params:id
    }).success(function(data){
      $scope.data = data.list;
      var len = data.list.length;
      for(var i=0;i<len;i++){
        if(data.list[i].personalpicture === null || data.list[i].personalpicture === ''){
          data.list[i].personalpicture = '../images/projectList/wishome.png'
        }
      }
    });
  };
  $scope.queryAllDesigner();


//  显示信息
  $scope.fullDivInfo_show = function(index){
    $('.fullDivInfo').eq(index).slideDown(400);
  };
  //隐藏信息
  $scope.fullDivInfo_hide = function(index){
    $('.fullDivInfo').eq(index).slideUp(400);
  };
//  删除设计师
  $scope.delDesignerBtn = function(item){
    $('.delDesignerModel').show();
    $scope.designerId = item.data.id;
    $scope.alertText = "您确定删除设计师【" + item.data.username + "】吗？";
    $scope.header = true;
  };

//  查看设计师项目
  $scope.seeDesignerPrjt = function(item){
    var id = item.data.id;
    $state.go('typesetting.DH_designerProject',{id:id})
  }

});

myApp.directive('delDesigner',function(){
  return{
    restrict:'EA',
    templateUrl:'designer/model.html',
    replace:true,
    controller:function($scope,$http,$timeout){
      $scope.divHide = function(){
        $('.delDesignerModel').hide();
      };
      $scope.cancelAsk = function(){
        $scope.divHide();
      };
      //确定删除设计师按钮
      $scope.againAsk = function(item){
        var id = {
          'userId' : item.designerId
        };
        $http({
          url: designerY + 'wishome-web/rest/deleteOneDesigner',
          method:'GET',
          params:id
        }).success(function(data){
          $scope.queryAllDesigner();
          $scope.divHide();
          $timeout(function(){
            $('.successText').slideDown();
          },800);
          $timeout(function(){
            $('.successText').slideUp();
          },1600)
        })
      };
    }
  }
});
