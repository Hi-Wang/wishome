/**
 * Created by ASUS on 2017/8/16.
 */
myApp.controller('managerDeliveryCtrl',function($scope,$state,$http,locals){
  var user = {
    'userId': locals.get('id')
  };
  $(".UrlA").eq(3).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(3)).css("background","none");
  $scope.PmQueryDelivderyPrjt = function(item){
    $http({
      url: managerZ + 'wishome-web/rest/PmQueryDelivderyPrjt',
      method:'GET',
      params:item
    }).success(function(data){
      $scope.prompt = data.newList;
      //温馨提示
      $scope.promptBox = [
        {'name':"项目总数:", 'num' : $scope.prompt.list1 + ' 个，'},
        {'name':"报价项目:", 'num' : $scope.prompt.list2 + ' 个，'},
        {'name':"下单项目:", 'num' : $scope.prompt.list3 + ' 个，'},
        {'name':"进度项目:", 'num' : $scope.prompt.list4 + ' 个，'},
        {'name':"交付项目:", 'num' : $scope.prompt.list5 + ' 个，'}
      ];
      $scope.tdList = data.list;
      var len = $scope.tdList.length;
      $scope.pageShow(len);
    });
  };
  $scope.PmQueryDelivderyPrjt(user);
});
