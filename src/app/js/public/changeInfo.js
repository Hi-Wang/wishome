/**
 * Created by ASUS on 2017/10/13.
 */
myApp.controller('changeInfoCtrl',function($scope,$state,$http,$rootScope,$timeout,$location,locals){
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
      if(data.user.personalpicture === "" || data.user.personalpicture === null){
        data.user.personalpicture = "../images/projectList/wishome.png"
      }
      if(data.user.nickname === "" || data.user.nickname === null){
        $scope.changeNameBtn = "点击添加";
      }else {
        $scope.changeNameBtn = "修改";
      }
      if(data.user.qqOpenId === null){
        $scope.QQ = false
      }else{
        $scope.QQ = true
      }
      if(data.user.wxUnionId === null){
        $scope.WeChart = false
      }else{
        $scope.WeChart = true
      }
      $scope.user = data.user;
      $scope.Identity = $rootScope.Identity;
      if($scope.user.phoneNumber === null){
        $scope.user.phoneNumber = ''
      }else{
        $scope.newPhone = $scope.user.phoneNumber.substr(0, 3) + '****' + $scope.user.phoneNumber.substr(7);
      }
      if($scope.user.address === null){
        $scope.user.address = ''
      }
      if($scope.user.email === null){
        $scope.user.email = ''
      }
      $scope.changeStyle(data.user);
    });
  };
  $scope.updPersonalInformation(userId);

  //判断列表样式
  $scope.changeStyle = function(user){
    var vm = $scope.vm = {};
    var list = $scope.list = {};
    list.phoneColor = true;
    list.addressColor = true;
    list.emailColor = true;
    if(user.phoneNumber === "" && user.address === "" && user.email === ""){
      vm.value = 10;
      vm.style = 'progress-bar-danger';
      vm.grade = '极低';
      vm.class = 'color1';
      vm.text = '建议完善信息^_^';
      vm.showLabel = true;
      //列表设置
      list.phoneColor = false;
      list.phoneText = "未设置";
      list.phoneTextBtn = "设置";
      list.addressColor = false;
      list.addressText = "未设置";
      list.addressTextBtn = "设置";
      list.emailColor = false;
      list.emailText = "未设置";
      list.emailTextBtn = "设置";
    }else if(user.phoneNumber === "" && user.address === "" && user.email !== ""){   //低
      vm.value = 40;
      vm.style = 'progress-bar-warning';
      vm.grade = '低';
      vm.class = 'color2';
      vm.text = '继续努力！';
      vm.showLabel = true;
      //列表设置
      list.phoneColor = false;
      list.phoneText = "未设置";
      list.phoneTextBtn = "设置";
      list.addressColor = false;
      list.addressText = "未设置";
      list.addressTextBtn = "设置";
      list.emailColor = true;
      list.emailText = "已设置";
      list.emailTextBtn = "修改";
    }else if(user.phoneNumber !== "" && user.address === "" && user.email === ""){
      vm.value = 40;
      vm.style = 'progress-bar-warning';
      vm.grade = '低';
      vm.class = 'color2';
      vm.text = '继续努力！';
      vm.showLabel = true;
      //列表设置
      list.phoneColor = true;
      list.phoneText = "已设置";
      list.phoneTextBtn = "修改";
      list.addressColor = false;
      list.addressText = "未设置";
      list.addressTextBtn = "设置";
      list.emailColor = false;
      list.emailText = "未设置";
      list.emailTextBtn = "设置";
    }else if(user.phoneNumber === "" && user.address !== "" && user.email === ""){
      vm.value = 40;
      vm.style = 'progress-bar-warning';
      vm.grade = '低';
      vm.class = 'color2';
      vm.text = '继续努力！';
      vm.showLabel = true;
      //列表设置
      list.phoneColor = false;
      list.phoneText = "未设置";
      list.phoneTextBtn = "设置";
      list.addressColor = true;
      list.addressText = "已设置";
      list.addressTextBtn = "修改";
      list.emailColor = false;
      list.emailText = "未设置";
      list.emailTextBtn = "设置";
    }else if(user.phoneNumber === "" && user.address !== "" && user.email !== ""){   //中
      vm.value = 80;
      vm.style = 'progress-bar-info';
      vm.grade = '中';
      vm.class = 'color3';
      vm.text = '加油，就差一丢丢~';
      vm.showLabel = true;
      //列表设置
      list.phoneColor = false;
      list.phoneText = "未设置";
      list.phoneTextBtn = "设置";
      list.addressColor = true;
      list.addressText = "已设置";
      list.addressTextBtn = "修改";
      list.emailColor = true;
      list.emailText = "已设置";
      list.emailTextBtn = "修改";
    }else if(user.phoneNumber !== "" && user.address === "" && user.email !== ""){
      vm.value = 80;
      vm.style = 'progress-bar-info';
      vm.grade = '中';
      vm.class = 'color3';
      vm.text = '加油，就差一丢丢~';
      vm.showLabel = true;
      //列表设置
      list.phoneColor = true;
      list.phoneText = "已设置";
      list.phoneTextBtn = "修改";
      list.addressColor = false;
      list.addressText = "未设置";
      list.addressTextBtn = "设置";
      list.emailColor = true;
      list.emailText = "已设置";
      list.emailTextBtn = "修改";
    }else if(user.phoneNumber !== "" && user.address !== "" && user.email === ""){
      vm.value = 80;
      vm.style = 'progress-bar-info';
      vm.grade = '中';
      vm.class = 'color3';
      vm.text = '加油，就差一丢丢~';
      vm.showLabel = true;
      //列表设置
      list.phoneColor = true;
      list.phoneText = "已设置";
      list.phoneTextBtn = "修改";
      list.addressColor = true;
      list.addressText = "已设置";
      list.addressTextBtn = "修改";
      list.emailColor = false;
      list.emailText = "未设置";
      list.emailTextBtn = "设置";
    }else if(user.phoneNumber !== "" && user.address !== "" && user.email !== ""){  //优秀
      vm.value = 100;
      vm.style = 'progress-bar-success';
      vm.grade = '优秀';
      vm.class = 'color4';
      vm.text = '太棒啦，继续保持！';
      vm.showLabel = true;
      //列表设置
      list.phoneColor = true;
      list.phoneText = "已设置";
      list.phoneTextBtn = "修改";
      list.addressColor = true;
      list.addressText = "已设置";
      list.addressTextBtn = "修改";
      list.emailColor = true;
      list.emailText = "已设置";
      list.emailTextBtn = "修改";
    }
  };
  //修改真实姓名
  $scope.changeName = function(item){
    item.hideBtn = true;
    if(item.changeNameBtn === "点击添加"){
      $("#nickname").val(item.user.nickname);
      $scope.indexCode = 0;
      item.saveNicName = false;
      item.changeNameBtn = "保存";
      $scope.nameInput = true;
    }else if(item.changeNameBtn === "修改"){
      $("#nickname").val(item.user.nickname);
      $scope.indexCode = 1;
      item.saveNicName = false;
      item.changeNameBtn = "保存";
      $scope.nameInput = true;
    }else if(item.changeNameBtn === "保存"){
      var len = $("#nickname").val().length;
      var setItem = {
        'userId':item.user.userId,
        'nickname': $("#nickname").val()
      };
      if(len === 0){
        item.alertModel = true;
        $scope.setFlie = false;
        $scope.footer = false;
        $scope.alertImg = false;
        $scope.homeModelName = "提示：";
        $scope.alertTextP = true;
        $scope.alertText = "真实姓名不能为空";
        $timeout(function(){
          item.alertModel = false;
        },1000);
      }else if(len > 10){
        item.alertModel = true;
        $scope.setFlie = false;
        $scope.footer = false;
        $scope.alertImg = false;
        $scope.homeModelName = "提示：";
        $scope.alertTextP = true;
        $scope.alertText = "请输入正确的真实姓名";
        $timeout(function(){
          item.alertModel = false;
        },1000);
      }else{
        $scope.updCurrencyCount(setItem);
      }
    }
  };

  //ajax修改真实姓名
  $scope.updCurrencyCount = function(item){
    $http({
      url: managerY +  'wishome-web/rest/updCurrencyCount',
      method:'get',
      params:item
    }).success(function(data){
      if(data.data === 200){
        $scope.alertModel = true;
        $scope.setFlie = false;
        $scope.footer = false;
        $scope.alertImg = false;
        $scope.homeModelName = "提示：";
        $scope.alertTextP = true;
        $scope.hideBtn = false;
        $scope.alertText = "操作成功！";
        $timeout(function(){
          $scope.saveNicName = true;
          $scope.nameInput = false;
          $scope.alertModel = false;
          $scope.updPersonalInformation(userId);
        },900);
        return false;
      }
    })
  };
  //取消修改真实姓名
  $scope.hideInput = function(data){
    if(data.indexCode === 0){
      $scope.user.nickname = '';
      $scope.changeNameBtn = "点击添加"
    }else if(data.indexCode === 1){
      $scope.changeNameBtn = "修改"
    }
    data.nameInput = false;
    data.hideBtn = false;
    data.saveNicName = true;
  };
  //修改头像
  $scope.changeImg = function(item){
    item.setFlie = true;
    item.alertModel = true;
    $scope.footer = true;
    $scope.ImgUrl = item.user.personalpicture;
    $scope.alertImg = true;
    $scope.alertTextP = false;
    $scope.modelRightBtn = "上传头像";
    $scope.homeModelName = "修改头像";
  };

  //对手机号进行操作
  $scope.phoneBtnClick = function(item){
    $state.go('typesetting.infoChangePhone')
  };

  //修改Email
  $scope.onEmail = function(item){
    if(item.list.emailTextBtn === "设置"){

    }else if(item.list.emailTextBtn === "修改"){

    }
  };

  //修改密码
  $scope.changePsd = function(item){
    if(item.list.phoneTextBtn === "设置"){
      item.alertModel = true;
      $scope.setFlie = false;
      $scope.footer = false;
      $scope.alertImg = false;
      $scope.homeModelName = "提示：";
      $scope.alertTextP = true;
      $scope.alertText = "该操作需要通过手机验证，请先设置手机号。";
      $timeout(function(){
        item.alertModel = false;
      },1000);
    }else if(item.list.phoneTextBtn === "修改"){
      $state.go('typesetting.infoChangePsd')
    }
  };

  // 返回
  $scope.back = function(data){
    if(data.Identity === '项目经理'){
      if(data.hideBtn === true){
        $scope.alertInfo(data);
      }else{
        $state.go('typesetting.managerAll')
      }
    }else if(data.Identity === '设计师'){
      if(data.hideBtn === true){
        $scope.alertInfo(data);
      }else{
        $state.go('typesetting.designerAll')
      }
    }else if(data.Identity === '未认证设计师'){
      if(data.hideBtn === true){
        $scope.alertInfo(data);
      }else{
        $state.go('typesetting.designerAll')
      }
    }else if(data.Identity === '管理员'){
      if(data.hideBtn === true){
        $scope.alertInfo(data);
      }else{
        $state.go('typesetting.bossAll')
      }
    }else if(data.Identity === '工厂管理员'){
      if(data.hideBtn === true){
        $scope.alertInfo(data);
      }else{
        $state.go('typesetting.factoryAll')
      }
    }else if(data.Identity === '设计师之家管理员'){
      if(data.hideBtn === true){
        $scope.alertInfo(data);
      }else{
        $state.go('typesetting.designHomeBoss')
      }
    }
  };

