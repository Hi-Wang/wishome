/**
 * Created by ASUS on 2017/10/9.
 */
myApp.controller('topCtrl',function($scope,$http,$state,$rootScope,$window,locals){
  $scope.topImage = locals.get('topImage');
  $scope.stateView = function(){
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
    $(".UrlA").eq(2).css('background','none');
    $(".UrlA").not($(".UrlA").eq(2)).css("background","none");
  };
  $scope.goInfo = function(item){
    locals.set('id',item.id);
    $(".UrlA").eq(2).css('background','none');
    $(".UrlA").not($(".UrlA").eq(2)).css("background","none");
    $state.go('typesetting.changeInfo')
  };
//  退出登录
  $scope.exit = function(item){
    $http({
      url: managerZ +'wishome-web/rest/exit',
      method:'GET'
    }).success(function(){
      $.cookie("username",null,{path:"/"});
      $.cookie("psd",null,{path:"/"});
      $window.close();
    })
  };

  //拿列表
  $scope.getAllNewsList = function(item){
    console.log(item);
    if(item.newsNum === 0){
      $scope.newsListDiv = false;
      return false
    }else{
      $scope.ajaxQueryUnReMessage();
    }
  };

  $scope.ajaxQueryUnReMessage = function(){
    var id = {
      'dhId' : locals.get('id')
    };
    $http({
      url: managerY +  'wishome-web/rest/queryUnReMessage',
      method:'get',
      params:id
    }).success(function(data){
      $scope.newsListDiv = true;
      var list = [];
      var len = data.list.length;
      if(len < 4){
        $scope.topNewsList = data.list;
        return false
      }else if(len >= 4){
        for(var i=0;i<4;i++){
          list.push(data.list[i])
        }
        $scope.topNewsList = list;
        return false
      }
    });
  };

  //标为已读
  $scope.ajaxYiDu = function(news){
    var id = {
      'msgId' : news.messageId
    };
    $http({
      url: managerY +  'wishome-web/rest/readMessage',
      method:'get',
      params:id
    }).success(function(){
      console.log(news);
      $scope.newsNum = $scope.newsNum - 1;
      $scope.ajaxQueryUnReMessage();
    })
  };

  $scope.$emit('dataChanged', $scope.newsNum);
  // 3. 监听到 changeData 事件后，改变子 Ctrl2 中 数据
  $scope.$on('changeData', function(event, data){
    $scope.newsNum = data;
  });

//  查看所有
  $scope.goNewsList = function(item){
    var num = item.newsNum;
    var id = '';
    $(".UrlA").eq(2).css('background','none');
    $(".UrlA").not($(".UrlA").eq(2)).css("background","none");
    $state.go('typesetting.newsListView',{num:num,id:id})
  }
});
