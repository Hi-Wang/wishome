myApp.directive('preSaleModel',function(){
  return{
    restrict:'E',
    replace:true,
    templateUrl:'designer/D_projectManagement/getProject/preSaleModel.html',
    link:function(scope){
      scope.seeImg = function(item,url){
        scope.box = item;
        scope.bigImgUrl = url;
        scope.flieInput = true;
        scope.seeBigImgModel = true;
      };
      scope.hideModel = function(){
        scope.bigImgUrl = null;
        scope.flieInput = false;
        scope.seeBigImgModel = false;
      }
      //  查看大图
    }
  }
});

myApp.directive('aboutRoom',function(){
  return{
    restrict:'E',
    replace:true,
    templateUrl:'designer/preSale_model.html',
    controller:function($scope,$http,$timeout){
      //点击确定
      $scope.determine = function(item){
        var data,url,text,edit;
        if(item.headerText === "新增区域"){
          var newRoomName = $("#roomNewName").val();
          if(newRoomName === ""){
            $scope.error = true;
            $scope.errorText = "新增区域名称不能为空。";
            return false;
          }else if(newRoomName.indexOf(" ") !== -1){
            $scope.error = true;
            $scope.errorText = "新增区域名称不能含有空格。";
            return false;
          }else{
            $scope.error = false;
            $scope.errorText = "";
            data = {
              "regoinName": newRoomName,
              "prjtid": item.PrjtList.prjtid
            };
            url = "addOnePrjtRegoin";
            text = item.headerText;
            edit = '';
            $scope.room_add_del_ajax(item,data,url,text,edit);
          }
          return false;
        }else if(item.headerText === "删除产品"){
          var remove = {
            "prjtid": item.PrjtList.prjtid,
            "detailsid": item.delDetailsId
          };
          $http({
            url:zheng + 'wishome-web/rest/DelPrjtDetails',
            method:'GET',
            params:remove
          }).success(function(data){
            $scope.alertRoom = false;
            $scope.seeBigImgModel = false;
            $scope.getRoomList();
            $("#successTextP").slideDown(600);
            $timeout(function(){
              $("#successTextP").slideUp(600);
            },1000)
          });
        }
      };
      //点击删除按钮
      $scope.delRoomBtnClick = function(item){
        var delRoom = {
          "regoinName": item.data.regoinName,
          "prjtid": item.data.prjtid
        };
        $http({
          url:zheng + 'wishome-web/rest/queryPrjtRegoinSize',
          method:'GET',
          params:delRoom
        }).success(function(data){
          var delSave = {
            "regoinName": item.data.regoinName,
            "size": data.size,
            "prjtid": item.data.prjtid
          };
          $scope.model_model_text(delSave);
          $scope.showModel_model(delSave);
        });
      };

      //操作成功弹框
      $scope.successAlert = function(items,text){
        $scope.alertRoom = true;
        $scope.header = false;
        $scope.footer = false;
        $scope.addRoomInput = false;
        $scope.error = false;
        $scope.alertTextP = true;
        $scope.alertText = text;
        $timeout(function(){
          $scope.alertRoom = false;
        },800,function(){
          $scope.getRoomList();
        })
      };
      //键盘事件
      $scope.keyUp = function(e,item){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode === 13){
          $scope.determine(item);
          return false;
        }else if(keycode === 8){
          $scope.error = false;
          $scope.errorText = "";
          $scope.errorEditModel = false;
          $scope.errorEditModelText = "";
        }
      };

      $scope.modelKeyUp = function(e,item){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode === 13){
          $scope.addNewRoomSave(item);
          return false;
        }else if(keycode === 8){
          $scope.error = false;
          $scope.errorText = "";
          $scope.errorEditModel = false;
          $scope.errorEditModelText = "";
        }
      };

      //model
      $scope.divHide = function(item){
        console.log(item);
        $scope.cancelAsk();
        $scope.alertRoom = false;
        $scope.error = false;
        $("#roomNewName").val('');
      };
      $scope.cancelAsk = function(){
        $scope.alertRoom = false;
      };
    //  model_model
    //  取消小弹框
      $scope.hideModel_model = function(){
        $("#model_model").slideUp(250)
      };
      //显示小弹框
      $scope.showModel_model = function(){
        $("#model_model").slideDown(250)
      };
      $scope.model_model_text = function(item){
        $scope.showDelRoomText = "确定删除区域【" + item.regoinName + "】吗？";
        $scope.roomSize = true;
        $scope.delRoomNameHide = item.regoinName;
        $scope.size = item.size;
        if(item.size === 0){
          $scope.showDelRoomSize = "提示：该区域没有产品。";
        }else{
          $scope.showDelRoomSize = "提示：该区域有【" + item.size + "】件产品。";
        }
      };

    //  小弹框点击确定
      $scope.delRoomSave = function(log){
        var items,item,url,text,edit;
        items = '';
        item = {
          "regoinName":log.delRoomNameHide,
          "size":log.size,
          "prjtid": log.PrjtList.prjtid
        };
        url = "deletePrjtRegoin";
        text = "删除区域";
        edit = "";
        $scope.room_add_del_ajax(items,item,url,text,edit)
      };

      //删除和添加函数
      $scope.room_add_del_ajax = function(items,item,url,text,edit){
        $http({
          url:zheng + 'wishome-web/rest/' + url,
          method:'GET',
          params: item
        }).success(function(data){
          var alert;
          if(data.status === 200){
            if(edit === ''){
              if(text === "新增区域"){
                alert = "新增区域成功。";
                $scope.successAlert(items,alert);
                $scope.getRoomList();
                return false;
              }else if(text === "删除区域"){
                $scope.modelAlertText = "删除成功！";
                $scope.hideModel_model();
                $timeout(function(){
                  $("#successAlertText").slideDown(600)
                },800);
                $timeout(function(){
                  $("#successAlertText").slideUp(600)
                },1800);
                $scope.getRoomList();
                return false;
              }
              return false;
            }else if(edit === "区域编辑"){
              $scope.modelAlertText = "添加成功！";
              $timeout(function(){
                $("#newRoomNameModel").val('');
                $scope.addRoomNameBtn = true;
                $scope.addNewRoomTr = false;
              },600);
              $timeout(function(){
                $("#successAlertText").slideDown(600)
              },800);
              $timeout(function(){
                $("#successAlertText").slideUp(600)
              },1800);
              $scope.getRoomList();
              return false;
            }
          }
        })
      };
    }
  }
});

