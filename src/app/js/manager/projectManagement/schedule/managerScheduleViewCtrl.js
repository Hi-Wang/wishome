/**
 * Created by ASUS on 2017/9/22.
 */
myApp.controller('managerScheduleViewCtrl',function($scope,$rootScope,$http,$state,$stateParams,$timeout,locals){
  var id = {
    'prjtId' : $stateParams.id
  };
  $(".UrlA").eq(2).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(2)).css("background","none");
  $("#nb-global-spinner").css('display','block');
  $scope.queryOrderDetailsPm = function(item){
    $http({
      url: managerZ + 'wishome-web/rest/queryOrderDetailsPm',
      method:'GET',
      params:item
    }).success(function(data){
      $("#nb-global-spinner").css('display','none');
      if(data.state === 200){
        $scope.state = true
      }else if(data.state === 400){
        $scope.state = false
      }
      // $scope.state = data.state;
      if(data.list.length === 0){
        return false;
      }
      for(var l=0;l<data.list.length;l++){
        if(data.list[l].signDelivery === 0){

          data.list[l].signDelivery = false
        }else if(data.list[l].signDelivery === 1){
          data.list[l].signDelivery = true
        }
      }
      $scope.PrjtDetailsList = data.list;
      $scope.list2 = data.list2;
      $scope.list3 = data.list3;
      $scope.list4 = data.list4;
      $scope.PrjtList = data.pr;
      $scope.InquiryTableList = data.it;
      $scope.OfferTableList = data.ot;
      //面料与配件 inquiryfabricaccessories
      if($scope.InquiryTableList.inquiryfabricaccessories === 1){
        $scope.InquiryTableList.inquiryfabricaccessories = "否";
        $scope.cloth = false;
      }else if($scope.InquiryTableList.inquiryfabricaccessories === 0){
        $scope.InquiryTableList.inquiryfabricaccessories = "是";
        $scope.cloth = true;
      }
      //发票需求 inquiryinvoice
      if($scope.InquiryTableList.inquiryinvoice === 0){
        $scope.InquiryTableList.inquiryinvoice = "是";
        $scope.invoice = true;
      }else if($scope.InquiryTableList.inquiryinvoice === 1){
        $scope.InquiryTableList.inquiryinvoice = "否";
        $scope.invoice = false;
      }
      //送货安装 inquirydeliveryinstallation
      if($scope.InquiryTableList.inquirydeliveryinstallation === 0){
        $scope.InquiryTableList.inquirydeliveryinstallation = "是";
        $scope.address = true;
      }else if($scope.InquiryTableList.inquirydeliveryinstallation === 1){
        $scope.InquiryTableList.inquirydeliveryinstallation = "否";
        $scope.address = false;
      }

    })
  };
  $scope.queryOrderDetailsPm(id);

//  查看进度
  $scope.seeEcharts = function(data){
    var detailsid = {
      'detailsId': data.data.detailsid
    };
    $scope.getNode(detailsid);
    $scope.managerEcharts = true;
  };

//  编辑节点
  $scope.editNodeTime = function(item){
    console.log(item);
    var id = {
      'daId' : item.data.detailsid
    };
    $http({
      url: managerZ + 'wishome-web/rest/queryNodesTime',
      method:'GET',
      params:id
    }).success(function(data){
      console.log(data);
      for(var n = 0,len = data.node.length;n < len;n++){
        if(data.node[n].time === null){

          // return false
        }else  if(data.node[n].time !== null){
          data.node[n].time = new Date(data.node[n].time)
        }
      }
      $scope.successTime = new Date(data.date);
      $scope.nodesTime = data.node;
      $scope.D_id = item.data.detailsid;
      $("#nodeTimeModel").slideDown();
    });

  };

//  点击交付
  $scope.projectDelivery = function(item){

    for(var i=0;i<item.PrjtDetailsList.length;i++){
      if(item.PrjtDetailsList[i].signDelivery === false){
        $scope.jiaoFu = true;
        $scope.header = true;
        $scope.ask = false;
        $scope.footer = false;
        $scope.alertText = "产品未完成，不可交付。";
        $timeout(function(){
          $scope.jiaoFu = false;
        },2000);
        return false
      }
    }
    $scope.jiaoFu = true;
    $scope.header = false;
    $scope.ask = true;
    $scope.text = "项目交付";
    $scope.alertText = "确定交付项目【" + item.PrjtList.prjtname + "】吗？";
    $scope.footer = true;
    // item.managerModel = true;
    // $scope.homeModelName = "交付项目";
  };
  //查看大图
  $scope.seeBigImg = function(url){
    $scope.seeImg(url);
  };

  $scope.hide = function(item){
    console.log(item);
    $scope.excelModelShow = false;
    $("#excelModelShow").slideUp();
  };
//  返回
  $scope.managerScheduleBack = function(){
    var name =  locals.get('managerDownName');
    if(name === "总项目"){
      $state.go('typesetting.projectInto');
    }else if(name === "进度"){
      $state.go('typesetting.managerSchedule');
    }
  }

});

