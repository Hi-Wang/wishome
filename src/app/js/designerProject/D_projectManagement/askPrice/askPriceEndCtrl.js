myApp.controller('askPriceEndCtrl',function($scope,$state,$http,$rootScope,$stateParams,locals){
  var id = {
    'prjtid':$stateParams.id
  };
  $(".UrlA").eq(1).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(1)).css("background","none");
  $("#nb-global-spinner").css('display','block');
  $http({
    url:yang + 'wishome-web/rest/QuerySigCount',
    method:'GET',
    params:id
  }).success(function(data){
    $("#nb-global-spinner").css('display','none');
    $scope.InquiryTableList = data.InquiryTableList[0];
    $scope.OfferTableList = data.OfferTableList[0];
    $scope.PrjtDetailsList = data.PrjtDetailsList;
    $scope.PrjtList = data.PrjtList[0];
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
  });
  //导出Excel
  // $scope.showExcel = function(){
  //   $scope.excelShow = true;
  // };
  // $scope.getExcel = function(data){
  //   var id = data.PrjtList.prjtid;
  //   var name = $('#content1 input[name="excel"]:checked ').val();
  //   $scope.excelShow = false;
  //   if(name === 'a'){
  //     $scope.excelSrc = zheng + 'wishome-web/rest/ProfessionPrint?prjtid='+ id
  //   }else  if(name === 'b'){
  //     $scope.excelSrc = zheng + 'wishome-web/rest/simplePrintTable?prjtid='+ id
  //   }
  // };

  //  打印
  $scope.pointer = function(){
    var globalHtml = "";
    globalHtml = document.body.innerHTML;
    document.body.innerHTML = document.getElementById('askPriceEndPrint').innerHTML;
    window.print();
    window.setTimeout(function() {
      document.body.innerHTML = globalHtml;
    }, 1500);
  };
  //修改产品
  $scope.goChangeProduct = function(data){
    $scope.text = "修改项目产品";
    $scope.alertModel = true;
    $scope.textP = false;
    $scope.ask = true;
    $scope.alertTextP = true;
    $scope.alertText = "修改项目产品：将新建项目并复制当前项目产品。"
  };
  //再次询价
  $scope.aginAsk = function(){
    $scope.alertModel = true;
    $scope.textP = false;
    $scope.ask = true;
    $scope.text = "再次询价";
    $scope.alertTextP = true;
    $scope.alertText = "确定再次询价吗？"
  };

  //立即签约
  $scope.signUp = function(){
    $scope.alertTextP = false;
    $scope.ask = true;
    $scope.text = "立即签约";
    $scope.alertModel = true;
    $scope.textP = true;
  };

  //查看大图
  $scope.seeBigImg = function(url){
    $scope.seeImg(url);
  };

  //  返回
  $scope.askPriceEndBack = function(){
    var name = locals.get("designerDownName");
    if(name === "询价"){
      $state.go('typesetting.dAskPrice')
    }else if(name === "总项目"){
      $state.go("typesetting.projectOverView");
    }
  }
});
