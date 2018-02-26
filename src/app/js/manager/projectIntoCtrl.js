/**
 * Created by ASUS on 2017/8/15.
 */

  myApp.controller('projectIntoCtrl',function($state,$scope,$rootScope,$http,locals){
    //项目经理看总项目
    var user = {
      'userId': locals.get('id')
    };
    $scope.seeAllProject = function(item){
      $http({
        url: managerY +'wishome-web/rest/queryManagerProject',
        method:'POST',
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
        $scope.tdList = data.pm;
        $scope.edit = [];
        for(var e=0;e<$scope.tdList.length;e++){
          if($scope.tdList[e].prjtstate === "报价"){
            $scope.editProject = "编辑"
          }else{
            $scope.editProject = "查看";
          }
          var edit = {
            'editProject':$scope.editProject
          };
          $scope.edit.push(edit);
        }
        var len = $scope.tdList.length;
        $scope.pageShow(len);
      }).error(function(){
      })
    };
    //用户ID判断
    if($rootScope.id === null || undefined || ''){
      alert('失败')
    }else{
      $scope.seeAllProject(user);
    }

    //模糊查询
    $scope.searchClick = function(data){
      var state = $("#projectStatus option:selected").html();
      if(state === '所有项目状态'){
        state = ""
      }
      if($scope.keyWords === undefined){
        $scope.keyWords = '';
      }
      var user = {
        'userId':$rootScope.id,
        "prjtname": $scope.keyWords,
        'prjtstate':state
      };
      $http({
        url:managerY + 'wishome-web/rest/QueryProjectManagerCount',
        method:'GET',
        params:user
      }).success(function(data){
        $scope.tdList = data.pm;
        $scope.edit = [];
        var len = $scope.tdList.length;
        for(var e=0;e<len;e++){
          if(data.pm[e].prjtstate === "立项"){
            $scope.editProject = "编辑"
          }else{
            $scope.editProject = "查看";
          }
          var edit = {
            'editProject':$scope.editProject
          };
          $scope.edit.push(edit);
        }
        $scope.pageShow(len);
      });
    };
    $scope.myKeyup = function(e){
      var keycode = window.event?e.keyCode:e.which;
      if(keycode===13){
        $scope.searchClick();
      }
    };

    //报价项目
    $scope.editThis = function(data){
      var n = data.$parent.pageIndex;
      var index = parseInt(data.$index) + parseInt([5*(n - 1)]);
      var stateName = data.tdList[index].prjtstate;
      var id = data.tdList[index].prjtid;

      //路由记录
      locals.set('managerDownName',"总项目");

      if(stateName === "报价"){
        $state.go('typesetting.mQuotesView',{id:id});
      }else if(stateName === "报价结束"){
        $state.go("typesetting.mQuotesViewSave",{id:id});
      }else if(stateName === "签约"){
        $state.go('typesetting.mProductionView',{id: id})
      }else if(stateName === "下单"){
        $state.go('typesetting.mProductionView',{id:id})
      }else if(stateName === "进度"){
        $state.go('typesetting.managerScheduleView',{id: id})
      }
    }
  });