//  提醒
  $scope.alertInfo = function(item){
    item.alertModel = true;
    $scope.setFlie = false;
    $scope.footer = false;
    $scope.alertImg = false;
    $scope.homeModelName = "提示：";
    $scope.alertTextP = true;
    $scope.alertText = "您有未保存的修改。";
    $timeout(function(){
      data.alertModel = false;
    },800);
  };

//  QQ绑定
  $scope.QQClick = function(){
    QC.Login.showPopup({
      appId:"101416019",
      redirectURI:"http://scmc.villion.cn"
    });
  };

//  QQ取消绑定
  $scope.UnQQClick = function(){
    var header = "取消绑定";
    var text = "确定取消QQ绑定吗？";
    $scope.QQIcon = true;
    $scope.weChartIcon = false;
    $scope.bindModelShow(header,text);
  };


//  微信绑定
  $scope.weChartClick = function(){
    $scope.alertCodeModel();
  };

//  微信取消绑定
  $scope.unWeChartClick = function(){
    var header = "取消绑定";
    var text = "确定取消微信绑定吗？";
    $scope.QQIcon = false;
    $scope.weChartIcon = true;
    $scope.bindModelShow(header,text);
  }

});

//对邮箱的操作
myApp.directive('emailChange',function(){
  return{
    restrict:'A',
    controller:function($scope,$state,$http){
      $scope.onEmail = function(item){
        item.hideBtn = true;
        if(item.list.emailTextBtn === "设置"){
          $scope.index = 1;
          item.list.emailTextBtn = "保存";
          item.emailShow = true;
          $scope.show();
        }else if(item.list.emailTextBtn === "修改"){
          $scope.index = 2;
          item.list.emailTextBtn = "保存";
          item.emailShow = true;
          $scope.show();
        }else if(item.list.emailTextBtn === "保存"){
          var emailCode = $('#emailBox input[type ="email"] ').val();
          var id = item.user.userId;
          var index = item.index;
          $scope.setEmail(emailCode,id,index);
          // item.emailShow = true;
        }
      };

      //保存Email
      $scope.setEmail = function(code,userId,index){
        var regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if(!regEmail.test(code) && code.length !== 0){
          $scope.disEmail = true;
          $scope.emailError = "请输入正确的邮箱。";
          return false;
        }else if(code.length === 0){
          $scope.disEmail = true;
          $scope.emailError = "邮箱不能为空。";
          return false;
        }else if(regEmail.test(code)){
          $scope.hideBtn = false;
          if(index === 1){
            $scope.list.emailTextBtn = "设置";
          }else if(index === 2){
            $scope.list.emailTextBtn = "修改";
          }
          var setCode = {
            'email': code,
            'userId': userId
          };
          $http({
            url: managerY +  'wishome-web/rest/updCurrencyCount',
            method:'get',
            params:setCode
          }).success(function(data){
            var item = {
              'userId': userId
            };
            $scope.updPersonalInformation(item);
            $scope.hide();
          })
        }
      };
      //取消
      $scope.hide = function(item){
        $("#emailBox").fadeOut(500);
        $scope.emailShow = false;
        $('#emailBox input[type ="email"] ').val('');
        item.hideBtn = false;
        if(item === 1){
          $scope.list.emailTextBtn = "设置";
        }else if(item === 2){
          $scope.list.emailTextBtn = "修改";
        }
      };
      $scope.show = function(){
        $("#emailBox").fadeIn(500);
        $scope.disEmail = false;
      };
    },
    link:function(scope,ele,attr){

      scope.emailHid = function(item){
        scope.hide(item.index);
      }
    }
  }
});

