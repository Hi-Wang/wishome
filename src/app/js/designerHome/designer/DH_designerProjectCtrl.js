myApp.controller('DH_designerProjectCtrl',function($scope,$state,$http,$stateParams){
  $scope.tableNav = [
    {'name' : '立项项目'},
    {'name' : '询价项目'},
    {'name' : '签约项目'},
    {'name' : '进度项目'},
    {'name' : '交付项目'}
  ];

  var id = {
    'UserId' : $stateParams.id
  };
  $http({
    url: designerY + 'wishome-web/rest/QueryDesigner',
    method:'GET',
    params:id
  }).success(function(data){
    $scope.list = data.list[0];
    var items = {
      'userid' : $scope.list.userId
    };
    var url = 'QueryPrjtState';
    $(".styleTd").eq(0).css('background','#fff');
    $scope.ajaxGetPrjtState(items,url)
  });

  $scope.getPrjtState = function(item,index){
    var thisTd = $(".styleTd").eq(index);
    thisTd.css('background','#fff');
    $(".styleTd").not(thisTd).css('background','#ddd');
    var name = item.data.name;
    // var id = item.$parent.list.userId;
    var items,url;
    items = {
      'userid' : item.$parent.list.userId
    };
    if(name === "立项项目"){
      url = "QueryPrjtState" ;
      $scope.ajaxGetPrjtState(items,url);
      return false
    }else if(name === "询价项目"){
      url = "QueryInquiryTableState" ;
      $scope.ajaxGetPrjtState(items,url);
      return false
    }else if(name === "进度项目"){
      url = "QueryDesignerSpeed" ;
      $scope.ajaxGetPrjtState(items,url);
      return false
    }else if(name === "签约项目"){
      url = "QuerySig" ;
      $scope.ajaxGetPrjtState(items,url);
      return false
    }else if(name === "交付项目"){
      url = "QueryDesignerInteractive" ;
      $scope.ajaxGetPrjtState(items,url);
      return false
    }
  };

  $scope.ajaxGetPrjtState = function(items,url){
    $http({
      url: designerY + 'wishome-web/rest/' + url,
      method:'GET',
      params: items
    }).success(function(data){
      $scope.tdList = data.list;
    })
  }

//返回
  $scope.back = function(){
    $state.go('typesetting.D_Home_designer')
  }
});
