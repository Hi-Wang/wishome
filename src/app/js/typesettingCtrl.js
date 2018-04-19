/**
 * Created by ASUS on 2017/10/9.
 */
myApp.controller('typesettingCtrl',function($scope,$state,$rootScope,$location){
  if($location.path() === "/typesetting"){
    if($rootScope.Identity === '设计师'){
      $state.go('typesetting.designerAll')
    }else if($rootScope.Identity === '未认证设计师'){
      $state.go('typesetting.designerAll')
    }else if($rootScope.Identity === '项目经理'){
      $state.go('typesetting.managerAll')
    }else if ($rootScope.Identity === '管理员'){
      $state.go('typesetting.bossAll')
    }else if($rootScope.Identity === '工厂管理员'){
      $state.go('typesetting.factoryAll')
    }else if($rootScope.Identity === '设计师之家管理员'){
      $state.go('typesetting.designHomeBoss')
    }
  }
});

