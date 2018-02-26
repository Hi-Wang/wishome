/**
 * Created by ASUS on 2017/9/19.
 */
//查看下单
myApp.controller('mProductionViewCtrl',function($scope,$rootScope,$http,$state,$stateParams,$timeout,locals){
  $(".UrlA").eq(1).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(1)).css("background","none");
  $scope.select = true;
  $scope.allSelected = true;
  $scope.allNoSelected = true;
  $scope.tableTd = [
    {'name':'选择'},
    {'name':'样式参考'},
    {'name':'详细信息'},
    // {'name':'构成类别'},
    // {'name':'工艺'},
    // {'name':'制作要求'},
    {'name':'操作'}
  ];
  var id = {
    'prjtId':$stateParams.id
  };
  $scope.name = id.prjtid;

  $scope.queryPrjtAllDetails = function(item){
    $http({
      url: managerZ +'wishome-web/rest/queryPrjtAllDetails',
      method:'GET',
      params:item
    }).success(function(data){
      console.log(data);
      $scope.tableList = data.list;
      $scope.prjtList = data.prjtList;
      $scope.checkboxList = [];
      for(var i=0;i<$scope.tableList.length;i++){
        $scope.tableList[i].selectedStyle = true;
        if($scope.tableList[i].consName === null){
          $scope.tableList[i].listed = true;
          $scope.tableList[i].trStyle = "ColorCCC"
        }else{
          $scope.tableList[i].listed = false;
          $scope.tableList[i].selected = false;
          $scope.tableList[i].trStyle = "Color333"
          // $scope.checkboxList.push($scope.tableList[i].selected);
        }
        $scope.checkboxList.push($scope.tableList[i]);
      }
    });
  };
  $scope.queryPrjtAllDetails(id);

  //全选
  $scope.allSelect = function(item){
    console.log(item);
    var len = item.tableList.length;
    $scope.allNoSelected = true;
    if($scope.allSelected === false){
      $scope.allSelected = true;
      for(var a=0;a<len;a++){
        if(item.tableList[a].consName === null){

        }else if(item.tableList[a].consName !== null){
          item.tableList[a].selected = false;
          item.tableList[a].selectedStyle = true
        }
      }
    }else{
      $scope.allSelected = false;
      for(var n=0;n<len;n++){
        if(item.tableList[n].consName === null){

        }else if(item.tableList[n].consName !== null){
          item.tableList[n].selected = true;
          item.tableList[n].selectedStyle = false
        }
      }
    }
  };

  //反选
  $scope.allNoSelect = function(item){
    console.log(item);
    $scope.allSelected = true;
    var len = item.tableList.length;
    if($scope.allNoSelected === false){
      $scope.allNoSelected = true;
      for(var a=0;a<len;a++){
        if(item.tableList[a].consName === null){

        }else if(item.tableList[a].consName !== null){
          if(item.tableList[a].selectedStyle === false){
            item.tableList[a].selected = true;
            item.tableList[a].selectedStyle = false
          }else if(item.tableList[a].selectedStyle === true){
            item.tableList[a].selected = false;
            item.tableList[a].selectedStyle = true
          }
        }
      }
    }else if($scope.allNoSelected === true){

      for(var f=0;f<len;f++){
        if(item.tableList[f].consName === null){

        }else if(item.tableList[f].consName !== null){
          if(item.tableList[f].selectedStyle === false){
            item.tableList[f].selected = false;
            item.tableList[f].selectedStyle = true
          }else if(item.tableList[f].selectedStyle === true){
            item.tableList[f].selected = true;
            item.tableList[f].selectedStyle = false
          }
        }
      }
      $scope.allNoSelected = false;
    }
  };

  // $scope.selectedStyle = true;
  $scope.checkedChange = function(data){
    if(data.$parent.data.listed === false && data.$parent.data.selected === false){
      data.$parent.data.selectedStyle = true;
    }else if(data.$parent.data.listed === false && data.$parent.data.selected === true){
      data.$parent.data.selectedStyle = false;
    }else if(data.$parent.data.listed === true){
      data.$parent.data.selectedStyle = true;
    }

  };

//点击下单按钮
  $scope.downProduct = function(data){
    $scope.setCheckbox = [];
    for(var i=0;i<$scope.checkboxList.length;i++){
      if($scope.checkboxList[i].selected){
        $scope.setCheckbox.push($scope.checkboxList[i])
      }
    }
    if($scope.setCheckbox.length === 0){
      $scope.managerModel = true;
      $scope.homeModelName = "提示：";
      $scope.alertTextP = true;
      $scope.factoryName = false;
      $scope.footer = false;
      $scope.alertText = "请选择需要下单的产品。";
      $timeout(function(){
        $scope.managerModel = false;
      },800)
    }else{

      $http({
        url: managerZ +'wishome-web/rest/expectedDate',
        method:'GET'
      }).success(function(item){
        $scope.managerModel = true;
        $scope.factoryName = true;
        $scope.alertTextP = false;
        $scope.footer = true;
        $scope.factoryDate = new Date(item.date);
        $scope.down(item.gc);
       })
      }
    };

//下单至工厂model确定
  $scope.orderToFactory = function(item){
    $http({
      url: managerZ +'wishome-web/rest/newOrderToFactory',
      method:'GET',
      params:item
    }).success(function(data){
      $scope.managerModel = false;
      var managerId = {
        'prjtId':data.prjtId
      };
      $scope.queryPrjtAllDetails(managerId);
    })
  };

//  点击编辑进入goProductNotices
  $scope.goProductNotices = function(data){
    var id = data.data.detailsid;
    $state.go('typesetting.mProductNotices',{id:id});
  };
  //查看大图
  $scope.seeBigImg = function(url){
    $scope.seeImg(url);
  };
 //  返回
  $scope.back = function(){
    var name = locals.get('managerDownName');
    if(name === "总项目"){
      $state.go('typesetting.projectInto');
    }else if(name === "下单"){
      $state.go('typesetting.managerProduction');
    }
  };

});
