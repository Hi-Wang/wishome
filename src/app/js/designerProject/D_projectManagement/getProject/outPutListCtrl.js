/**
 * Created by ASUS on 2017/11/3.
 */
//outPutList.html
myApp.controller('outPutListCtrl',function($scope,$http,$state,$rootScope,$timeout,locals){
  $(".UrlA").eq(0).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(0)).css("background","none");
  $scope.modelStyle = {
    "fabric1Selected":true,
    "fabric2Selected":false,
    "fabric1":"报价不含面料",
    "fabric2":"报价包含面料",
    "DomesticBrand":true,
    "ImportBrand":false,
    "Accessories1Selected":true,
    "Accessories2Selected":false,
    "Accessories1":"国产品牌",
    "Accessories2":"进口品牌",
    "address1Selected":true,
    "address2Selected":false,
    "address1":"需要送货安装",
    "address2":"不需要送货安装",
    "invoice1Selected":true,
    "invoice2Selected":false,
    "invoice1":"不需要发票",
    "invoice2":"需要发票"
  };
  $scope.selectedStyle = false;

  var prjtId = locals.get('designerPrjtId');
  var id = {
    'prjtid': prjtId
  };
  $http({
    url:zheng + 'wishome-web/rest/updCount',
    method:'GET',
    params:id
  }).success(function(data){
    $scope.PrjtList = data.PrjtList[0];
    $scope.PrjtDetailsList = data.PrjtDetailsList;
  }).error(function(){
  });

//点击询价出现弹框
  $scope.showAskPriceModel = function(item){
    var falseUser = $rootScope.Identity;
    var loginId = locals.get('loginId');
    if(falseUser === '未认证设计师'){
      $scope.showFalseUserModel(loginId);
      return false
    }else{
      $scope.showAskModel();
      var askSetData = {
        'prjtprodqty':item.PrjtList.prjtprodqty,
        'prjtstate': item.PrjtList.prjtstate,
        "prjtid": prjtId
      };
      var id = {
        'prjtid': prjtId
      };
      $http({
        url:zheng + 'wishome-web/rest/QueryHuoqu',
        method:'GET',
        params:id
      }).success(function(data){
        $scope.data = data.PrjtList[0];
        $scope.DomesticBrandlist = data.DomesticBrandlist;
        $scope.ImportBrandlist = data.ImportBrandlist;
      })
    }
  };

//点击是否含面料价格
  $scope.fabricClick = function(){
    var val = $(".fabric input:radio[name='fabricRadios']:checked").val();
    if(val === "报价不包含面料"){
      $("#fabricBox").slideUp(300);
      $("#fabricBox input[type = 'number']").val('');
      $scope.modelStyle.fabric1Selected = true;
      $scope.modelStyle.fabric2Selected = false;
      return false;
    }else if(val === "报价包含面料"){
      $("#fabricBox").slideDown(300);
      $scope.modelStyle.fabric1Selected = false;
      $scope.modelStyle.fabric2Selected = true;
    }
  };

  //点击选择品牌
  $scope.AccessoriesClick = function(){
    var val = $(".fabric input:radio[name='AccessoriesRadios']:checked").val();
    if(val === "国产品牌"){
      $("#fabricBox input[type = 'number']").val('');
      $scope.modelStyle.DomesticBrand = true;
      $scope.modelStyle.ImportBrand = false;
      $scope.modelStyle.Accessories1Selected = true;
      $scope.modelStyle.Accessories2Selected = false;
      return false;
    }else if(val === "进口品牌"){
      $scope.modelStyle.DomesticBrand = false;
      $scope.modelStyle.ImportBrand = true;
      $scope.modelStyle.Accessories1Selected = false;
      $scope.modelStyle.Accessories2Selected = true;
    }
  };

  //是否需要送货
  $scope.addressClick = function(){
    var val = $(".fabric input:radio[name='addressRadios']:checked").val();
    if(val === "需要送货安装"){
      $("#addressBox").slideDown(300);
      $("#fabricBox input[type = 'text']").val('');
      $scope.modelStyle.address1Selected = true;
      $scope.modelStyle.address2Selected = false;
      return false;
    }else if(val === "不需要送货安装"){
      $("#addressBox").slideUp(300);
      $scope.modelStyle.address1Selected = false;
      $scope.modelStyle.address2Selected = true;
    }
  };

  //点击选择是否需要发票
  $scope.invoiceClick = function(){
    var val = $(".fabric input:radio[name='invoiceRadios']:checked").val();
    if(val === "不需要发票"){
      // $("#invoiceBox").slideUp(300);
      $("#invoiceBox input[type='text']").val('');
      $scope.modelStyle.invoice1Selected = true;
      $scope.modelStyle.invoice2Selected = false;
    }else if(val === "需要发票"){
      // $("#invoiceBox").slideDown(300);
      $scope.modelStyle.invoice1Selected = false;
      $scope.modelStyle.invoice2Selected = true;
    }
  };

//  点击立即询价，保存询价信息
  $scope.saveAskModel = function(data){
    var fabricRadios = $('.fabric input[name="fabricRadios"]:checked ').val();
    var Accessories = $('.fabric input[name="AccessoriesRadios"]:checked ').val();
    var address = $('.fabric input[name="addressRadios"]:checked ').val();
    var location = $scope.xxx;
    var invoice = $('.fabric input[name="invoiceRadios"]:checked ').val();
    var invoiceName = $('#invoiceBox input[type="text"] ').val();
    //判断是否包含面料
    if(fabricRadios === "报价不包含面料"){
      $scope.inquiryaveragecloth = 0;
      $scope.inquiryaverageleather = 0;
      $scope.fabric = 1;
    }else if(fabricRadios === "报价包含面料"){
      $scope.fabric = 0;
    }
    //判断品牌类型
    if(Accessories === "国产品牌"){
      $scope.Accessories = Accessories + ":" + $('#DomesticBrand option:selected ').val();
    }else if(Accessories === "进口品牌"){
      $scope.Accessories = Accessories + ":" + $('#ImportBrand option:selected ').val();
    }
    //判断是否送货安装
    if(address === "需要送货安装"){
      $scope.addressCode = 0;
    }else if(address === "不需要送货安装"){
      $scope.addressCode = 1;
      location = "";
    }
    //发票判断
    if(invoice === "需要发票"){
      $scope.invoice = 0;
    }else if(invoice === "不需要发票"){
      $scope.invoice = 1;
      invoiceName = "";
    }
    var askData = {
      'prjtprodqty':$scope.data.prjtprodqty,
      'prjtstate':$scope.data.prjtstate,
      "prjtid": prjtId,
      "inquiryfabricaccessories": $scope.fabric,// 0 1
      "inquiryaveragecloth":$scope.inquiryaveragecloth,
      "inquiryaverageleather":$scope.inquiryaverageleather,
      "inquiryaccessoriesbrand": $scope.Accessories, // 国产品牌+品牌
      "inquirydeliveryinstallation":$scope.addressCode, // 0 1
      "inquirydetailedaddress":location,  //地址
      "inquiryinvoice": $scope.invoice,  // 0 1
      "inquiryother": invoiceName
    };
    console.log(askData);
    // return false
    $http({
      url: zheng + 'wishome-web/rest/QueryInquiryTable',
      method:'GET',
      params:askData
    }).success(function(data){
      $("#askShow").slideUp(300);
      $timeout(function(){
        $scope.show();
      },600);
      $timeout(function(){
        $scope.divHide();
        $state.go('typesetting.dAskPrice');
      },1400);
    })
  };

//  打印
//   $scope.pointer = function(){
//     var globalHtml = "";
//     globalHtml = document.body.innerHTML;
//     document.body.innerHTML = document.getElementById('divPrint').innerHTML;
//     window.print();
//     window.setTimeout(function() {
//       document.body.innerHTML = globalHtml;
//     }, 1500);
//   };
  $scope.pointer = function(){
    var newstr = document.getElementById('divPrint').innerHTML;//得到需要打印的元素HTML
    var oldstr = document.body.innerHTML;//保存当前页面的HTML
    document.body.innerHTML = newstr;
    window.print();
    document.body.innerHTML = oldstr;
  };

  //查看大图
  $scope.seeBigImg = function(url){
    $scope.seeImg(url);
  };

//  点击返回
  $scope.comeback = function(){
    var name = locals.get('designerDownName');
    if(name === "总项目"){
      $state.go("typesetting.projectOverView");
    }else if(name === "输出"){
      $state.go("typesetting.preSale");
    }
  }
});

