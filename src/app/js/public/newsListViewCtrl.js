myApp.controller('newsListViewCtrl',function($scope,$rootScope,$state,$http,$stateParams,$filter,locals){
  $state.go('typesetting.newsListView.newsRightView');
  $scope.newsNav = [
    {'name':"全部消息",'num': false,'style':true},
    {'name':"未读消息",'num': true,'style':false},
    {'name':"已读消息",'num': false,'style':false}
  ];
  if($stateParams.num === "0"){
    $scope.newsNav[1].num = false
  }else{
    $scope.numSpan = $stateParams.num
  }
  $scope.headerNews = $scope.newsNav[0].name;

  $scope.newsListStyle = function(){
    if($rootScope.Identity === '设计师'){
      $scope.newsName = [
        {'name' : '全部消息','style':true},
        {'name' : '认证回馈','style':false},
        {'name' : '询价信息','style':false},
        {'name' : '交付信息','style':false}
      ];
      return false
    }else if($rootScope.Identity === '未认证设计师'){
      $scope.newsName = [
        {'name' : '全部消息','style':true},
        {'name' : '认证回馈','style':false}
      ];
      return false
    }else if($rootScope.Identity === '项目经理'){
      $scope.newsName = [
        {'name' : '全部消息','style':true},
        {'name' : '报价信息','style':false},
        {'name' : '交付信息','style':false},
        {'name' : '返单信息','style':false}
      ];
      return false
    }else if ($rootScope.Identity === '管理员'){
      $scope.newsName = [
        {'name' : '全部消息','style':true},
        {'name' : '认证消息','style':false},
        {'name' : '询价消息','style':false},
        {'name' : '报价消息','style':false}
      ];
      return false
    }else if($rootScope.Identity === '工厂管理员'){
      $scope.newsName = [
        {'name' : '全部消息','style':true},
        {'name' : '交付信息','style':false},
        {'name' : '下单信息','style':false}
      ];
      return false
    }else if($rootScope.Identity === '设计师之家管理员'){
      $scope.newsName = [
        {'name' : '全部消息','style':true},
        {'name' : '认证信息','style':false}
      ];
      return false
    }
  };
  $scope.newsListStyle();

  $scope.messageList = function(){
    var id = {
      'id' : locals.get('id')
    };
    $http({
      url: managerY +  'wishome-web/rest/messageList',
      method:'get',
      params:id
    }).success(function(data){
      for(var i=0;i<data.msg.length;i++){
        if(data.msg[i].signRead === 0){
          data.msg[i].signRead = true
        }else if(data.msg[i].signRead === 1){
          data.msg[i].signRead = false
        }
      }
      $scope.msg = data.msg;
      $scope.tdList = data.msg;
      $scope.trShow($scope.msg);
    });
  };
  $scope.messageList();

  //如果没有消息
  $scope.trShow = function(list){
    if(list.length === 0){
      $scope.noNews = true
    }else{
      $scope.noNews = false
    }
  };
//  切换
  $scope.newsNavTab = function(index,name,item){
    $state.go('typesetting.newsListView.newsRightView');
    var id = {
      'id' : locals.get('id')
    };
    $http({
      url: managerY +  'wishome-web/rest/messageList',
      method:'get',
      params:id
    }).success(function(data){
      for(var i=0;i<data.msg.length;i++){
        if(data.msg[i].signRead === 0){
          data.msg[i].signRead = true
        }else if(data.msg[i].signRead === 1){
          data.msg[i].signRead = false
        }
      }
      $scope.msg = data.msg;
      $scope.tdList = data.msg;
      $scope.headerNews = $scope.newsNav[index].name;
      for(var n=0;n<$scope.newsNav.length;n++){
        $scope.newsNav[n].style = false
      }
      $scope.newsNav[index].style = true;
      $scope.newsListStyle();
      if(name === '全部消息'){
        $scope.msg = $scope.tdList;
        $scope.trShow($scope.msg)
        // $scope.list(name);
        // return $scope.tdList;
      }else if(name === '未读消息'){
        $scope.vList = [];
        for(var v=0;v<$scope.tdList.length;v++){
          if($scope.tdList[v].signRead === true){
            $scope.vList.push($scope.tdList[v])
          }
        }
        $scope.msg = $scope.vList;
        $scope.trShow($scope.msg)
        // $scope.list(name);
        // return false
      }else if(name === '已读消息'){
        $scope.yList = [];
        for(var y=0;y<$scope.tdList.length;y++){
          if($scope.tdList[y].signRead === false){
            $scope.yList.push($scope.tdList[y])
          }
        }
        $scope.msg = $scope.yList;
        $scope.trShow($scope.msg);
        // $scope.list(name);
      }
      $scope.numSpan = $scope.vList.length;
    });
  };

  //  切换
  $scope.newsListTab = function(index,name,item){
    for(var i=0;i<$scope.newsName.length;i++){
      $scope.newsName[i].style = false;
    }
    $scope.newsName[index].style = true;
    var navName = item.$parent.headerNews;
    $scope.newsList(navName,name);
  };
  // //  判断
  $scope.newsList = function(navName,name){
    var list = [];
    var l;
    if(navName === '全部消息'){
      if(name === '全部消息'){
        $scope.msg = $scope.tdList;
        // $scope.list($scope.msg);
        $scope.trShow($scope.msg);
        return false
      }else{
        for(l=0;l<$scope.tdList.length;l++){
          if($scope.tdList[l].title === name){
            list.push($scope.tdList[l])
          }
        }
        $scope.msg = list;
        // $scope.list($scope.msg);
        $scope.trShow($scope.msg)
      }
      return false
    }else if(navName === '未读消息'){
      if(name === '全部消息'){
        $scope.msg = $scope.vList;
        // $scope.list($scope.msg);
        $scope.trShow($scope.msg);
        return false
      }else{
        for(l=0;l<$scope.vList.length;l++){
          if($scope.vList[l].title === name){
            list.push($scope.vList[l])
          }
        }
        $scope.msg = list;
        // $scope.list($scope.msg);
        $scope.trShow($scope.msg)
      }
      return false
    }else if(navName === '已读消息'){
      if(name === '全部消息'){
        $scope.msg = $scope.yList;
        // $scope.list($scope.msg);
        $scope.trShow($scope.msg);
        return false
      }else{
        for(l=0;l<$scope.yList.length;l++){
          if($scope.yList[l].title === name){
            list.push($scope.yList[l])
          }
        }
        $scope.msg = list;
        // $scope.list($scope.msg);
        $scope.trShow($scope.msg)
      }
    }
  };

  // //  判断
  $scope.list = function(navName){
    // var list = [];
    // var l;
    if(navName === '全部消息'){
        $scope.msg = $scope.tdList;
        // return false
    }else if(navName === '未读消息'){
      // if(name === '全部消息'){
        $scope.msg = $scope.vList;
      //   return false
      // }else{
      //   for(l=0;l<$scope.vList.length;l++){
      //     if($scope.vList[l].title === name){
      //       list.push($scope.vList[l])
      //     }
      //   }
      //   $scope.msg = list;
      // }
      // return false
    }else if(navName === '已读消息'){
      // if(name === '全部消息'){
        $scope.msg = $scope.yList;
      //   return false
      // }else{
      //   for(l=0;l<$scope.yList.length;l++){
      //     if($scope.yList[l].title === name){
      //       list.push($scope.yList[l])
      //     }
      //   }
      //   $scope.msg = list;
      // }
    }
  };

  //删除数据
  $scope.delThisNews = function(news,item){
    // $scope.delNewsModelShow();
    $scope.delNewsHeader = true;
    $scope.delNewsText = "删除提示";
    $scope.designerId = news.messageId;
    $scope.alertText = "确认要删除【" + news.senderName + "】的消息吗？";
    $("#delNewsModel").show();
  };

  $scope.$emit('dataChanged', $scope.newsNum);
  // 3. 监听到 changeData 事件后，改变子 Ctrl2 中 数据
  $scope.$on('changeData', function(event, data){
    $scope.numSpan = data;
  });

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

myApp.directive('delNews',function(){
  return{
    restrict:'E',
    replace:true,
    templateUrl:'designer/model.html',
    controller:function($scope,$http,$state,locals){
      $scope.delNewsModelShow = function(){
        $("#delNewsModel").show();
      };
      $scope.divHide = function(){
        $("#delNewsModel").hide();
      };
      $scope.cancelAsk = function(){
        $("#delNewsModel").hide();
      };
      $scope.againAsk = function(item){
        var id;
        id = {
          'msgId' : item.designerId
        };
          $http({
            url: managerY +  'wishome-web/rest/deleteOneMessage',
            method:'get',
            params:id
          }).success(function(data){
            console.log(data);
            $scope.messageList();
            $scope.cancelAsk();
            // return false;
            // for(var i=0;i<data.msg.length;i++){
            //   if(data.msg[i].signRead === 0){
            //     data.msg[i].signRead = true
            //   }else if(data.msg[i].signRead === 1){
            //     data.msg[i].signRead = false
            //   }
            // }
            // $scope.msg = data.msg;
            // $scope.tdList = data.msg;
            // $scope.cancelAsk();
            $state.go('typesetting.newsListView.newsRightView');
          });
      }
    }
  }
});