//对地址的操作
myApp.directive('addressChange',function(){
  return{
    restrict:'A',
    controller:function($scope,$http,$state){
      //操作
      $scope.onAddress = function(item){
        item.hideBtn = true;
        if(item.list.addressTextBtn === "修改"){
          $scope.address = 1;
          $scope.list.addressTextBtn = "保存";
          $("#addressBox").fadeIn(500);
          $scope.addressShow = true;
        }else if(item.list.addressTextBtn === "设置"){
          $scope.address = 2;
          $scope.list.addressTextBtn = "保存";
          $("#addressBox").fadeIn(500);
          $scope.addressShow = true;
        }else if(item.list.addressTextBtn === "保存"){
          var addressName = item.addressName;
          var userId = item.user.userId;
          var setCode = {
            'userId': userId,
            'address':addressName
          };
          $http({
            url: managerY +  'wishome-web/rest/updCurrencyCount',
            method:'get',
            params:setCode
          }).success(function(){
            var item = {
              'userId': userId
            };
            $scope.addressShow = false;
            $scope.hideBtn = false;
            $("#addressBox").fadeOut(500);
            $scope.updPersonalInformation(item);
          });
        }
      };

      //取消
      $scope.addressHid = function(item){
        // $scope.addressName = null;
        // $('#addressBox input[type ="addressInput"] ').val('');
        item.hideBtn = false;
        if(item.address === 1){
          $("#addressBox").fadeOut(500);
          item.addressShow = false;
          item.addressName = null;
          $scope.list.addressTextBtn = "修改";
        }else if(item.address === 2){
          $("#addressBox").fadeOut(500);
          item.addressShow = false;
          item.addressName = null;
          $scope.list.addressTextBtn = "设置";
        }
      };
    }
  }
});

