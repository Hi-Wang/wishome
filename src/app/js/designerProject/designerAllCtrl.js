/**
 * Created by ASUS on 2017/10/10.
 */
myApp.controller('designerAllCtrl',function($scope,$rootScope,$http,$state,locals){
  $("#nb-global-spinner").css('display','block');
  //如果设计师进来
  $scope.QueryDesignerPersonalPage = function(){
    var id = {
      'userId':locals.get('id')
    };
    $http({
      url: designerY + 'wishome-web/rest/QueryDesignerPersonalPage',
      method:'GET',
      params:id
    }).success(function(data){
      console.log(data);
      // return false
      $("#nb-global-spinner").css('display','none');
      if(data.use.personalpicture === null){
        data.use.personalpicture = '../images/projectList/wishome.png'
      }
      if(data.queryDesignerHouse.personalpicture === null){
        data.queryDesignerHouse.personalpicture = '../images/projectList/wishome.png'
      }
      if(data.user.personalpicture === null){
        data.user.personalpicture = '../images/projectList/wishome.png'
      }
      $scope.designerHome = data.deptName;
      $scope.queryDesignerHouse = data.queryDesignerHouse;
      $scope.manager = data.use;
      $scope.designer = data.user;
    });
  };
  //如果未认证设计师
  $scope.queryUnregiSteredDesigenerPersonalPage = function(){
    var id = {
      'userId': locals.get('id')
    };
    $http({
      url: designerY + 'wishome-web/rest/queryUnregiSteredDesigenerPersonalPage',
      method:'GET',
      params:id
    }).success(function(data){
      $("#nb-global-spinner").css('display','none');
      if(data.user.personalpicture === null){
        data.user.personalpicture = '../images/projectList/wishome.png';
      }
      $scope.designerHome = data.deptName;
      $scope.queryDesignerHouse = data.queryDesignerHouse;
      $scope.manager = data.use;
      $scope.designer = data.user;
      $scope.dh = data.dh;
    });
  };

  //未认证设计师判断是否申请
  $scope.IsAuthentication = function(){
    var id = {
      'id': $rootScope.id
    };
    $http({
      url: designerY + 'wishome-web/rest/IsAuthentication',
      method:"POST",
      params: id
    }).success(function(data){

      if(data.state === 200){
        $scope.successVip = false;
        $scope.errorVip = true;
      }else if(data.state === 400){
        $scope.successVip = false;
        $scope.errorVip = false;
        $scope.errorVipSuccess = true;
      }
    })
  };
  var role = $rootScope.Identity;
  if(role === '设计师'){
    $scope.successVip = true;
    $scope.errorVip = false;
    $scope.QueryDesignerPersonalPage();
  }else if(role === '未认证设计师'){
    $scope.successVip = false;
    $scope.errorVip = true;
    $scope.selectStyle = true;
    $scope.queryUnregiSteredDesigenerPersonalPage();
    $scope.IsAuthentication();
  }

  //查看设计师之家
  $scope.showDesignerHome = function (data) {
    data.designerAndManager = false;
    data.seeDesignerHome = true;
  };
  //关闭查看设计师之家
  $scope.designerHomeDel = function(data){
    data.designerAndManager = true;
    data.seeDesignerHome = false;
  };
  //查看项目经理
  $scope.showManager = function(data){
    data.designerAndManager = false;
    data.seeManager = true;
  };
  //关闭查看项目经理
  $scope.managerDel = function(data){
    data.designerAndManager = true;
    data.seeManager = false;
  };

  $scope.data1 = [
    {'val':'待办事项','title':'它是一个比较帅气的男孩儿',"img":"img/img1.png","name":"标题"},
    {'val':'已办事项','title':'它有着一张跟年龄不服的脸庞',"img":"img/img2.png","name":"发送用户"}
  ];

//

//  未认证设计师加入设计师之家
  $scope.addDesingerHome = function(item,designer){
    var name = $('#selectValue option:selected').html();
    var index = $('#selectValue').prop('selectedIndex');
    if(name === "请选择设计师之家"){
      $scope.selectStyle = false;
      return false
    }else{
      if(designer.nickname === null || designer.phoneNumber === null){
        $scope.errorText = true;
        return false
      }else{
        var text = "加入";
        $scope.designerId = index;
        $scope.addHideShow(text,name);
      }
    }
  };


//  查看更多
  $scope.changeInfo = function(data){
    $state.go('typesetting.changeInfo')
  }
});

myApp.directive('addHideDesignerHome',function(){
  return{
    restrict:'EA',
    templateUrl:'designer/model.html',
    replace:true,
    controller:function($scope,$http){
      $scope.addHideShow = function(text,name){
        if(text === "加入"){
          $scope.ask = true;
          $scope.text = "加入申请";
          $scope.alertText = "确定申请加入设计师之家【" + name +"】吗？"
        }
        $scope.addHide = true
      };
      $scope.divHide = function(){
        $scope.addHide = false
      };
      $scope.cancelAsk = function(){
        $scope.addHide = false
      };
      $scope.againAsk = function(item){
        if(item.text === "加入申请"){
          var id = {
            'id':item.designer.userId
          };
          $http({
            url: designerY + 'wishome-web/rest/IsAuthentication',
            method:'GET',
            params:id
          }).success(function(data){
            if(data.state === 200){
              var add = {
                'userName' : item.designer.username,
                'designerId' : item.designer.userId,
                'designerHomeId' : item.dh[item.designerId-1].id
              };
              $http({
                url: designerY + 'wishome-web/rest/sendAuthentication',
                method:'GET',
                params:add
              }).success(function(){
                $scope.divHide();
                $scope.errorVip = false;
                $scope.errorVipSuccess = true;
              });
              return false
            }else{
              return false
            }
          });
          return false
        }else if(item.text === "取消申请"){

        }

      }
    }
  }
});



