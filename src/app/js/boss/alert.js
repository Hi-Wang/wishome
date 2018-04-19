/**
 * Created by ASUS on 2017/9/8.
 */
//boss del Home ang boss add Home
myApp.directive('bossAlertModel',function(){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'boss/model.html',
    controller:function($scope){
      $scope.changeText = function(data){
        $scope.alertText = "您确定删除" + "[" + data + "]" + "吗？";
      };
      $scope.cancel = function(){
        $scope.bossAlert = false
      };
    }
  }
});

//boss在设计师之家移除设计师和更改项目经理
myApp.directive('bossAlertDesignerHomeModel',function(){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'boss/model.html',
    controller:function($scope){
      $scope.cancel = function(){
        $scope.alertDesignerHome = false;
      };
      $scope.alertName = function(data){
        $scope.alertText = "你确定要移除" + "[" + data + "]" + "设计师吗？"
      };
      $scope.showHomeList = function(data){
        $scope.homeName = data;
      };
      //点击确定按钮
      $scope.bossDelHome = function(data){
        //移除设计师
        if($scope.homeModelName === "移除设计师"){
          var delId = {
            'userId':data.hideId
          };
          $scope.ajaxDelDesigner(delId);
        }else if($scope.homeModelName === "变更设计师之家"){

          //变更设计师之家
          var index = $("#selectHomeName option:selected")[0].index;
          var changeId = {
            'userId':data.hideId,
            'id':data.homeName[index].id
          };
          $scope.ajaxChangeDesignerHome(changeId);
        }
      };
    }
  }
});

// boss add
myApp.directive('bossAddAlertModel',function(){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'boss/addModel.html',
    controller:function($scope,$http){
      //出现弹框
      $scope.showAlertModel = function(text){
        $scope.modelName = text;
        if(text === "添加设计师之家"){
          $scope.addDesignerHomeModel = true;
          return false
        }else if(text === "添加项目经理"){
          $scope.addManager = true;
          return false
        }else if(text === "添加工厂"){
          $scope.alertAddFactoryModel = true
        }
      };
      //隐藏弹框
      $scope.hide = function(item){
        $scope.nameIconT = false;
        $scope.nameIconF = false;
        $scope.psdIconT = false;
        $scope.psdIconF = false;
        $scope.error = false;
        $("#name").val('');
        $("#psd").val('');
        $("#surePsd").val('');
        if(item.modelName === "添加设计师之家"){
          $scope.addDesignerHomeModel = false;
          return false;
        }else if(item.modelName === "添加项目经理"){
          $scope.addManager = false;
          return false
        }else if(item.modelName === "添加工厂"){
          $scope.alertAddFactoryModel = false
        }
      };
      //  新增用户
      $scope.ajaxAdd = function(item,text,url){
        $http({
          method:'GET',
          url:yang +'wishome-web/rest/' + url,
          params: item
        }).success(function(data){
          $scope.hide(text);
          if(text === "添加设计师之家"){
            $scope.queryAllDesignHome();
            $scope.addDesignerHomeModel = false;
            return false;
          }else if(text === "添加项目经理"){
            $scope.queryAllPM();
            $scope.addManager = false;
            return false
          }else if(text === "添加工厂"){
            $scope.queryFactory();
            $scope.alertAddFactoryModel = false
          }
        })
      };
    //  点击确定做判断
      $scope.saveAddModel = function(item){
        var text = item.modelName;
        var name = $("#name").val();
        var psd = $("#psd").val();
        var surePsd = $("#surePsd").val();
        var reg = /^[a-zA-Z0-9_-]{6,16}$/;
        var psdReg = /^[\w]{6,12}$/;
        if (!reg.test(name)){
          $scope.nameIconT = false;
          $scope.nameIconF = true;
          $scope.psdIconT = false;
          $scope.psdIconF = false;
          $scope.errorText = "提示：用户名由6到16位（字母，数字，下划线，减号）组成";
          $scope.error = true;
          return false
        }else if(reg.test(name)){
          $scope.nameIconT = true;
          $scope.nameIconF = false;
          $scope.error = false;
          if(psdReg.test(psd)){
            if(psd !== surePsd){
              $scope.psdIconT = false;
              $scope.psdIconF = true;
              $scope.errorText = "提示：两次密码输入不一致。";
              $scope.error = true;
            }else if(psd === surePsd){
              $scope.error = false;
              $scope.psdIconT = true;
              $scope.psdIconF = false;
              var data = {
                'username': name,
                'password': surePsd
              };
              var url;
              if(text === "添加项目经理"){
                url = 'BossAddSearchBox';

                // return false
              }else if(text === "添加工厂"){
                url = 'addFactory';
                // $scope.ajaxAdd(data,text,url);
                // return false
              }else if(text === "添加设计师之家"){
                url = 'addDesignHome';
                // $scope.ajaxAdd(data,text,url);
                // return false;
              }
              $scope.ajaxAdd(data,text,url);
            }
            return false;
          }else if(!psdReg.test(psd)){
            $scope.psdIconT = false;
            $scope.psdIconF = true;
            $scope.errorText = "提示：密码由6到16位字母或数字组成.";
            $scope.error = true;
          }
        }
      };
    }
  }
});

myApp.directive('navChangeStyle',function(){
  return{
    restrict:'EA',
    controller:function($scope){
      $scope.changeNavStyle = function(c,i){
        var changeStyle = c.eq(i);
        changeStyle.css('background','#fff');
        c.not(changeStyle).css('background','#ccc')
      }
    }
  }
});

