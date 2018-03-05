/**
 * Created by ASUS on 2017/9/18.
 */
myApp.controller('bFactoryPrjtListCtrl',function($scope,$http,$state,$stateParams){
  $scope.tableNav = [
    {'name':'进度项目'},
    {'name':'交付项目'}
  ];
  var id = {
    'deptId':$stateParams.id
  };
  $("#nb-global-spinner").css('display','block');
  //获取工厂的信息
  $scope.ajaxGetFactory = function(item){
    $http({
      url:yang +'wishome-web/rest/QueryBossSpeedOfProgressPorject',
      method:'GET',
      params:item
    }).success(function(data){
      $("#nb-global-spinner").css('display','none');
      if(data.user.personalpicture === null){
        data.user.personalpicture = '../images/projectList/wishome.png'
      }
      $scope.factoryName = data.deptList;
      $scope.dataList = data.user;
      $scope.tdList = data.newList;
      $('.styleTd').eq(0).css('background','#fff');
      $scope.list = [];
      for(var i=1;i<=Math.ceil($scope.tdList.length/$scope.pageCount);$scope.list.push(i++));
    });
  };
  $scope.ajaxGetFactory(id);

  //  查看各个状态的项目
  $scope.getPrjtState = function(data,index){
    var c = $('.styleTd');
    $scope.changeNavStyle(c,index);
    var tdName = data.data.name;
    var deptId = data.$parent.dataList.deptId;
    var id = {};
    if(tdName === "进度项目"){
      id.deptId = deptId;
      $scope.url = yang +'wishome-web/rest/queryAllProgressPrjt';
    }else if(tdName === "交付项目"){
      id.deptId = deptId;
      $scope.url = yang +'wishome-web/rest/queryDeliverPrjt';
    }
    $http({
      url:$scope.url,
      method:'GET',
      params:id
    }).success(function(data){
      $scope.tdList = data.list;
      if(data.list.length === 0){

      }else{
        var len = $scope.tdList.length;
        $scope.pageShow(len);
      }
    });
  };


//  返回
  $scope.back = function(){
    $state.go('typesetting.bFactory')
  }
});
