myApp.controller('DescriptionCtrl',function($scope,$rootScope,$http,$state){
  $state.go('typesetting.Description.DescriptionRightView');
  console.log($scope);
  $scope.newsListStyle = function(){
    if($rootScope.Identity === '设计师'){
      $scope.newsNav = [
        {'name':"常见问题",'num': false,'style':true}
        // {'name':"未读消息",'num': true,'style':false},
        // {'name':"已读消息",'num': false,'style':false}
      ];
      $scope.newsName = [
        {'problemName' : '如何新建项目？'},
        {'problemName' : '如何修改项目基本信息？'},
        {'problemName' : '如何编辑项目区域？'},
        {'problemName' : '如何编辑项目产品？'},
        {'problemName' : '如何申请询价？'},
        {'problemName' : '如何签约项目？'},
        {'problemName' : '如何查看项目进度？'},
        {'problemName' : '如何进行项目交货？'},
        {'problemName' : '历史项目是什么？'}
      ]
      // return false
    }else if($rootScope.Identity === '未认证设计师'){
      $scope.newsNav = [
        {'name':"常见问题",'num': false,'style':true}
        // {'name':"未读消息",'num': true,'style':false},
        // {'name':"已读消息",'num': false,'style':false}
      ];
      $scope.newsName = [
        {'problemName' : '如何认证设计师？'},
        {'problemName' : '如何新建项目？'},
        {'problemName' : '如何修改项目基本信息？'},
        {'problemName' : '如何编辑项目区域？'},
        {'problemName' : '如何编辑项目产品？'},
        {'problemName' : '如何申请询价？'}
      ]
      // return false
    }else if($rootScope.Identity === '项目经理'){
      $scope.newsNav = [
        {'name':"常见问题",'num': false,'style':true}
        // {'name':"未读消息",'num': true,'style':false},
        // {'name':"已读消息",'num': false,'style':false}
      ];
      $scope.newsName = [
        {'problemName' : '如何申请报价？'},
        {'problemName' : '如何下单至工厂？'},
        {'problemName' : '如何查看项目进度？'},
        {'problemName' : '如何进行项目交货？'}
      ]
      // return false
    }else if ($rootScope.Identity === '管理员'){
      $scope.newsNav = [
        {'name':"常见问题",'num': false,'style':true}
        // {'name':"未读消息",'num': true,'style':false},
        // {'name':"已读消息",'num': false,'style':false}
      ];
      // return false
    }else if($rootScope.Identity === '工厂管理员'){
      $scope.newsNav = [
        {'name':"常见问题",'num': false,'style':true}
        // {'name':"未读消息",'num': true,'style':false},
        // {'name':"已读消息",'num': false,'style':false}
      ];
      // return false
    }else if($rootScope.Identity === '设计师之家管理员'){
      $scope.newsNav = [
        {'name':"常见问题",'num': false,'style':true}
        // {'name':"未读消息",'num': true,'style':false},
        // {'name':"已读消息",'num': false,'style':false}
      ];
      // return false
    }
    $scope.headerNews = $scope.newsNav[0].name;
  };
  $scope.newsListStyle();


  //点击左边侧边栏
  $scope.newsNavTab = function(item,index){
    console.log(item);
    if(item.nav.name === '常见问题'){
      $scope.newsListStyle();
      $state.go('typesetting.Description.DescriptionRightView');
    }
    console.log(index);
  };

  //  返回首页
  $scope.backHome = function(){
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
  };
});
