/**
 * Created by ASUS on 2017/11/2.
 */
myApp.controller('scheduleViewCtrl',function($scope,$rootScope,$http,$state,$stateParams,locals){
  var id = {
    'prjtId': locals.get('designerPrjtId')
  };
  $(".UrlA").eq(3).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(3)).css("background","none");
  $("#nb-global-spinner").css('display','block');
  $http({
    url:yang + 'wishome-web/rest/queryOrderDetailsPm',
    method:'GET',
    params:id
  }).success(function(data){
    $("#nb-global-spinner").css('display','none');
    $scope.InquiryTableList = data.it;
    $scope.OfferTableList = data.ot;
    $scope.PrjtDetailsList = data.list;
    $scope.PrjtList = data.pr;
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
    if($scope.PrjtList.deliverySign === 0){
      $scope.Delivery = false;
      return false
    }else if($scope.PrjtList.deliverySign === 1){
      $scope.Delivery = true
    }
  });

  //  查看进度
  $scope.seeEcharts = function(data){
    var detailsid = {
      'detailsId': data.items.detailsid
    };
    $scope.getNode(detailsid);
    $scope.managerEcharts = true;
  };

  //查看大图
  $scope.seeBigImg = function(url){
    $scope.seeImg(url);
  };

//  交付
  $scope.projectDelivery = function(item){
    $scope.delivery = true;
    $scope.ask = true;
    $scope.text = "项目交付";
    $scope.alertText = '确认交付项目【' + item.PrjtList.prjtname + '】吗？'
  };

//  返回
  $scope.D_ScheduleBack = function(){
    var name = locals.get('designerDownName');
    if(name === "总项目"){
      $state.go("typesetting.projectOverView");
    }else if(name === "进度"){
      $state.go('typesetting.schedule');
    }
  }

});

myApp.directive('projectDelivery',function(){
  return {
    restrict:'EA',
    replace:true,
    templateUrl:'designer/model.html',
    controller:function($scope,$http,$state){
      $scope.cancelAsk = function(){
        $scope.delivery = false;
      };
      $scope.divHide = function(){
        $scope.delivery = false;
      };
      $scope.againAsk = function(item){
        var id = {
          'prjtid' : item.PrjtList.prjtid
        };
        $http({
          url:yang + 'wishome-web/rest/updDesignerInteractive',
          method:'GET',
          params:id
        }).success(function(){
          $(".UrlA").eq(4).css('background','#00c2de');
          $(".UrlA").not($(".UrlA").eq(4)).css("background","none");
          $state.go('typesetting.deliver')
        })
      }
    }
  }
});
