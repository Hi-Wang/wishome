myApp.controller('signedListCtrl',function($scope,$state,$http,$rootScope,$stateParams,locals){
  var id = {
    'prjtid':$stateParams.id
  };
  var name = locals.get('designerDownName');
  $("#nb-global-spinner").css('display','block');
  if(name === "项目经理新建查看"){
    $(".UrlA").eq(5).css('background','#00c2de');
    $(".UrlA").not($(".UrlA").eq(5)).css("background","none");
  }else{
    $(".UrlA").eq(1).css('background','#00c2de');
    $(".UrlA").not($(".UrlA").eq(1)).css("background","none");
  }

  $http({
    url:yang + 'wishome-web/rest/QueryInquiryTable1',
    method:'GET',
    params:id
  }).success(function(data){
    $("#nb-global-spinner").css('display','none');
    $scope.PrjtDetailsList = data.PrjtDetailsList;
    $scope.PrjtList = data.PrjtList[0];
    $scope.list = data.list[0];
    //面料与配件 inquiryfabricaccessories
    if($scope.list.inquiryfabricaccessories === 1){
      $scope.list.inquiryfabricaccessories = "否";
      $scope.cloth = false;
    }else if($scope.list.inquiryfabricaccessories === 0){
      $scope.list.inquiryfabricaccessories = "是";
      $scope.cloth = true;
    }
    //发票需求 inquiryinvoice
    if($scope.list.inquiryinvoice === '0'){
      $scope.list.inquiryinvoice = "是";
      $scope.invoice = true;
    }else if($scope.list.inquiryinvoice === '1'){
      $scope.list.inquiryinvoice = "否";
      $scope.invoice = false;
    }
    //送货安装 inquirydeliveryinstallation
    if($scope.list.inquirydeliveryinstallation === 0){
      $scope.list.inquirydeliveryinstallation = "是";
      $scope.address = true;
    }else if($scope.list.inquirydeliveryinstallation === 1){
      $scope.list.inquirydeliveryinstallation = "否";
      $scope.address = false;
    }
  });
  // //导出Excel
  // $scope.showExcel = function(){
  //   $scope.excelShow = true;
  // };
  // $scope.getExcel = function(data){
  //   var id = data.list.prjtid;
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
    document.body.innerHTML = document.getElementById('signedListPrint').innerHTML;
    window.print();
    window.setTimeout(function() {
      document.body.innerHTML = globalHtml;
    }, 1500);
  };

  //查看大图
  $scope.seeBigImg = function(url){
    $scope.seeImg(url);
  };

//  返回
  $scope.signedListBack = function(){
    var name = locals.get('designerDownName');
    if(name === "询价"){
      $state.go('typesetting.dAskPrice')
    }else if(name === "总项目"){
      $state.go("typesetting.projectOverView");
    }else if(name === "项目经理新建查看"){
      $state.go('typesetting.addQuoteItem')
    }
  }
});