myApp.directive('infoAlert',function(readFiles){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'public/infoAlert.html',
    controller:function($scope,$state,$http,$timeout){
      //上传头像AJAX
      $scope.filePhoto = function(data,u){
        var item = {
          'userId' : u,
          'personalpicture' : ''
        };
        $http({
          url: managerY + 'wishome-web/rest/filePhoto',
          method:'POST',
          data:data,
          headers:{'Content-Type':undefined},
          transformRequest:angular.identity
        }).success(function(items){
          var loadingShowText = "头像上传成功！";
          $scope.loaddingShow(loadingShowText);
          $timeout(function(){
            $scope.loaddingHide();
            item.personalpicture = items.url2[0];
            $scope.updCurrencyCount(item);
          },1000)
        })
      };
      //保存
      $scope.save = function(data){
        if($scope.modelRightBtn === '上传头像'){
          var loadingShowText = "头像上传中...";
          $scope.loaddingShow(loadingShowText);
          $scope.filePhoto(data.fd,data.user.userId);
          return false;
        }
      };

    },
    link:function(scope,ele,attr){
      //取消
      scope.modelHide = function(){
        scope.alertModel = false;
      };
      $("#modelFile").change(function(){
        var fd = new FormData();
        var file = document.querySelector('input[type=file]').files[0];
        var promise = readFiles.getData(this.files);
        promise.then(function(value){
          scope.ImgUrl = value[0].base;
        },function(value){
          alert(value);
        });
        scope.setFlie = false;
        fd.append("File",file);
        scope.fd = fd;
      });
    }
  }
});

