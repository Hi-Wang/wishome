myApp.controller('onlyOneNewsCtrl',function($scope,$stateParams,$state,$http,locals){
  //拿到消息数据
  //标为已读
  $scope.ajaxYiDu = function(){
    var id = {
      'msgId' : $stateParams.data
    };
    $http({
      url: managerY +  'wishome-web/rest/readMessage',
      method:'get',
      params:id
    }).success(function(data){
      $scope.data = data.msg;
      // if(data.title === null){
      //   return false
      // }else
        if(data.msg.title === "认证信息" && data.msg.signAu === 0){
        $scope.operating = true;
        $scope.noOperating = false
      }else if(data.msg.title === "认证信息" && data.msg.signAu === 1){
        $scope.operating = false;
        $scope.noOperating = true
      }else{
        $scope.operating = false;
        $scope.noOperating = false
      }
      $scope.onlyOneName = data.msg.title;
    })
  };
  $scope.ajaxYiDu();

  // $scope.data = angular.fromJson($stateParams.data);
  $scope.userName = locals.get('trueUserName');

  //同意
  $scope.agreeNews = function(item){
    $scope.designerId = '同意';
    $scope.header = true;
    $scope.alertText = "确认同意吗？";
    $scope.agreeShow();
  };

  //拒绝
  $scope.refuseNews = function(item){
    var id = {
      'signId' : 1,
      'msgId' : $scope.data.msgId
    };
    $scope.designerId = '拒绝';
    $scope.header = true;
    $scope.alertText = "确认拒绝吗？";
    $scope.agreeShow();
  };

  //个人页面
  $scope.goInfo = function(item){
    locals.set('id',item.id);
    $state.go('typesetting.changeInfo')
  };
});

myApp.directive('agreeRefuse',function(){
  return{
    restrict:'E',
    replace:true,
    templateUrl:'designer/model.html',
    controller:function($scope,$http,$state,locals){
      $scope.agreeShow = function(){
        $("#agree").show();
      };
      $scope.divHide = function(){
        $("#agree").hide();
      };
      $scope.cancelAsk = function(){
        $("#agree").hide();
      };
      $scope.againAsk = function(item){
        var id;
        if(item.designerId === "同意"){
          id = {
            'signId' : 1,
            'msgId' : item.data.messageId
          };
        }else if(item.designerId === "拒绝"){
          id = {
            'signId' : 0,
            'msgId' : item.data.messageId
          };
        }
        $http({
          url: managerY +  'wishome-web/rest/agreeOrRefuse',
          method:'get',
          params:id
        }).success(function(){
          var index = {
            'id' : locals.get('id')
          };
          $http({
            url: managerY +  'wishome-web/rest/messageList',
            method:'get',
            params:index
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
            $scope.cancelAsk();
            $state.go('typesetting.newsListView.newsRightView');
          });
        });
      }
    }
  }
});
