/**
 * Created by ASUS on 2017/9/21.
 */
myApp.directive('managerAlert',function(){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'manager/managerAlertModel.html',
    controller:function($scope,$filter){
      //下单选择工厂
      $scope.down = function(item){
        $scope.homeModelName = "下单至工厂";
        $scope.alertTextP = false;
        $scope.selectHome = false;
        $scope.factoryName = true;
        $scope.gc = item;
      };
      //显示删除节点信息model
      $scope.del = function(item,index){
        $scope.homeModelName = "删除节点信息";
        $scope.hideId = index;
        $scope.alertTextP = true;
        $scope.selectHome = false;
        $scope.factoryName = false;
        $scope.alertText = "您确定要删除[" + item + "]节点吗？";
      };
    //  显示添加节点信息model
      $scope.add = function(item){
        $scope.homeModelName = "添加节点信息";
        $scope.alertTextP = false;
        $scope.selectHome = true;
        $scope.factoryName = false;
        $scope.addNodeName = item;
      };

      //添加其他节点
      $("#otherNodeName").change(function(data){
        $scope.select = this.selectedIndex;
        var name = $("#otherNodeName option:selected").html();
        var indexName = $scope.addNodeName[$scope.select].name;
        $scope.selectName = $scope.addNodeName[$scope.select];
        $scope.show(name,indexName);
      });
      $scope.show = function(name,index){
        $scope.optionName = index;
        if(name === "其他"){
          return $scope.otherName = true
        }else{
          return $scope.otherName = false;
        }
      };

      //保存
      $scope.save = function(data){
        if(data.homeModelName === "删除节点信息"){
          data.nodeTime.splice(data.hideId,1);
          data.managerModel = false;
        }else if(data.homeModelName === "添加节点信息"){
          if(data.select === undefined){
            data.select = 0;
          }
          if($("#otherNodeName option:selected").html() === undefined){
            $("#otherNodeName option:selected").html(data.addNodeName[0].name)
          }
          data.addNodeName[data.select].name = $("#otherNodeName option:selected").html();
          data.nodeTime.push(data.addNodeName[data.select]);
          data.managerModel = false;
        }else if(data.homeModelName === "下单至工厂"){
          // if()
          var id = $('option:selected', '#factroyName').index();
          var factroy = {
            'details': data.setCheckbox,
            'id': data.gc[id].id,
            'date': $filter('date')(data.factoryDate, 'yyyy-MM-dd')
          };
          $scope.orderToFactory(factroy);
        }
      };
      //  取消
     $scope.modelHide = function(){
       $scope.managerModel = false;
     };
    },
    link:function(scope,ele,attr,$filter){
      // //保存
      // scope.save = function(data){
      //   if(data.homeModelName === "删除节点信息"){
      //     data.nodeTime.splice(data.hideId,1);
      //     data.managerModel = false;
      //   }else if(data.homeModelName === "添加节点信息"){
      //     if(data.select === undefined){
      //       data.select = 0;
      //     }
      //     if($("#otherNodeName option:selected").html() === undefined){
      //       $("#otherNodeName option:selected").html(data.addNodeName[0].name)
      //     }
      //     data.addNodeName[data.select].name = $("#otherNodeName option:selected").html();
      //     data.nodeTime.push(data.addNodeName[data.select]);
      //     data.managerModel = false;
      //   }else if(data.homeModelName === "下单至工厂"){
      //     // if()
      //     var id = $('option:selected', '#factroyName').index();
      //     var factroy = {
      //       'details': data.setCheckbox,
      //       'id': data.gc[id].id,
      //       'date': $filter('date')(data.factoryDate, 'yyyy-MM-dd')
      //     };
      //     scope.orderToFactory(factroy);
      //   }
      // }
    }
  }
});