myApp.service('readFiles',function($q){
  this.getData = function(arr){
    var res = [];
    for(var i=0;i<arr.length;i++){
      res.push(readFile(arr[i]));
    }
    return $q.all(res);
    function readFile(value){
      var deferred = $q.defer();
      var promise = deferred.promise;
      var reader = new FileReader;
      reader.readAsDataURL(value);
      reader.onload = function(){
        var obj = {};
        obj.base = this.result;
        obj.name = value.name;
        obj.lastModified = value.lastModified;
        obj.size = value.size;
        deferred.resolve(obj);
      };
      reader.onerror = function(){
        deferred.reject(value.name+'读取失败，请重试！');
      };
      return promise;
    }
  };
});

//取消绑定和绑定
myApp.directive('unBindModel',function(){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'public/UnBindModel.html',
    controller:function($scope,$state,$http,$location,locals){
      $scope.bindModelShow = function(header,text){
        $scope.bindModel = true;
        $scope.alertTextP = true;
        $scope.alertCode = false;
        $scope.headerText = header;
        $scope.alertText = text;
      };

      $scope.alertCodeModel = function(){
        $scope.bindModel = true;
        $scope.alertTextP = false;
        $scope.alertCode = true;
        $scope.footer = false;
        $scope.weChartIcon = true;
        $scope.QQIcon = false;
        $scope.headerText = "【扫一扫】 绑定微信";
        var absurl = $location.absUrl();
        var obj = new WxLogin({
          id: "login_container",
          appid: "wx43a7adb3473744ac",
          scope: "snsapi_login",
          redirect_uri: absurl,
          state: Math.ceil(Math.random()*1000),
          style: "white",
          href: "https://scmc.villion.cn:443/wishome-web/index.css"
        });
      };
      //弹框消失
      $scope.cancelAsk = function(){
        $scope.bindModel = false
      };
      $scope.divHide = function(){
        $scope.cancelAsk();
      };
      $scope.determine = function(item){
        var userId,url;
        if(item.weChartIcon === true){
          userId = {
            'userId' : locals.get('id')
          };
          url = "canCelBinding";
          $scope.ajaxUnBinding(userId,url);
        }else if(item.weChartIcon === false){
          userId = {
            'userId' : locals.get('id')
          };
          url = "delqqOpenId";
          $scope.ajaxUnBinding(userId,url);
        }
      };
      $scope.ajaxUnBinding = function(userId,url){
        $http({
          url: managerY +  'wishome-web/rest/' + url,
          method:'get',
          params:userId
        }).success(function(data){
          $scope.bindModel = false;
          $scope.updPersonalInformation(userId);
          console.log(data);
        })
      };
    }
  }
});
