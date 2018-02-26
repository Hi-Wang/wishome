/**
 * Created by ASUS on 2017/11/3.
 */
myApp.controller('signedViewCtrl',function($scope,$rootScope,$http,$state,$stateParams,locals){
  var id = {
    'prjtid': $stateParams.id
  };
  var name = $stateParams.name;
  $scope.name = name + "项目名称：";
  if(name === "历史"){
    $scope.Evaluation = false;
    $(".UrlA").eq(5).css('background','#00c2de');
    $(".UrlA").not($(".UrlA").eq(5)).css("background","none");
  }else if(name === "交付"){
    $scope.Evaluation = true;
    $(".UrlA").eq(4).css('background','#00c2de');
    $(".UrlA").not($(".UrlA").eq(4)).css("background","none");
  }else{
    $scope.Evaluation = false;
    $(".UrlA").eq(2).css('background','#00c2de');
    $(".UrlA").not($(".UrlA").eq(2)).css("background","none");
  }

  $scope.QuerySigCount = function(id){
    $http({
      url:yang + 'wishome-web/rest/QuerySigCount',
      method:'GET',
      params:id
    }).success(function(data){
      console.log(data);
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
      if(name === "签约"){
        $scope.shouHou = false;
        return false
      }else if(name === "交付"){
        if(data.evaluates === null){
          $scope.Evaluation = true;
          $scope.trueShow = true
        }else if(data.evaluates !== null){
          $scope.startStyle = [
            {'name' : "客服态度(总分20)：", "img" : "", "text" : ""},
            {'name' : "技术能力(总分20)：", "img" : "", "text" : ""},
            {'name' : "准时交货(总分20)：", "img" : "", "text" : ""},
            {'name' : "产品质量(总分20)：", "img" : "", "text" : ""},
            {'name' : "送货安装(总分20)：", "img" : "", "text" : ""}
          ];
          var numList = [
            {'num':data.evaluates.customerService},
            {'num':data.evaluates.technicalAblity},
            {'num':data.evaluates.punctualDelivery},
            {'num':data.evaluates.productQuality},
            {'num':data.evaluates.deliveryInstallation}
          ];
          for(var i=0;i<numList.length;i++){
            var n = numList[i].num;
            if(n === 0){
              $scope.startStyle[i].text = "很差";
              $scope.startStyle[i].img = "../images/start/start_1.fw.png"
            }else if(n === 5){
              $scope.startStyle[i].text = "差";
              $scope.startStyle[i].img = "../images/start/start_2.fw.png"
            }else if(n === 10){
              $scope.startStyle[i].text = "一般";
              $scope.startStyle[i].img = "../images/start/start_3.fw.png"
            }else if(n === 15){
              $scope.startStyle[i].text = "好";
              $scope.startStyle[i].img = "../images/start/start_4.fw.png"
            }else if(n === 20){
              $scope.startStyle[i].text = "很好";
              $scope.startStyle[i].img = "../images/start/start_5.fw.png"
            }
          }
          $scope.startAllNum = data.evaluates.evaluateCount;
          $scope.textarea = data.evaluates.evaluateMemo;
          console.log($scope.startStyle);
          $scope.Evaluation = true;
          $scope.trueShow = false
        }
        $scope.shouHou = true
      }
    });
  };
  $scope.QuerySigCount(id);


  //

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

  //查看大图
  $scope.seeBigImg = function(url){
    $scope.seeImg(url);
  };

//  返回
  $scope.signedBack = function(){
    var name = locals.get('designerDownName');
    if(name === "总项目"){
      $state.go("typesetting.projectOverView");
    }else if(name === "签约"){
      $state.go('typesetting.Signed');
    }else if(name === "交付"){
      $state.go('typesetting.deliver');
    }else if(name === '历史'){
      $state.go('typesetting.historicalProject')
    }
  }
});
