/**
 * Created by ASUS on 2017/11/3.
 */
myApp.controller('preSaleCtrl',function($state,$scope,$stateParams,$http,$timeout,$rootScope,locals){
  var prjtId = locals.get("designerPrjtId");
  var prjthstp = locals.get("designerPrjthstp");
  var name = locals.get('designerDownName');
  if(name === '项目经理新建'){
    $scope.RightBtn = false;
    $(".UrlA").eq(5).css('background','#00c2de');
    $(".UrlA").not($(".UrlA").eq(5)).css("background","none");
  }else{
    $scope.RightBtn = true;
    $(".UrlA").eq(0).css('background','#00c2de');
    $(".UrlA").not($(".UrlA").eq(0)).css("background","none");
  }

  //tab切换样式
  $scope.tabStyle = function(index){
    $('.roomNameLi').eq(index).css('background','#fff');
    $('.roomNameLi').eq(index).siblings().css('background','#D9DEE4');
  };
  //拿到房间 getRoomList

  $("#nb-global-spinner").css('display','block');
  $scope.getRoomList = function(){
    var region = {
      "hastCateName": prjthstp,
      "prjtid": prjtId
    };
    // $('.roomNameLi').eq(0).css('background','#fff');
    $http({
      url:designerZ + 'wishome-web/rest/queryRegoin',
      method:'POST',
      params: region
    }).success(function(data){
      $("#nb-global-spinner").css('display','none');
      $('.roomNameLi').eq(0).css('background','#fff');
      $('.roomNameLi').eq(0).siblings().css('background','#D9DEE4');
      $scope.PrjtList = data.PrjtList;
      if($scope.PrjtList.prjtprodqty === null){
        $scope.PrjtList.prjtprodqty = 0
      }
      $scope.region = data.list;
      $scope.list2 = data.list2;
      //如果没有区域
      if(data.list === null){
        $scope.roomEdit = false;
        $scope.addRoomName = true;
        $scope.addDetails = false;
        $scope.noDetailsText = true;
        $scope.Room_noDetailsText = false;
        $scope.roomEditModel = false;
      }else{
        $scope.roomEdit = true;
        $scope.addRoomName = false;
        $scope.addDetails = true;
        $scope.noDetailsText = false;
      }
      if($scope.list2 === undefined){
        return false
      }else{
        if( $scope.list2.length === 0){
          $scope.background = true;
          $scope.Room_noDetailsText = true;
        }else{
          $scope.background = false;
          $scope.Room_noDetailsText = false;
        }
      }
      locals.set("designerRegion",data.region);
      locals.set("designerList2",data.list2);
      //如果拖动房间
      $scope.goRoom();
      //如果拖动产品
      $scope.goProject();

    }).error(function(){
    });
  };
  $scope.getRoomList();
  //getRoom End

  //拖动房间
  $scope.goRoom = function(){
    $scope.nav = {
      'ui-floating':false,
      update:function(e,ui){
        $timeout(function(){
          var resArrNav = [];
          for(var i=0;i<$scope.region.length;i++){
            $scope.region[i].regoinAsc = i;
            resArrNav.push($scope.region[i]);
          }
          $scope.resArrNav = resArrNav;
          var newResArrNav = angular.toJson($scope.resArrNav);
          $http({
            url:zheng + 'wishome-web/rest/updateRegoinasc',
            contentType : 'application/json;charset=utf-8',
            dataType: "json",
            method:'POST',
            data:newResArrNav
          }).success(function(data){
            $('.roomNameLi').eq(0).css('background','#fff');
            $scope.getRoomList();
          }).error(function(){
            alert(1);
          });
        });
      }
    };
  };

  //拖动产品
  $scope.goProject = function(){
    // $scope.stop = false;
    $scope.sortableOptions = {
      update:function(e,ui){
        $timeout(function(){
          var resArr = [];
          for(var i=0;i<$scope.list2.length;i++){
            $scope.list2[i].signAsc = i;
            resArr.push($scope.list2[i]);
            $scope.resArr = resArr;
          }
          $scope.setAll(resArr);
        });
      },
      stop:function(e,ui){
        // $scope.stop = true;//已修改
      }
      // items:'div:not(.not-sortable)'
    };
  };

  //  preSale页面点击更新按钮
  $scope.setAll = function(item){
    var newResArr = angular.toJson(item);
      $http({
        url:zheng + 'wishome-web/rest/updateSignasc',
        method:'POST',
        contentType : 'application/json;charset=utf-8',
        dataType: "json",
        data:newResArr
      }).success(function(){
        $('.roomNameLi').eq(0).css('background','#fff');
        $('.roomNameLi').eq(0).siblings().css('background','#D9DEE4');
        if($scope.index === undefined){
          $scope.index = 0;
        }
        if($scope.roomDataList === undefined){
          $scope.roomDataList = {
            'data' : {
              'regoinName' : $scope.region[0].regoinName
            }
          }
        }
        $scope.getRoom($scope.roomDataList,$scope.index);
      }).error(function(){
        alert("错误！");
      })
    // }
  };

  //点击新增区域的li
  $scope.addNewRoom = function(){
    // $scope.roomNewName = "";
    $scope.alertRoom = true;
    $scope.addRoomI = true;
    $scope.circled = false;
    $scope.delRoomI = false;
    $scope.addRoomInput = true;
    $scope.alertTextP = false;
    $scope.footer = true;
    $scope.header = true;
    $scope.headerText = "新增区域"
  };


  //区域编辑
  $scope.roomEditClick = function(item){
    item.roomEditModel = true;
    $scope.footer = true;
  };

  //点击房间
  $scope.roomName = "";
  $scope.getRoom = function(data,index){
    $scope.roomDataList = data;
    $scope.index = index;
    $scope.tabStyle(index);
    $scope.roomName = data.data.regoinName;
    if($scope.stop === true){
      alert("您有为保存的更改！");
    }else{
      $rootScope.data = data;
      $rootScope.btnName = null;
      var setRoomName = {
        "prjtid": prjtId,
        "local":data.data.regoinName
      };
      // locals.set('designerSeeRegionName',data.data.regoinName);
      $http({
        url:designerZ + 'wishome-web/rest/queryRegionPrjt',
        method:'GET',
        params:setRoomName
      }).success(function(data){
        $scope.list2 = data.list2;
        $rootScope.local = data.local;
        if( $scope.list2.length === 0){
          $scope.Room_noDetailsText = true;
        }else{
          $scope.Room_noDetailsText = false;
        }
      })
    }
  };

  //点击图片
  $scope.clickImg = function(data){
    var prjthstp ;
    if(data.$parent.PrjtList === undefined){
      prjthstp = data.PrjtList.prjthstp;
      // return false;
    }else{
      prjthstp = data.$parent.PrjtList.prjthstp
    }
    locals.set('designerDetailsid',data.box.detailsid);
    locals.set('roomName',data.box.regionname);
    locals.set('designerPrjtId',data.box.prjtid);
    locals.set('designerPrjthstp',prjthstp);
    $state.go('typesetting.imageView');
  };

//  点击新增产品
  $scope.addNewProject = function(item){
    $scope.roomName = item.roomName;
    if(item.roomName === ""){
      $scope.roomName = item.region[0].regoinName;
    }
    locals.set('designerDetailsid','');
    locals.set("roomName",$scope.roomName);
    locals.set("designerPrjtId",item.PrjtList.prjtid);
    locals.set("designerPrjthstp",item.PrjtList.prjthstp);
    $state.go('typesetting.imageView');
  };

//  删除产品
  $scope.removeImgBox = function(data){
    $scope.alertRoom = true;
    $scope.header = true;
    $scope.headerText = "删除产品";
    $scope.circled = false;
    $scope.addRoomI = false;
    $scope.delRoomI = true;
    $scope.addRoomInput = false;
    $scope.error = false;
    $scope.alertTextP = true;
    $scope.delDetailsId = data.box.detailsid;
    $scope.alertText = "您确定要删除产品【" + data.box.detailsname + "】吗？"
  };


//  立即询价
  $scope.goOutPutList = function(item){
    if(item.region === null){
      $scope.alertRoom = true;
      $scope.error = false;
      $scope.addRoomInput = false;
      $scope.alertTextP = true;
      $scope.alertText = "请先添加区域和产品。";
      $scope.header = true;
      $scope.footer = false;
      $scope.headerText = "提示";
      $timeout(function(){
        $scope.alertRoom = false;
      },1000);
      return false;
    }
    if(item.PrjtList.prjtprodqty === 0){
      $scope.alertRoom = true;
      $scope.error = false;
      $scope.addRoomInput = false;
      $scope.alertTextP = true;
      $scope.alertText = "该项目内没有产品，请先添加产品。";
      $scope.header = true;
      $scope.headerText = "提示";
      $scope.footer = false;
      $timeout(function(){
        $scope.alertRoom = false;
      },1000);
      return false
    }
    // else{
      locals.set('designerDownName',"输出");
      var prjtId = item.PrjtList.prjtid;
      locals.set('designerPrjtId',prjtId);
      $state.go('typesetting.outPutList');
    // }
  };
  //查看大图
  $scope.seeBigImg = function(item,url){
    $scope.seeImg(item.box,url);
  };

  //修改项目信息
  $scope.changeProjectModelShow = function(item){
    $scope.changeProjectModelShow(item);
  };

  //  返回上一页
  $scope.returnProjectList = function(){
    var name = locals.get('designerDownName');
    if(name === "总项目"){
      $state.go("typesetting.projectOverView");
    }else if(name === "立项" || name === "输出"){
      $state.go("typesetting.projectList");
    }else if(name === "项目经理新建" || name === "项目经理新增产品报价"){
      $state.go('typesetting.addQuoteItem')
    }
  };


//  项目经理立即报价
  $scope.goBaoJia = function(item){
    if(item.region === null){
      $scope.alertRoom = true;
      $scope.error = false;
      $scope.addRoomInput = false;
      $scope.alertTextP = true;
      $scope.alertText = "请先添加区域和产品。";
      $scope.header = true;
      $scope.footer = false;
      $scope.headerText = "提示";
      $timeout(function(){
        $scope.alertRoom = false;
      },1000);
      return false;
    }
    if(item.PrjtList.prjtprodqty === 0){
      $scope.alertRoom = true;
      $scope.error = false;
      $scope.addRoomInput = false;
      $scope.alertTextP = true;
      $scope.alertText = "该项目内没有产品，请先添加产品。";
      $scope.header = true;
      $scope.headerText = "提示";
      $scope.footer = false;
      $timeout(function(){
        $scope.alertRoom = false;
      },1000);
      return false
    }

    var id = {
      'prjtid' : item.PrjtList.prjtid
    };
    $http({
      url: designerY + 'wishome-web/rest/updInquiryState',
      method:'GET',
      params:id
    }).success(function(data){
      if(data.state === 200){
        locals.set('managerDownName',"项目经理新增产品报价");
        $state.go('typesetting.mQuotesView' ,{id: id.prjtid})
      }
    })

  }

});

