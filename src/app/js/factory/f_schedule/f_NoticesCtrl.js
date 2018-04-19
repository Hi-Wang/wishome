/**
 * Created by ASUS on 2017/9/25.
 */
myApp.controller('fNoticesViewCtrl',function($scope,$state,$http,$stateParams,$timeout) {
  var item = {
    'detailsId': $stateParams.id
  };
  $("#nb-global-spinner").css('display','block');
  $scope.toOrderFactory = function(item){
    $http({
      url: factoryZ +'wishome-web/rest/toOrderFactory',
      method:'GET',
      dataType : 'json',
      params: item
    }).success(function(data){
      $("#nb-global-spinner").css('display','none');
      $scope.it = data.it;
      $scope.node = data.node;
      $scope.ot = data.ot;
      $scope.pr = data.pr;
      $scope.prd = data.prd;
      $scope.gongYi = angular.fromJson(data.prd.proName);
      $scope.imgList = angular.fromJson(data.prd.threeViewsUrl);
      var finsh = [];
      for(var i=0;i<$scope.node.length;i++){
        if($scope.node[i].start === null){
          $scope.node[i].startBtn = false
        }else{
          $scope.node[i].startBtn = true
        }
        if($scope.node[i].finsh === null){
          finsh.push($scope.node[i]);
          $scope.node[i].finshBtn = false
        }else{
          $scope.node[i].finshBtn = true
        }
      }
      if(finsh.length === 0){
        $scope.deliverBtn = true
      }else{
        $scope.deliverBtn = false
      }
    })
  };
  $scope.toOrderFactory(item);

  //点击开始
  $scope.btnStartClick = function(data){
    $scope.hideName = data.td.name;
    $scope.footer = true;
    $scope.factroyModel = true;
    $scope.headerTitle = "开始节点";
    $scope.alertText = "您确定开始【" + data.td.name +"】节点吗？";
  };
  $scope.ajaxStart = function(item){
    $http({
      url: factoryZ +'wishome-web/rest/orderStart',
      method:'GET',
      params: item
    }).success(function(items){
      var id = {
        'detailsId': items.id
      };
      $scope.footer = false;
      $scope.factroyModel = true;
      $scope.headerTitle = "提示：";
      $scope.alertText = "操作成功！";
      $timeout(function(){
        $scope.factroyModel = false;
        $scope.toOrderFactory(id);
      },1000);
    })
  };

  // 点击结束
  $scope.btnFinshClick = function(data){

    if(data.disabledStart === false){
      // alert("请先开始节点！");
      $scope.footer = false;
      $scope.factroyModel = true;
      $scope.headerTitle = "提示：";
      $scope.alertText = "请您先开始【" + data.td.name +"】节点。";
      $timeout(function(){
        $scope.factroyModel = false;
      },2000)
    }else{
      $scope.footer = true;
      $scope.hideName = data.td.name;
      $scope.factroyModel = true;
      $scope.headerTitle = "结束节点";
      $scope.alertText = "您确定结束【" + data.td.name +"】节点吗？";
    }
  };
  $scope.ajaxFinsh = function(item){
    $http({
      url: factoryZ +'wishome-web/rest/orderFinsh',
      method:'GET',
      params: item
    }).success(function(items){
      var finsh = [];
      for(var n=0;n<$scope.node.length;n++){
        if($scope.node[n].finsh === null){
          finsh.push($scope.node[n])
        }
      }
      if(finsh.length === 1){
        $scope.deliverBtn = true
      }
      var id = {
        'detailsId': items.id
      };
      $scope.footer = false;
      $scope.factroyModel = true;
      $scope.headerTitle = "提示：";
      $scope.alertText = "操作成功！";
      $timeout(function(){
        $scope.factroyModel = false;
        $scope.toOrderFactory(id);
      },1000);
      // $scope.factroyModel = false;
      // $scope.toOrderFactory(id);
    })
  };
//查看大图
  $scope.seeBigImgBig = function(url){
    $scope.seeImg(url);
  };
  $scope.seeBigImg = function(url){
    $scope.seeImg(url);
  };

//  交付
  $scope.deliver = function(item){
    var len = item.node.length;
    for(var i=0;i<len;i++){
      if(item.node[i].finsh === null){
        $scope.footer = false;
        $scope.factroyModel = true;
        $scope.headerTitle = "提示：";
        $scope.alertText = "您还有未结束的产品。";
        $timeout(function(){
          $scope.factroyModel = false;
        },1000);
        return false;
      }else if(item.node[i].finsh !== null){
        $scope.footer = true;
        $scope.factroyModel = true;
        $scope.headerTitle = "产品交付";
        $scope.alertText = "您确定向项目经理交付【"+ item.prd.detailsname +"】产品吗？";
        return false;
      }
    }
  };
  $scope.ajaxDeliver = function(item){
    $http({
      url: factoryZ +'wishome-web/rest/upDelivderyPrjt',
      method:'GET',
      params: item
    }).success(function(data){
      $scope.factroyModel = false;
      $(".UrlA").eq(1).css('background','#00c2de');
      $(".UrlA").not($(".UrlA").eq(1)).css("background","none");
      $state.go('typesetting.fDeliver');
    });
  };

//返单
  $scope.backToSingle = function(item){
    $scope.footer = true;
    $scope.headerTitle = "返单提示";
    $scope.alertText = "确认将产品【" + item.prd.detailsname +"】返单至项目经理吗？";
    $scope.factroyModel = true;
  };
  $scope.ajaxReorder = function(item){
    $http({
      url: factoryZ +'wishome-web/rest/reorder',
      method:'GET',
      params: item
    }).success(function(){
      $scope.footer = false;
      $scope.factroyModel = true;
      $scope.headerTitle = "提示：";
      $scope.alertText = "操作成功！";
      $timeout(function(){
        $scope.factroyModel = false;
        $state.go('typesetting.fScheduleView',{id: $scope.ot.prjtid});
      },1000);
    })
  };

//  返回
  $scope.back = function(data){
    var id = data.pr.prjtid;
    $state.go('typesetting.fScheduleView',{id:id})
  };
});

myApp.directive('btnStyle',function(){
  return{
    restrict:'EA',
    link:function(scope,ele,sttr){
      if(scope.td.startBtn === true){
       scope.disabledStart = true;
        scope.unDisabledStart = false
      }else{
        scope.disabledStart = false;
        scope.unDisabledStart = true
      }
      if(scope.td.finshBtn === true){
        scope.disabledFinsh = true;
        scope.unDisabledFinsh = false
      }else{
        scope.disabledFinsh = false;
        scope.unDisabledFinsh = true
      }
    }
  }
});

//弹框
myApp.directive('factroyModel',function(){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'factory/model.html',
    controller:function($scope){
      $scope.cancelAsk = function(){
        $scope.factroyModel = false;
      };
      $scope.goAjax = function(data){
        if(data.headerTitle === "开始节点"){
          var start = {
            'detailsId':data.prd.detailsid,
            'nodeName': data.hideName
          };
          $scope.ajaxStart(start);
        }else if(data.headerTitle === "结束节点"){
          var finsh = {
            'detailsId':data.prd.detailsid,
            'nodeName': data.hideName
          };
          $scope.ajaxFinsh(finsh);
        }else if(data.headerTitle === "产品交付"){
          var daId = {
            "daId": data.prd.detailsid
          };
          $scope.ajaxDeliver(daId);
        }else if(data.headerTitle === "返单提示"){
          daId = {
            "daId": data.prd.detailsid
          };
          $scope.ajaxReorder(daId);
        }
      }
    }
  }
});