myApp.directive('preSaleRoomModel',function(){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'designer/D_projectManagement/getProject/preSaleRoomModel.html',
    controller:function($scope,$http){
      //修改名称点击
      $scope.showChangeInput = function(item){
        item.changeIcon = false;
        item.changeName = true;
        item.changeText = false;
      };
      //保存修改名称
      $scope.changeRoomNameSave = function(item,index){
        var newName = {
          'id' : item.data.id,
          'prjtid' : item.data.prjtid,
          'regoinName' : $(".changeRoomInput").eq(index).val()
        };
        $http({
          url:zheng + 'wishome-web/rest/updatePrjtRegoin',
          method:'GET',
          params: newName
        }).success(function(data){
          $scope.getRoomList();
          item.changeName = false;
          item.changeIcon = true;
        });
      };
      //取消修改名称
      $scope.hideChangeInput = function(item){
        item.changeName = false;
        item.changeIcon = true;
      };
      //显示新增区域Tr
      $scope.showAddNewRoomTr = function(item){
        item.addRoomNameBtn = false;
        item.addNewRoomTr = true;
      };
      //新增区域tR取消
      $scope.hideAddRoomNameTr = function(item){
        $("#newRoomNameModel").val('');
        item.addRoomNameBtn = true;
        item.addNewRoomTr = false;
        item.errorEditModel = false;
      };

      //弹框新增区域点击保存
      $scope.addNewRoomSave = function(item){
        var data,url,text,edit;
        var newRoomName = $("#newRoomNameModel").val();
        if(newRoomName === ""){
          $scope.errorEditModel = true;
          $scope.errorEditModelText = "新增区域名称不能为空。";
          return false;
        }else if(newRoomName.indexOf(" ") !== -1){
          $scope.errorEditModel = true;
          $scope.errorEditModelText = "新增区域名称不能含有空格。";
          return false;
        }else{
          var len = item.region.length;
          for(var i=0 ; i<len;i++){
            if(newRoomName === item.region[i].regoinName){
              $scope.errorEditModel = true;
              $scope.errorEditModelText = "新增区域名称不可重复。";
              return false;
            }else{
              $scope.errorEditModel = false;
              $scope.errorEditModelText = "";
              data = {
                "regoinName": newRoomName,
                "prjtid": item.PrjtList.prjtid
              };
              url = "addOnePrjtRegoin";
              text = '新增区域';
              edit = '区域编辑';
              $scope.room_add_del_ajax(item,data,url,text,edit);
            }
          }
        }
      };
      //关闭弹框
      $scope.editModel = function(){
        $scope.roomEditModel = false;
      };
      $scope.cancelEditModel = function(item){
        $scope.editModel();
      }
    }
  }
});