myApp.directive('changeProjectModel',function(){
  return{
    restrict: 'EA',
    templateUrl: 'designer/D_projectManagement/getProject/addProjectModel.html',
    replace: true,
    controller: function($scope,$http,locals){
      $scope.changeProjectModelShow = function(item){
        $scope.changeProject = true;
        $http({
          url:zheng + 'wishome-web/rest/select',
          method: 'GET'
        }).success(function (data) {
          console.log(data);
          $scope.prjtcode = item.PrjtList.prjtcode;
          $scope.prjtname = item.PrjtList.prjtname;
          $scope.listb = data.listb;
          $scope.listd = data.listd;
          $scope.listpc = data.listpc;
          data.listpcg.push({'prjtcatename' : "自定义"});
          $scope.listpcg = data.listpcg;
          $scope.listphc = data.listphc;
          $scope.prjtcate = data.prjtcate;
          $scope.prjthstp = data.prjthstp;

          //listpc
          for(var p=0;p<data.listpc.length;p++){
            if(data.listpc[p].principalname === item.PrjtList.prjtprincipal){
              $scope.listpcValue = data.listpc[p];
            }
          }
          //listb
          for(var b=0;b<data.listb.length;b++){
            if(data.listb[b].boardname === item.PrjtList.prjtboard){
              $scope.listbValue = data.listb[b];
            }
          }
          //listpcgValue
          for(var c=0;c<data.listpcg.length;c++){
            if(data.listpcg[c].prjtcatename === item.PrjtList.prjtcate){
              $scope.listpcgValue = data.listpcg[c];
            }
          }
          var room = {
            "prjtCateName": $scope.listpcgValue.prjtcatename
          };
          $scope.getNextOption(room);

          // //prjthstp
          // for(var h=0;h<data.prjthstp.length;h++){
          //   if(data.prjthstp[h].hastCateName === item.PrjtList.prjthstp){
          //     $scope.prjthstp = data.prjthstp[h];
          //   }
          // }

          $scope.addproject = true
        });
        console.log(item.PrjtList);
      };


      //根据项目类别选择户型
      $("#listpcgValue").change(function(){
        var room = {
          "prjtCateName": $("#listpcgValue option:selected").html()
        };
        $scope.getNextOption(room);
      });
      $scope.getNextOption = function(item){
        $http({
          url:zheng + 'wishome-web/rest/queryHstp',
          method:'GET',
          params:item
        }).success(function(data){
          data.list.push({"hastCateName" : "自定义"});

          // //prjthstp
          for(var h=0;h<data.list.length;h++){
            if(data.list[h].hastCateName === $scope.PrjtList.prjthstp){
              $scope.prjthstp = data.list[h];
            }
          }
          $scope.hastCateName = data.list;
        })
      };


      $scope.divHide = function(){
        $scope.changeProject = false;
      };

      //保存新建项目的数据
      $scope.saveList = function(item){
        var name = {
          "userid": locals.get('id'),
          "prjtid" : $scope.PrjtList.prjtid,
          "prjtcode":$scope.prjtcode,
          "prjtname":$("#listnameValue").val(),
          "prjtcate": $scope.listpcgValue.prjtcatename,
          "prjthstp": $scope.prjthstp.hastCateName,
          "prjtprincipal": $scope.listpcValue.principalname,
          "prjtboard": $scope.listbValue.boardname,
          "prjtmemo":$scope.prjtmemo
        };
          $http({
            url:zheng + 'wishome-web/rest/updDesignerProject',
            method:'post',
            params:name
          }).success(function(){
            // var userId = {
            //   'userid': locals.get("id")
            // };
            $scope.getRoomList();
            $scope.divHide();
          }).error(function(){
          })

      };

    }
  }
});









