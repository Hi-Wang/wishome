/**
 * Created by ASUS on 2017/10/29.
 */
myApp.controller('infoChangePhoneCtrl',function($scope,$http,$rootScope,$state,$interval,$timeout,locals){
  var userId = {
    'userId':locals.get('id')
  };
  //页面加载时
  $scope.updPersonalInformation = function(item){
    $http({
      url: managerY +  'wishome-web/rest/updPersonalInformation',
      method:'get',
      params:item
    }).success(function(data){
      console.log(data);
      $scope.user = data.user;
      if(data.user.phoneNumber === null){
        data.user.phoneNumber = ''
      }else{
        $scope.newPhone = $scope.user.phoneNumber.substr(0, 3) + '****' + $scope.user.phoneNumber.substr(7);
        $scope.textPhone = $scope.user.phoneNumber.substr(0, 3) + '****' + $scope.user.phoneNumber.substr(7);
      }
      $scope.Identity = $rootScope.Identity;
      if(data.user.phoneNumber === ''){
        $scope.settingPhoneBox = true;
        $scope.changePhoneBox = false;
        return false;
      }else{
        $scope.settingPhoneBox = false;
        $scope.changePhoneBox = true;
        var item = {
          'phoneNumber': data.user.phoneNumber
        };
        $scope.ajaxSetCode();
        $scope.getCode(item);
      }
    });
  };
  $scope.updPersonalInformation(userId);

//  关于样式
  $scope.style = {
    "index1":true,
    "index2":false,
    "index3":false,
    "codeBtn":true
  };

//  设置手机号下一步
  $scope.phoneNext = function(item){
    var phoneNumber;
   if(item.settingPhoneBox === true && item.changePhoneBox === false){
     phoneNumber = $('.phone_box input[name ="phoneNumber"] ').val();
     $scope.regPhone(phoneNumber);
   }else if(item.settingPhoneBox === false && item.changePhoneBox === true){
     phoneNumber = $('.newPhone_box input[name ="newPhoneNumber"] ').val();
     $scope.regPhone(phoneNumber);
   }
  };

//  手机号验证
  $scope.regPhone = function(item){
    var reg = /^1[34578]\d{9}$/;
    if(!reg.test(item) && item.length !== 0){
      $("#phoneNumberBox").hide();
      $scope.errorPhone = true;
      $scope.errorPhoneText = "请输入正确的手机号。"
    }else if(item.length === 0){
      $scope.errorPhone = true;
      $scope.errorPhoneText = "手机号不能为空。"
    }else{
        var phone;
        phone = {
          'phoneNumber':item
        };
        $http({
          url: managerY +  'wishome-web/rest/TestingUserPhoneNumber',
          method:'get',
          params:phone
        }).success(function(data){
          if(data.state === 500){
            $scope.errorPhone = true;
            $scope.errorPhoneText = "该手机号已存在。"
          }else if(data.state === 200){
            $scope.errorPhone = false;
            $scope.newPhone = item.substr(0, 3) + '****' + item.substr(7);
            $scope.phoneNumberBox = false;
            $scope.codeBox = true;
            $scope.style.index2 = true;
            $scope.ajaxSetCode();
            $scope.getCode(phone);
          }
          console.log(data)
        });

    }
  };

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
    if(item.settingPhoneBox === true && item.changePhoneBox === false){
      var phoneNumber = {
        'phoneNumber':$('.phone_box input[name ="phoneNumber"] ').val()
      };
      if(item.style.codeBtn === true){
        $scope.ajaxSetCode();
        $scope.getCode(phoneNumber);
      }
      return false;
    }else if(item.settingPhoneBox === false && item.changePhoneBox === true){
      var oldPhoneNumber = {
        'phoneNumber':item.user.phoneNumber
      };
      if(item.style.codeBtn === true){
        $scope.ajaxSetCode();
        $scope.getCode(oldPhoneNumber);
      }
    }
  };

//  发送验证码
  $scope.setCode = function(item){
    console.log(item);
    var codeNumber,phoneNumber;
    if(item.settingPhoneBox === true && item.changePhoneBox === false){
      codeNumber = $('.code_box input[name ="codeNumber"] ').val();
      phoneNumber = $('.phone_box input[name ="phoneNumber"] ').val();
    }else if(item.settingPhoneBox === false && item.changePhoneBox === true){
      codeNumber = $('.oldPhone_box input[name ="oldCode"] ').val();
      phoneNumber = item.user.phoneNumber;
    }
    if(codeNumber.length === 0){
      $scope.errorCode = true;
      $scope.errorText = "验证码不能为空!";
      return false;
    }else if(codeNumber.length !== 6 && codeNumber.length !== 0){
      $scope.errorCode = true;
      $scope.errorText = "验证码错误!";
      return false;
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
        console.log(data);
        if(data.true){
          $scope.stopCount();
          if($scope.settingPhoneBox === true){

            var setCode = {
              'userId': item.user.userId,
              'phoneNumber': $('.phone_box input[name ="phoneNumber"] ').val()
            };
            $http({
              url: managerY +  'wishome-web/rest/updCurrencyCount',
              method:'get',
              params:setCode
            }).success(function(value){
              console.log(value);
              if(value.data === 200){
                $scope.codeBox = false;
                $scope.successBox = true;
                $timeout(function(){
                  $scope.style.index3 = true;
                  $scope.jump(item);
                },1000);
                return false;
              }
            });
            return false;
          }else if($scope.changePhoneBox === true){
            $scope.oldPhoneBox = false;
            $scope.newPhoneBox = true;
            $scope.style.index2 = true;
            return false;
          }
          return false;
        }else if(data.error){
          $scope.errorCode = true;
          $scope.errorText = data.error;
          return false;
        }
      })
    }
  };

  //  发送新号码的验证码
  $scope.setNewCode = function(item){
    console.log(item);
    var codeNumber,phoneNumber;
      codeNumber = $('.newPhone_box input[name ="newCode"] ').val();
      phoneNumber = $('.newPhone_box input[name ="newPhoneNumber"] ').val();
    if(codeNumber.length === 0){
      $scope.errorCode = true;
      $scope.errorText = "验证码不能为空!";
      return false;
    }else if(codeNumber.length !== 6 && codeNumber.length !== 0){
      $scope.errorCode = true;
      $scope.errorText = "验证码错误!";
      return false;
    }else{
      $scope.errorCode = false;
      var items = {
        'identifyingId':item.identifyingId,
        'phoneNumber':phoneNumber,
        'identifyingCode':codeNumber,
        'userId':item.user.userId
      };
      console.log(items);
      $http({
        url: managerY +  'wishome-web/rest/QueryIdentifyingId',
        method:'get',
        params:items
      }).success(function(data){
        console.log(data);
        console.log($scope);
        if(data.true){
          $scope.stopCount();
            var setCode = {
              'userId': item.user.userId,
              'phoneNumber': phoneNumber
            };
           $http({
             url: managerY +  'wishome-web/rest/updCurrencyCount',
             method:'get',
             params:setCode
           }).success(function(value){
             console.log(value);
             if(value.data === 200){
               $scope.codeBox = false;
               $scope.successBox = true;
               $scope.newPhoneBox = false;
               $timeout(function(){
                 $scope.style.index3 = true;
                 $scope.jump(item);
               },1000);
               return false;
             }
           });
            return false;
        }else if(data.error){
          $scope.errorCode = true;
          $scope.errorText = data.error;
          return false;
        }
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
    console.log(item);
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

