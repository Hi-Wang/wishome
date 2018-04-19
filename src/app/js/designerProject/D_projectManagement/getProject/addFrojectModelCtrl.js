myApp.directive('addProjectModel',function(){
  return{
    restrict: 'EA',
    templateUrl: 'designer/D_projectManagement/getProject/addProjectModel.html',
    replace: true,
    controller:function($scope,$http,$timeout,locals){
      $scope.divHide = function(){
        $scope.addproject = false;
        $("#listnameValue").val('');
        $scope.prjtmemo = "";
      };
      //根据项目类别选择户型
      $("#listpcgValue").change(function(){
        var room = {
          "prjtCateName": $("#listpcgValue option:selected").html()
        };
        $scope.getNextOption(room);
      });
      $scope.getNextOption = function(item){
        $http({
          url:zheng + 'wishome-web/rest/queryHstp',
          method:'GET',
          params:item
        }).success(function(data){
          data.list.push({"hastCateName" : "自定义"});
          $scope.hastCateName = data.list;
          $scope.prjthstp = data.list[0]
        })
      };

    //  保存新建项目
      //保存新建项目的数据
      $scope.saveList = function(item){
        var name = {
          "userid": locals.get('id'),
          "prjtcode":$scope.prjtcode,
          "prjtname":$("#listnameValue").val(),
          "prjtcate": $scope.listpcgValue.prjtcatename,
          "prjthstp": $scope.prjthstp.hastCateName,
          "prjtprincipal": $scope.listpcValue.principalname,
          "prjtboard": $scope.listbValue.boardname,
          "prjtmemo":$scope.prjtmemo
        };
        console.log(name);
        if(name.prjtmemo === undefined){
          name.prjtmemo = ""
        }
        if(name.prjtname === "" || name.prjtcate === "" || name.prjthstp === ""){
          $scope.modelError = true;
          $scope.modelErrorText = "【项目名称】、【项目类别】、【户型】此三项不可为空。";
          $scope.addModel = "";
        }else{
          var loadingShow = "正在新建项目中...";
          $scope.loaddingShow(loadingShow);
          $scope.modelError = false;
          $scope.addModel = "modal";
          $http({
            url:zheng + 'wishome-web/rest/prjtlist',
            method:'post',
            params:name
          }).success(function(){
            var loadingShow = "新建项目成功！";
            $scope.loaddingShow(loadingShow);

            $timeout(function(){
              var userId = {
                'userid': locals.get("id")
              };
              $scope.addList(userId);
              $scope.loaddingHide();
              $scope.divHide();
            },1000);

          }).error(function(){
          })
        }
      };

    }
  }
});
