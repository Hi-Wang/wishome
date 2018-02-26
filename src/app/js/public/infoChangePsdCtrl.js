/**
 * Created by ASUS on 2017/11/1.
 */
myApp.controller('infoChangePsdCtrl',function($scope,$http,$rootScope,$state,$interval,$timeout,locals){
  var userId = {
    'userId':locals.get('id')
  };
  //style
  $scope.style = {
    'index1':true,
    'index2':false,
    'index3':false,
    "codeBtn":true
  };
  //页面加载时
  $scope.updPersonalInformation = function(item){
    $http({
      url: managerY +  'wishome-web/rest/updPersonalInformation',
      method:'get',
      params:item
    }).success(function(data){
      $scope.user = data.user;
      $scope.Identity = $rootScope.Identity;
      $scope.newPhone = $scope.user.phoneNumber.substr(0, 3) + '****' + $scope.user.phoneNumber.substr(7);
      var item = {
        'phoneNumber': data.user.phoneNumber
      };
      $scope.getCode(item);
      $scope.ajaxSetCode();
    });
  };
  $scope.updPersonalInformation(userId);

  //获取验证码
  $scope.getCode = function(item){
    $http({
      url: managerY +  'wishome-web/rest/NetEaseCloud',
      method:'get',
      params:item
    }).success(function(data){
      console.log(data);
      $scope.identifyingId = data.identifyingId;
    })
  };

  //  重新发送验证码
  $scope.againSetCode = function(item){
      var oldPhoneNumber = {
        'phoneNumber':item.user.phoneNumber
      };
      if(item.style.codeBtn === true){
        $scope.ajaxSetCode();
        $scope.getCode(oldPhoneNumber);
      }
  };

  //  发送验证码
  $scope.setCode = function(item){
    var codeNumber,phoneNumber;
      codeNumber = $('#phoneCode input[name ="code"] ').val();
      phoneNumber = item.user.userId;
    if(codeNumber.length === 0){
      $scope.errorCode = true;
      $scope.errorText = "验证码不能为空!"
    }else if(codeNumber.length !== 6 && codeNumber.length !== 0){
      $scope.errorCode = true;
      $scope.errorText = "验证码错误!"
    }else{
      $scope.errorCode = false;
      var items = {
        'identifyingId':item.identifyingId,
        'phoneNumber':phoneNumber,
        'identifyingCode':codeNumber,
        'userId':item.user.userId
      };
      $http({
        url: managerY +  'wishome-web/rest/QueryIdentifyingId',
        method:'get',
        params:items
      }).success(function(data){
        if(data.true){
           $scope.stopCount();
            $scope.phoneCode = false;
            $scope.newPsdBox = true;
            $scope.style.index2 = true;
            return false;
        }else if(data.error){
          $scope.errorCode = true;
          $scope.errorText = data.error
        }
      })
    }
  };

  //保存新密码
  $scope.savePsd = function(item){
    var psd = $('#psdBox input[name ="psd"] ').val();
    var psd2 = $('#psdBox input[name ="psd2"] ').val();
    if(psd.length < 6 || psd.length > 12 && psd.length !== 0 ){
      $scope.errorPsd = true;
      $scope.errorPsdText = "密码需要6-12位的字母或者数字组成。"
    }else if( psd.length === 0 ){
      $scope.errorPsd = true;
      $scope.errorPsdText = "密码不能为空。"
    }else if(psd !== psd2){
      $scope.errorPsd = true;
      $scope.errorPsdText = "密码输入不一致。"
    }else{
      $scope.errorPsd = false;
      // $scope.style.index3 = true;
      $scope.newPsdBox = false;
      $scope.successBox = true;
      var items = {
        'userId': item.user.userId,
        'password' : psd
      };
      $http({
        url: managerY +  'wishome-web/rest/updCurrencyPassWord',
        method:'get',
        params:items
      }).success(function(){
        $timeout(function(){
          $scope.style.index3 = true;
          $scope.jump(item);
        },1000);
      })
    }
  };

  //  发送验证码
  $scope.s = 30;
  $scope.paracont = "发送验证码";
  var timePromise ;
  $scope.ajaxSetCode = function(){
    timePromise = $interval(function(){
      if( $scope.s <=0){
        $interval.cancel(timePromise);
        timePromise = undefined;
        $scope.s  = 60;
        $scope.style.codeBtn = true;
        $scope.paracont = "重发验证码";
      }else{
        $scope.style.codeBtn = false;
        $scope.paracont =  $scope.s + "秒后可重发";
        $scope.s --;
      }
    },1000);
  };
  $scope.stopCount = function(){
    $scope.paracont = "发送验证码";
    $interval.cancel(timePromise);
    $scope.style.codeBtn = true;
  };

//  修改手机号
  $scope.changePhoneNumber = function(){
    $state.go('typesetting.infoChangePhone')
  };

  //跳转倒计时
  $scope.jump = function(item){
    var timePromise;
    $scope.jumpNumber = 3;
    timePromise = $interval(function(){
      if( $scope.jumpNumber <= 0){
        $interval.cancel(timePromise);
        timePromise = undefined;
        $scope.stateJump(item);
      }else{
        $scope.jumpNumber --;
      }
    },1000);
  };
//  页面跳转
  $scope.stateJump = function(item){
    if(item.Identity === '设计师' || item.Identity === '未认证设计师'){
      $state.go('typesetting.designerAll')
    }else if(item.Identity === '项目经理'){
      $state.go('typesetting.managerAll')
    }else if (item.Identity === '管理员'){
      $state.go('typesetting.bossAll')
    }else if(item.Identity === '工厂管理员'){
      $state.go('typesetting.factoryAll')
    }else if(item.Identity === '设计师之家管理员'){
      $state.go('typesetting.designHomeBoss')
    }
  };

//  返回
  $scope.back = function(item){
    if(item.Identity === '设计师' || item.Identity === '未认证设计师'){
      $state.go('typesetting.designerAll')
    }else if(item.Identity === '项目经理'){
      $state.go('typesetting.managerAll')
    }else if (item.Identity === '管理员'){
      $state.go('typesetting.bossAll')
    }else if(item.Identity === '工厂管理员'){
      $state.go('typesetting.factoryAll')
    }else if(item.Identity === '设计师之家管理员'){
      $state.go('typesetting.designHomeBoss')
    }
  }
});
