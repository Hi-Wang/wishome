myApp.controller('mQuotesViewSaveCtrl',function($scope,$rootScope,$http,$state,$stateParams,locals){
  var prjtid = {
    "prjtid" : $stateParams.id
  };
  $(".UrlA").eq(0).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(0)).css("background","none");
  $("#nb-global-spinner").css('display','block');
  $scope.QueryOffer = function(item){
    $http({
      url:zheng + 'wishome-web/rest/QueryOffer',
      method:'GET',
      params:item
    }).success(function(data){
      $("#nb-global-spinner").css('display','none');
      $scope.data = data;
      //黄框数据 InquiryTableList
      $scope.InquiryTableList = data.InquiryTableList[0];
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
      $scope.OfferTableList = data.offerTable;
      $scope.PrjtDetailsList = data.PrjtDetailsList;
      $scope.InquiryTableList = data.InquiryTableList[0];
      $scope.PrjtList = data.PrjtList[0];
    }).error(function(){
    });
  };
  $scope.QueryOffer(prjtid);
  //查看大图
  $scope.seeBigImg = function(url){
    $scope.seeImg(url);
  };

  $scope.comeback = function(){
    var name = locals.get("managerDownName");

    if(name === "总项目"){
      $state.go("typesetting.projectInto");
      return false
    }else if(name === "报价"){
      $state.go("typesetting.managerQuotes")
    }
  }
});