myApp.directive('managerJiaoFu',function(){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'designer/model.html',
    controller:function($scope,$http,$state,locals){
      $scope.divHide = function(){
        $scope.jiaoFu = false;
      };
      $scope.cancelAsk = function(){
        $scope.jiaoFu = false;
      };
      $scope.againAsk = function(item){
        var id = {
          'prjtId' : item.PrjtList.prjtid ,
          'userId' : locals.get("id")
        };
        $http({
          url: managerZ + 'wishome-web/rest/PmUpDelivderyPrjt',
          method:'GET',
          params:id
        }).success(function(data){
          $(".UrlA").eq(3).css('background','#00c2de');
          $(".UrlA").not($(".UrlA").eq(3)).css("background","none");
          $state.go('typesetting.managerDelivery')
        });
      }
    }
  }
});

myApp.directive('nodeTimeModel',function(){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'manager/projectManagement/schedule/nodeTimeModel.html',
    controller: function($scope,$http,$filter){
      $scope.hide = function(){
        $("#nodeTimeModel").slideUp();
      };
      $scope.saveNodeTime = function(item){
        console.log(item);
        var data = {
          'daId' : item.D_id,
          'date' : $filter('date')(item.successTime, 'yyyy-MM-dd'),
          'node' : item.nodesTime
        };
        console.log(data);
        $http({
          url: managerZ + 'wishome-web/rest/upNodesTime',
          method:'GET',
          params:data
        }).success(function(){
          $("#nodeTimeModel").slideUp();
          var id = {
            'prjtId' : item.PrjtList.prjtid
          };
          $scope.queryOrderDetailsPm(id);
        })
      }
    }
  }
});

myApp.directive('mExcelModel',function(){
  return{
    restrict:'EA',
    templateUrl:'public/getExcel.html',
    replace:true,
    controller: function($scope,locals,$rootScope){
      //点击遮罩层fullDiv
      $scope.removeExcelModel = function(){
        $("#excelModelShow").slideUp();
      };
      $('.removeBtn button').click(function(){
        $("#excelModelShow").slideUp();
      });
      $scope.showExcelModel = function(){
        $("#excelModelShow").slideDown();
      };
      $scope.getExcel = function(item){
        var id = item.PrjtList.prjtid;
        $scope.ajaxGetExcel(id);
      };
      $scope.ajaxGetExcel = function(id){
        var name = $('#content1 input[name="excel"]:checked ').val();
        if($rootScope.Identity === "未认证设计师"){
          if(name === 'a'){
            $scope.excelSrc = zheng + 'wishome-web/rest/ProfessionPrintDesigner?prjtid='+ id;
            $scope.hide();
            return false
          }else  if(name === 'b'){
            $scope.excelSrc = zheng + 'wishome-web/rest/simplePrintTableDesigner?prjtid='+ id;
            $scope.hide();
            return false
          }
          return false
        }else{
          if(name === 'a'){
            $scope.excelSrc = zheng + 'wishome-web/rest/ProfessionPrint?prjtid='+ id;
            $scope.hide();
            return false
          }else  if(name === 'b'){
            $scope.excelSrc = zheng + 'wishome-web/rest/simplePrintTable?prjtid='+ id;
            $scope.hide();
            return false
          }
        }
      };
    }
  }
});
