/**
 * Created by ASUS on 2017/9/22.
 */
myApp.controller('fScheduleViewCtrl',function($scope,$http,$state,$stateParams,$rootScope){
  $scope.tableTd = [
    {'name':'样式参考'},
    {'name':'详细信息'},
    {'name':'构成类别'},
    {'name':'颜色、亮度/封闭度'},
    {'name':'制作要求'},
    {'name':'操作'}
  ];
  $("#nb-global-spinner").css('display','block');
  var id = {
    'prjtId':$stateParams.id,
    'deptId': $rootScope.deptId
  };
  $scope.queryOrderDetailsFactory = function(item){
    $http({
      url: factoryZ +'wishome-web/rest/queryOrderDetailsFactory',
      method:'POST',
      params: item
    }).success(function(data){
      $("#nb-global-spinner").css('display','none');
      $scope.prjtName = data.pr;
      if(data.list.length === 0){
        $scope.tdShow = true
      }else{
        $scope.tdShow = false
      }
      $scope.tableList = data.list;
    })
  };
  $scope.queryOrderDetailsFactory(id);

//  点击编辑进入生产通知单
  $scope.go_F_NoticesCtrl = function(data){
    var id = data.data.detailsid;
    $state.go('typesetting.fNotices',{id:id});
  };
  //查看大图
  $scope.seeBigImg = function(url){
    $scope.seeImg(url);
  };
// 返回
  $scope.back = function(){
    $state.go('typesetting.fSchedule');
  }
});
