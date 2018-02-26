/**
 * Created by ASUS on 2017/8/23.
 */
myApp.controller('askPriceCtrl',function($scope,$state,$http,$rootScope,locals){
  var userid = {
    'userid':$rootScope.id
  };
  $(".UrlA").eq(1).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(1)).css("background","none");
  $scope.askProjectCtrl = function(item){
    $http({
      url:designerY + 'wishome-web/rest/QueryInquiryTableState',
      method:'GET',
      params:item
    }).success(function(data){
      $scope.prompt = data.newList;
      //温馨提示
      $scope.promptBox = [
        {'name':"项目总数:", 'num' : $scope.prompt.list1 + ' 个，'},
        {'name':"立项项目:", 'num' : $scope.prompt.list2 + ' 个，'},
        {'name':"询价项目:", 'num' : $scope.prompt.list3 + ' 个，'},
        {'name':"签约项目:", 'num' : $scope.prompt.list4 + ' 个，'},
        {'name':"进度项目:", 'num' : $scope.prompt.list5 + ' 个，'},
        {'name':"交付项目:", 'num' : $scope.prompt.list6 + ' 个，'},
        {'name':"本月新增项目:", 'num' : $scope.prompt.list7 + ' 个，'},
        {'name':"本月完工项目:", 'num' : $scope.prompt.list8 + ' 个。'}
      ];
      $scope.tdList = data.list;
      $scope.pm = data.pm;
      var len = $scope.tdList.length;
      for(var i = 0;i<len;i++){
        if($scope.tdList[i].prjtstate === "询价"){
          $scope.tdList[i].prjtsum = "--"
        }else if($scope.tdList[i].prjtstate === "询价结束"){
        }
      }
      $scope.pageShow(len);
    }).error(function(){
    });
  };

  //用户ID判断
  if($rootScope.id === null || undefined || ''){

  }else{
    $scope.askProjectCtrl(userid);
  }

  //模糊查询
  $scope.askSearch = function(){
    var ajax = 'QueryInquiryName';
    $scope.searchClick(ajax);
  };

  $scope.seeAskProject = function(data){
    locals.set('designerDownName',"询价");
    var id = data.data.prjtid;
    //ask===询价
    $scope.askName = function(){
      $state.go('typesetting.signedList',{id:id})
    };
    //ask===询价结束
    $scope.askEndName = function(){
      $state.go('typesetting.askPriceEnd',{id:id})
    };
    var ask = data.data.prjtstate;
    if(ask === "询价"){
      $scope.askName();
    }else if(ask === '询价结束'){
      $scope.askEndName();
    }
  }

});

