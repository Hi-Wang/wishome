myApp.controller('mQuotesView',function($scope,$http,$stateParams,$state,treeS,$rootScope,$timeout,locals){
  $scope.gluebrand = "强选择品牌";
  $scope.coatingmaterialbrand = "强选择品牌";
  var name = locals.get('managerDownName');
  if(name === "项目经理直接报价" || name === "项目经理新增产品报价"){
    $(".UrlA").eq(0).css('background','#00c2de');
    $(".UrlA").not($(".UrlA").eq(0)).css("background","none");
  }else{
    $(".UrlA").eq(5).css('background','#00c2de');
    $(".UrlA").not($(".UrlA").eq(5)).css("background","none");
  }

  var prjtid = $stateParams.id;
  var data = {
    'prjtid':prjtid
  };
  $scope.QueryOffer = function(item){
    $http({
      url:zheng + 'wishome-web/rest/QueryOffer',
      method:'GET',
      params:item
    }).success(function(data){
      if(data.offerTable.coatingmaterialbrand === null){
        $scope.coatingname = data.list[0]
      }else{
        for(var o=0;o<data.list.length;o++){
          if(data.offerTable.coatingmaterialbrand === data.list[o].coatingname){
            $scope.coatingname = data.list[o]
          }
        }
      }
      if(data.offerTable.gluebrand === null){
        $scope.GlueBrand = data.GlueBrandlist[0]
      }else{
        for(var G=0;G<data.GlueBrandlist.length;G++){
          if(data.offerTable.gluebrand === data.GlueBrandlist[G].gluename){
            $scope.GlueBrand = data.GlueBrandlist[G]
          }
        }
      }

      // return false
      $scope.data = data;
      $scope.OfferTableList = data.offerTable;
      $scope.list = data.list;//涂装材料
      $scope.GlueBrandlist = data.GlueBrandlist;                   //胶水品牌
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
      $scope.PrjtDetailsList = data.PrjtDetailsList;               //产品列表

      //$scope.OfferTableList = data.OfferTableList[0];                 //各种费用
      treeS.enhance($scope.PrjtDetailsList,$scope.InquiryTableList);
      // $scope.all.push($scope.PrjtDetailsList);
      $scope.TotalProduct = $scope.PrjtDetailsList;
      $scope.prjtList = data.PrjtList[0];                             //项目信息

    }).error(function(){
    });
  };
  $scope.QueryOffer(data);

//更新
  $scope.m_upData = function(data){
    if($("#total").html() === '0'){
      text = "请填写报价信息";
      $scope.showAlert(text);
      return false;
    }else if($("#total").html() !== '0'){
      for(var i=0;i<data.PrjtDetailsList.length;i++){
        data.PrjtDetailsList[i].fabricFinish = data.PrjtDetailsList[i].details[1].num;    //布艺饰面
        data.PrjtDetailsList[i].leatherFinish = data.PrjtDetailsList[i].details[0].num;  //皮艺饰面
        data.PrjtDetailsList[i].otherAmount = data.PrjtDetailsList[i].details[0].otherNum;   //其他金额
        data.PrjtDetailsList[i].amountMemo = data.PrjtDetailsList[i].details[1].amountMemo;   //其他金额备注
        data.PrjtDetailsList[i].frameAmount = data.PrjtDetailsList[i].details[2].num;    //框架金额
        //产品单价
        data.PrjtDetailsList[i].productUnitPrice = data.PrjtDetailsList[i].details[1].num * data.PrjtDetailsList[i].details[1].cost + data.PrjtDetailsList[i].details[0].num * data.PrjtDetailsList[i].details[0].cost + data.PrjtDetailsList[i].otherAmount + data.PrjtDetailsList[i].frameAmount;
        data.PrjtDetailsList[i].money = (data.PrjtDetailsList[i].fabricFinish * data.PrjtDetailsList[i].details[1].cost + data.PrjtDetailsList[i].details[0].num * data.PrjtDetailsList[i].details[0].cost + data.PrjtDetailsList[i].details[0].otherNum + data.PrjtDetailsList[i].details[2].num) * data.PrjtDetailsList[i].detailsnumber
      }
      data.offerTable.coatingmaterialbrand = $scope.coatingname.coatingname;
      data.offerTable.gluebrand = $scope.GlueBrand.gluename;
      data.offerTable.total = $("#total1").html();
      data.offerTable.totalproduct = $("#totalproduct1").html();
      var OfferTableList = [];
      var prjtDetails = data.PrjtDetailsList;
      OfferTableList.push(data.offerTable);
      //对品牌判断
      var text;
        OfferTableList = angular.toJson(OfferTableList);
        prjtDetails = angular.toJson(prjtDetails);
        var item = {
          "prjtDetails":prjtDetails,
          'OfferTable':OfferTableList
        };
        $http({
          url:zheng + 'wishome-web/rest/upddetails',
          method:'POST',
          params:item,
          contentType : 'application/json;charset=utf-8',
          dataType: "json"
        }).success(function(data){
          $scope.successText = "更新成功!";
          $scope.successTextShow = true;
          $timeout(function(){
            $scope.successTextShow = false;
            $scope.QueryOffer(data);
          },2000);
        })
    }
  };
//  报价完成
  $scope.m_carryOut = function(data){
    if($("#total").html() === '0'){
      text = "请完成报价信息";
      $scope.showAlert(text);
      return false;
    }else if($("#total").html() !== '0'){
      for(var i=0;i<data.PrjtDetailsList.length;i++){
        data.PrjtDetailsList[i].fabricFinish = data.PrjtDetailsList[i].details[1].num;    //布艺饰面
        data.PrjtDetailsList[i].leatherFinish = data.PrjtDetailsList[i].details[0].num;  //皮艺饰面
        data.PrjtDetailsList[i].otherAmount = data.PrjtDetailsList[i].details[0].otherNum;   //其他金额
        data.PrjtDetailsList[i].amountMemo = data.PrjtDetailsList[i].details[1].amountMemo;   //其他金额备注
        data.PrjtDetailsList[i].frameAmount = data.PrjtDetailsList[i].details[2].num;    //框架金额
        //产品单价
        data.PrjtDetailsList[i].productUnitPrice = data.PrjtDetailsList[i].details[1].num * data.PrjtDetailsList[i].details[1].cost + data.PrjtDetailsList[i].details[0].num * data.PrjtDetailsList[i].details[0].cost + data.PrjtDetailsList[i].otherAmount + data.PrjtDetailsList[i].frameAmount;
        data.PrjtDetailsList[i].money = (data.PrjtDetailsList[i].fabricFinish * data.PrjtDetailsList[i].details[1].cost + data.PrjtDetailsList[i].details[0].num * data.PrjtDetailsList[i].details[0].cost + data.PrjtDetailsList[i].details[0].otherNum + data.PrjtDetailsList[i].details[2].num) * data.PrjtDetailsList[i].detailsnumber
      }
      data.offerTable.coatingmaterialbrand = $scope.coatingname.coatingname;
      data.offerTable.gluebrand = $scope.GlueBrand.gluename;
      data.offerTable.total = $("#total1").html();
      data.offerTable.totalproduct = $("#totalproduct1").html();
      data.offerTable.offerid = data.offerid;
      var OfferTableList = [];
      var prjtDetails = data.PrjtDetailsList;
      //对品牌判断
      var text;
        OfferTableList.push(data.offerTable);
        OfferTableList = angular.toJson(OfferTableList);
        prjtDetails = angular.toJson(prjtDetails);
        var item = {
          "prjtDetails":prjtDetails,
          'OfferTable':OfferTableList
        };
        $http({
          url:zheng + 'wishome-web/rest/upddetails',
          method:'POST',
          params:item,
          contentType : 'application/json;charset=utf-8',
          dataType: "json"
        }).success(function(data){
          $http({
            url:zheng + 'wishome-web/rest/QueryOfferTable',
            method:'GET',
            params:data
          }).success(function(data){
            var id = data.PrjtList[0].prjtid;
            $rootScope.downFrom = "报价";
            $state.go("typesetting.mQuotesViewSave",{id:id})
          }).error(function(){
          });
        })
    }

  };
  //查看大图
  $scope.seeBigImg = function(url){
    $scope.seeImg(url);
  };
//返回
  $scope.m_quotesViewBack = function(){
    var name = locals.get('managerDownName');
    if(name === "总项目"){
      $state.go("typesetting.projectInto");
      return false
    }else if(name === "报价"){
      $state.go("typesetting.managerQuotes")
    }else if(name === "项目经理直接报价"){
      $state.go("typesetting.addQuoteItem")
    }else if(name === "项目经理新增产品报价"){
      $state.go('typesetting.preSale')
    }
  };
  // $scope.data = $scope.PrjtDetailsList;
});



